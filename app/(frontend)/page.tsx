import HomeContent from "@/components/HomeContent";
import { loadHeroSlides } from "@/lib/hero";
import { loadShowcase } from "@/lib/showcase";

// Hero + showcase come from Payload. Cache the page and refresh every 5 min;
// those collections also revalidate "/" on every edit.
export const revalidate = 300;

export default async function Page() {
  const [heroSlides, showcase] = await Promise.all([
    loadHeroSlides(),
    loadShowcase(),
  ]);
  return <HomeContent heroSlides={heroSlides} showcase={showcase} />;
}
