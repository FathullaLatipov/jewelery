import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Svg({ children, viewBox = "0 0 24 24", ...props }: IconProps & { readonly children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* 1px line icons, drawn for the house — never filled. */

export function SearchIcon(props: IconProps) {
  return (
    <Svg width={20} height={20} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" vectorEffect="non-scaling-stroke" />
      <path d="M15.5 15.5 20.5 20.5" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Svg width={20} height={20} {...props}>
      <path d="M4.5 8.5h15l-1 12h-13z" vectorEffect="non-scaling-stroke" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg width={20} height={20} {...props}>
      <path
        d="M12 19.5s-7.5-4.6-7.5-10A4 4 0 0 1 12 7.2a4 4 0 0 1 7.5 2.3c0 5.4-7.5 10-7.5 10z"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </Svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Svg width={28} height={10} viewBox="0 0 28 10" {...props}>
      <path d="M0 5h26.5" vectorEffect="non-scaling-stroke" />
      <path d="M22.5 1 26.5 5l-4 4" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg width={10} height={16} viewBox="0 0 10 16" {...props}>
      <path d="M5 16V1.5" vectorEffect="non-scaling-stroke" />
      <path d="M1 5.5 5 1.5l4 4" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <path d="M2 2l14 14M16 2 2 16" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}
