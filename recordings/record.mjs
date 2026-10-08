/*
 * Cinematic screen recording of the homepage.
 *
 *   cd recordings && npm install && npm run record
 *
 * Pipeline: production server → cache warm-up → headless Chrome at 1440×900 →
 * Chrome DevTools screencast (page pixels only, no browser UI, no cursor) →
 * constant 30 fps → H.264 MP4 (~10 Mbps) → checks → copied to the Desktop.
 *
 * Flags: --keep-frames (keep raw frames for re-encoding) · --encode-only (re-encode the kept take)
 *        --no-desktop (skip the Desktop copy)
 */

import { chromium } from "playwright-core";
import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";
import { spawn, execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { copyFile, link, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const URL = process.env.REC_URL ?? "http://localhost:3000/";
const VIEWPORT = { width: 1440, height: 900 };
const FPS = 30;
const NAME = "Luxury_Jewelry_Website_Concept";
const TMP = path.join(HERE, "tmp");
const RAW = path.join(TMP, "raw");
const CFR = path.join(TMP, "cfr");
const OUT_DIR = path.join(HERE, "output");
const OUT_FILE = path.join(OUT_DIR, `${NAME}.mp4`);
const TAKE_FILE = path.join(TMP, "take.json");
const KEEP_FRAMES = process.argv.includes("--keep-frames");
const ENCODE_ONLY = process.argv.includes("--encode-only");
const COPY_TO_DESKTOP = !process.argv.includes("--no-desktop");

/** Mouse rests in the left page margin, where nothing reacts to hover. */
const REST = { x: 6, y: 450 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const log = (msg) => console.log(`[rec] ${msg}`);

/* ───────────────────────── environment ───────────────────────── */

function findBrowser() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ].filter(Boolean);
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("No Chrome or Edge installation found.");
  return found;
}

function desktopDir() {
  try {
    const out = execFileSync("powershell", ["-NoProfile", "-Command", "[Environment]::GetFolderPath('Desktop')"], {
      encoding: "utf8",
    }).trim();
    if (out && existsSync(out)) return out;
  } catch {
    /* fall through */
  }
  return path.join(process.env.USERPROFILE ?? "", "Desktop");
}

async function isUp() {
  try {
    const response = await fetch(URL);
    return response.ok;
  } catch {
    return false;
  }
}

/** Reuses a running server, otherwise builds (if needed) and starts the production server. */
async function ensureServer() {
  if (await isUp()) {
    log(`using the server already running at ${URL}`);
    return null;
  }
  if (!existsSync(path.join(ROOT, ".next", "BUILD_ID"))) {
    log("no production build found — running npm run build");
    execFileSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit", shell: true });
  }
  log("starting production server (npm run start)");
  const server = spawn("npm", ["run", "start"], { cwd: ROOT, shell: true, stdio: "ignore" });
  for (let i = 0; i < 120; i++) {
    if (await isUp()) return server;
    await sleep(500);
  }
  throw new Error(`Server did not answer at ${URL}`);
}

function stopServer(server) {
  if (!server?.pid) return;
  try {
    execFileSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } catch {
    /* already gone */
  }
}

/* ───────────────────────── in-page helpers ───────────────────────── */

/**
 * Pauses every CSS animation from the first byte, so the hero intro waits for the camera.
 * The style lives in <head> and is re-inserted if hydration removes it, until released.
 */
const HOLD_INTRO = () => {
  history.scrollRestoration = "manual";
  const ensure = () => {
    // At document start there is no <html> element yet; wait for one.
    const parent = document.head ?? document.documentElement;
    if (!parent || window.__recReleased || document.getElementById("__rec_hold")) return;
    const style = document.createElement("style");
    style.id = "__rec_hold";
    style.textContent = "*,*::before,*::after{animation-play-state:paused!important}";
    parent.appendChild(style);
  };
  window.__recHoldObserver = new MutationObserver(ensure);
  window.__recHoldObserver.observe(document, { childList: true, subtree: true });
  ensure();
};

/** Lets the opening sequence play. */
const RELEASE_INTRO = () => {
  window.__recReleased = true;
  window.__recHoldObserver?.disconnect();
  document.getElementById("__rec_hold")?.remove();
};

/** Loads and decodes every rendered image so nothing appears as a placeholder on camera. */
async function primeImages(page, timeoutMs = 45000) {
  return page.evaluate(async (timeout) => {
    const images = [...document.images].filter((img) => img.getClientRects().length > 0);
    for (const img of images) img.loading = "eager";
    await Promise.race([
      Promise.allSettled(images.map((img) => img.decode())),
      new Promise((resolve) => setTimeout(resolve, timeout)),
    ]);
    const broken = images.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc);
    return { total: images.length, broken };
  }, timeoutMs);
}

/** Eased scroll driven by requestAnimationFrame: continuous, never a jump. */
async function glide(page, targetY, ms) {
  await page.evaluate(
    ([target, duration]) =>
      new Promise((resolve) => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const to = Math.max(0, Math.min(max, target));
        const from = scrollY;
        const start = performance.now();
        const ease = (p) => 0.5 - 0.5 * Math.cos(Math.PI * p); // ease-in-out sine
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          scrollTo({ top: from + (to - from) * ease(p), behavior: "instant" });
          if (p < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      }),
    [targetY, ms],
  );
}

/** Absolute document position of an element's top edge. */
const topOf = (page, selector) =>
  page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) throw new Error(`Missing element: ${s}`);
    return el.getBoundingClientRect().top + scrollY;
  }, selector);

/** Moves the product rail by whole cards, smoothly, ending on a snap point. */
async function glideRail(page, cards, ms) {
  await page.evaluate(
    ([count, duration]) =>
      new Promise((resolve) => {
        const rail = document.querySelector("#edit ul");
        const card = rail.querySelector("li");
        const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
        const distance = count * (card.getBoundingClientRect().width + gap);
        const from = rail.scrollLeft;
        const start = performance.now();
        rail.style.scrollSnapType = "none";
        const ease = (p) => 0.5 - 0.5 * Math.cos(Math.PI * p);
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          rail.scrollLeft = from + distance * ease(p);
          if (p < 1) requestAnimationFrame(step);
          else {
            rail.style.scrollSnapType = "";
            resolve();
          }
        };
        requestAnimationFrame(step);
      }),
    [cards, ms],
  );
}

/** Verifies every image currently in view has loaded and the fonts are ready. */
async function assertFrameIntegrity(page, beat) {
  const result = await page.evaluate(() => {
    const inView = [...document.images].filter((img) => {
      const r = img.getBoundingClientRect();
      return (
        img.getClientRects().length > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
      );
    });
    return {
      images: inView.length,
      broken: inView.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc.slice(0, 90)),
      fonts: document.fonts.status,
    };
  });
  if (result.broken.length || result.fonts !== "loaded") {
    throw new Error(`Integrity check failed at "${beat}": ${JSON.stringify(result)}`);
  }
  return result.images;
}

/* ───────────────────────── choreography ───────────────────────── */

async function perform(page, mark) {
  const vh = VIEWPORT.height;

  // 00:00 — Overture. The intro plays, then a slow first movement.
  await mark("hero");
  await sleep(3800);
  await glide(page, 620, 2600);
  await sleep(900);

  // Prelude — the manifesto and its inline image.
  await mark("prelude");
  await glide(page, (await topOf(page, "#prelude h2")) - 210, 2800);
  await sleep(2900);

  // Chapter I — portrait, title, then the matted close-up and its gallery label.
  await mark("chapter-one");
  await glide(page, (await topOf(page, "#collection")) - 40, 2800);
  await sleep(2400);
  await glide(page, (await topOf(page, "#collection figure:nth-of-type(2)")) - 300, 2500);
  await sleep(2300);

  // The Edit — the rail moves by hand, two pieces at a time.
  await mark("edit");
  await glide(page, (await topOf(page, "#edit h2")) - 110, 2600);
  await sleep(1500);
  await glideRail(page, 2, 2300);
  await sleep(1600);
  await glideRail(page, 2, 2300);
  await sleep(1500);

  // Nocturne — the dark chapter, the wide plate, then the pinned vitrine.
  await mark("nocturne");
  await glide(page, await topOf(page, "#nocturne"), 2600);
  await sleep(900);
  const plate = (await topOf(page, "#nocturne figure")) - 60;
  await glide(page, plate, 2200);
  await sleep(600);
  // A reader's small step back: the header returns, in the ink theme of the section beneath it.
  await glide(page, plate - 110, 900);
  await sleep(1200);
  const stageTop = await topOf(page, "#nocturne [data-stage]");
  const pinLength = vh * 1.25 * 2;
  await glide(page, stageTop + 40, 2300);
  await sleep(1400);
  await glide(page, stageTop + pinLength * 0.5, 3000);
  await sleep(1600);
  await glide(page, stageTop + pinLength - 10, 3000);
  await sleep(1500);

  // Chapter III — the Atelier: the anchored image follows each step.
  await mark("atelier");
  await glide(page, (await topOf(page, "#atelier")) + 120, 3000);
  await sleep(1100);
  for (let i = 1; i <= 4; i++) {
    await glide(page, (await topOf(page, `#atelier ol > li:nth-child(${i})`)) - vh * 0.36, 1600);
    await sleep(1150);
  }

  // Index — the typographic table of contents, with a few lines read by hand.
  await mark("index");
  await glide(page, (await topOf(page, "#index h2")) - 90, 2600);
  await sleep(900);
  for (let i = 1; i <= 4; i++) {
    const box = await page.locator(`#index li:nth-child(${i}) a`).boundingBox();
    const y = box.y + box.height / 2;
    if (i === 1) await page.mouse.move(REST.x, y, { steps: 12 }); // travel down the margin first
    await page.mouse.move(box.x + box.width * 0.32, y, { steps: 18 });
    await sleep(i === 4 ? 1600 : 1300);
  }
  const lastRow = await page.locator("#index li:nth-child(4) a").boundingBox();
  await page.mouse.move(REST.x, lastRow.y + lastRow.height / 2, { steps: 18 });
  await page.mouse.move(REST.x, REST.y, { steps: 8 });
  await sleep(500);

  // Chapter IV — Promise.
  await mark("promise");
  await glide(page, (await topOf(page, "#promise")) + 40, 2600);
  await sleep(1800);
  await glide(page, (await topOf(page, "#promise figure")) - 70, 2400);
  await sleep(2100);

  // The Salon — the invitation.
  await mark("salon");
  const salon = (await topOf(page, "#salon figure")) - 12;
  await glide(page, salon, 2800);
  await sleep(2300);
  await glide(page, salon + 140, 2200);
  await sleep(1900);

  // Correspondence.
  await mark("correspondence");
  await glide(page, (await topOf(page, "#correspondence")) - 30, 2400);
  await sleep(2700);

  // Footer — then stillness.
  await mark("footer");
  await glide(page, Number.MAX_SAFE_INTEGER, 2800);
  await sleep(3000);
}

/* ───────────────────────── recording ───────────────────────── */

async function record(browser) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
    colorScheme: "light",
    locale: "en-US",
  });

  // Warm-up visit: every image enters the HTTP cache before the camera rolls.
  log("warm-up pass: loading every image into the cache");
  const warm = await context.newPage();
  await warm.goto(URL, { waitUntil: "load", timeout: 120000 });
  const warmed = await primeImages(warm, 90000);
  await warm.evaluate(() => document.fonts.ready);
  log(`warm-up: ${warmed.total} images, ${warmed.broken.length} failed`);
  if (warmed.broken.length) throw new Error(`Images failed to load: ${warmed.broken.join(", ")}`);
  await warm.close();

  // The recording visit.
  const page = await context.newPage();
  await page.addInitScript(HOLD_INTRO);
  await page.mouse.move(REST.x, REST.y);
  await page.goto(URL, { waitUntil: "load", timeout: 120000 });
  const primed = await primeImages(page);
  if (primed.broken.length) throw new Error(`Images failed on the recording page: ${primed.broken.join(", ")}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-motion-ready"), null, {
    timeout: 30000,
  });
  await sleep(1200);
  log(`page ready: ${primed.total} images decoded, fonts loaded, motion layer initialised`);

  const cdp = await context.newCDPSession(page);
  const frames = [];
  const writes = [];
  let firstFrame;
  const gotFirstFrame = new Promise((resolve) => (firstFrame = resolve));
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    const file = path.join(RAW, `${String(frames.length).padStart(6, "0")}.jpg`);
    frames.push({ file, t: metadata.timestamp });
    writes.push(writeFile(file, Buffer.from(data, "base64")));
    if (frames.length === 1) firstFrame();
  });
  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 92,
    maxWidth: VIEWPORT.width,
    maxHeight: VIEWPORT.height,
    everyNthFrame: 1,
  });
  await gotFirstFrame;
  await sleep(250);

  // Action: release the opening sequence on camera.
  const t0 = frames[0].t;
  const beats = [];
  // Each beat first verifies the frame the previous beat came to rest on.
  const mark = async (name) => {
    const images = await assertFrameIntegrity(page, `before ${name}`);
    beats.push({ name, at: Date.now() / 1000 - t0, images });
  };
  await page.evaluate(RELEASE_INTRO);

  await perform(page, mark);

  const lastImages = await assertFrameIntegrity(page, "footer");
  const tEnd = Date.now() / 1000;
  await cdp.send("Page.stopScreencast");
  await Promise.all(writes);
  await context.close();

  return { frames, t0, tEnd, beats, lastImages };
}

/* ───────────────────────── encoding ───────────────────────── */

/**
 * Resamples the variable-rate screencast (~60 fps while moving, nothing while still)
 * onto an exact 30 fps timeline, taking the frame nearest each tick. Hard links, no copies.
 */
async function buildConstantFrameRate({ frames, t0, tEnd }) {
  await rm(CFR, { recursive: true, force: true });
  await mkdir(CFR, { recursive: true });
  const total = Math.floor((tEnd - t0) * FPS);
  const picks = [];
  let cursor = 0;
  for (let k = 0; k < total; k++) {
    const time = t0 + k / FPS;
    while (cursor + 1 < frames.length && frames[cursor + 1].t <= time) cursor++;
    const next = frames[cursor + 1];
    const pick = next && next.t - time < time - frames[cursor].t ? cursor + 1 : cursor;
    picks.push(pick);
    await link(frames[pick].file, path.join(CFR, `${String(k).padStart(6, "0")}.jpg`));
  }
  // A visible hitch: one frame shown twice in the middle of otherwise continuous motion.
  const runs = [];
  for (const pick of picks) {
    if (runs.length && runs[runs.length - 1].pick === pick) runs[runs.length - 1].length++;
    else runs.push({ pick, length: 1 });
  }
  const repeats = runs.filter(
    (run, i) => run.length === 2 && runs[i - 1]?.length === 1 && runs[i + 1]?.length === 1,
  ).length;
  return { total, repeats };
}

/** Two-pass H.264 at ~10 Mbps: steady quality on stills and on fast photographic motion alike. */
function encode(totalFrames) {
  const duration = totalFrames / FPS;
  const fadeOut = 1.4;
  const filters = [
    "scale=1440:900:flags=lanczos:in_range=pc:in_color_matrix=bt601:out_range=tv:out_color_matrix=bt709",
    "format=yuv420p",
    "fade=t=in:st=0:d=0.8",
    `fade=t=out:st=${(duration - fadeOut).toFixed(3)}:d=${fadeOut}`,
  ].join(",");
  const input = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-framerate",
    String(FPS),
    "-i",
    path.join(CFR, "%06d.jpg"),
  ];
  const video = [
    "-vf",
    filters,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-tune",
    "film",
    "-profile:v",
    "high",
    "-level",
    "4.2",
    "-b:v",
    "10M",
    "-maxrate",
    "12M",
    "-bufsize",
    "20M",
    "-g",
    String(FPS * 2),
    "-color_primaries",
    "bt709",
    "-color_trc",
    "bt709",
    "-colorspace",
    "bt709",
    "-color_range",
    "tv",
    "-passlogfile",
    path.join(TMP, "x264"),
    "-an",
  ];
  execFileSync(ffmpegPath, [...input, ...video, "-pass", "1", "-f", "null", "NUL"], { stdio: "inherit" });
  execFileSync(ffmpegPath, [...input, ...video, "-pass", "2", "-movflags", "+faststart", OUT_FILE], {
    stdio: "inherit",
  });
}

function probe(file) {
  const out = execFileSync(
    ffprobe.path,
    ["-v", "error", "-print_format", "json", "-show_format", "-show_streams", file],
    { encoding: "utf8" },
  );
  const info = JSON.parse(out);
  const video = info.streams.find((s) => s.codec_type === "video");
  return {
    duration: Number(info.format.duration),
    width: video.width,
    height: video.height,
    codec: video.codec_name,
    profile: video.profile,
    fps: video.r_frame_rate,
    pixFmt: video.pix_fmt,
    bitrate: Number(info.format.bit_rate),
    audio: info.streams.some((s) => s.codec_type === "audio"),
  };
}

/** A contact sheet (one frame every 4 s) for visual review. */
function contactSheet() {
  const sheet = path.join(OUT_DIR, "contact-sheet.jpg");
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      OUT_FILE,
      "-vf",
      "fps=1/4,scale=480:-1,tile=4x8:padding=6:color=0x222222",
      "-frames:v",
      "1",
      "-q:v",
      "3",
      sheet,
    ],
    { stdio: "inherit" },
  );
  return sheet;
}

/* ───────────────────────── main ───────────────────────── */

async function main() {
  if (!ENCODE_ONLY) {
    await rm(TMP, { recursive: true, force: true });
    await mkdir(RAW, { recursive: true });
  }
  await mkdir(OUT_DIR, { recursive: true });

  const server = ENCODE_ONLY ? null : await ensureServer();
  const browser = ENCODE_ONLY
    ? null
    : await chromium.launch({
        executablePath: findBrowser(),
        headless: true,
        args: [
          "--hide-scrollbars",
          "--force-color-profile=srgb",
          "--disable-notifications",
          "--mute-audio",
          "--no-first-run",
          "--disable-renderer-backgrounding",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
        ],
      });

  try {
    let take;
    if (ENCODE_ONLY) {
      take = JSON.parse(await readFile(TAKE_FILE, "utf8"));
      log(`re-encoding saved take (${take.frames.length} frames)`);
    } else {
      take = await record(browser);
      await writeFile(TAKE_FILE, JSON.stringify(take));
    }
    const span = take.tEnd - take.t0;
    log(
      `captured ${take.frames.length} frames over ${span.toFixed(1)} s (${(take.frames.length / span).toFixed(1)} fps source)`,
    );
    for (const beat of take.beats)
      log(`  ${beat.at.toFixed(1).padStart(6)} s  ${beat.name.padEnd(15)} (${beat.images} images in view, all loaded)`);

    const { total, repeats } = await buildConstantFrameRate(take);
    log(`encoding ${total} frames at ${FPS} fps → H.264 (${repeats} single-frame hitches in motion)`);
    encode(total);

    const info = probe(OUT_FILE);
    const size = (await stat(OUT_FILE)).size;
    log(`output: ${OUT_FILE}`);
    log(
      `  ${info.width}×${info.height} · ${info.codec} (${info.profile}) · ${info.fps} fps · ${info.pixFmt} · ` +
        `${info.duration.toFixed(2)} s · ${(info.bitrate / 1e6).toFixed(2)} Mbps · ${(size / 1048576).toFixed(1)} MB · audio: ${info.audio}`,
    );
    if (info.width !== 1440 || info.height !== 900) throw new Error("Unexpected resolution");
    if (info.duration < 60) throw new Error("Recording is shorter than expected");

    log(`contact sheet: ${contactSheet()}`);

    if (COPY_TO_DESKTOP) {
      const desktop = desktopDir();
      for (const name of [`${NAME}.mp4`, `${NAME}_FINAL.mp4`]) {
        await copyFile(OUT_FILE, path.join(desktop, name));
        log(`saved: ${path.join(desktop, name)}`);
      }
    }
    if (!KEEP_FRAMES && !ENCODE_ONLY) await rm(TMP, { recursive: true, force: true });
  } finally {
    await browser?.close();
    stopServer(server);
  }
}

main().catch((error) => {
  console.error(`[rec] FAILED: ${error.message}`);
  process.exit(1);
});
