import HomeContent from "@/components/HomeContent";
import { loadHeroSlides } from "@/lib/hero";

// Hero images come from Payload. Cache the page and refresh every 5 min; the
// Hero Slides collection also revalidates "/" on every edit.
export const revalidate = 300;

export default async function Page() {
  const heroSlides = await loadHeroSlides();
  return <HomeContent heroSlides={heroSlides} />;
}
