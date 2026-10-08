import { getHomepage } from "@/content/homepage";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Atelier } from "@/components/sections/Atelier";
import { CategoryIndex } from "@/components/sections/CategoryIndex";
import { Correspondence } from "@/components/sections/Correspondence";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Nocturne } from "@/components/sections/Nocturne";
import { Overture } from "@/components/sections/Overture";
import { Prelude } from "@/components/sections/Prelude";
import { PromiseChapter } from "@/components/sections/PromiseChapter";
import { Salon } from "@/components/sections/Salon";
import { TheEdit } from "@/components/sections/TheEdit";

export default function HomePage() {
  const content = getHomepage();
  return (
    <>
      <Overture content={content.hero} />
      <Prelude content={content.prelude} />
      <FeaturedCollection collection={content.collection} />
      <TheEdit content={content.edit} />
      <Nocturne content={content.nocturne} />
      <Atelier content={content.atelier} />
      <CategoryIndex content={content.index} />
      <PromiseChapter content={content.promise} />
      <Salon content={content.salon} />
      <Correspondence content={content.correspondence} />
      <MotionRoot />
    </>
  );
}
