import HomeContent from "@/components/HomeContent";
import { loadHeroSlides } from "@/lib/hero";
import { loadShowcase } from "@/lib/showcase";
import { loadReviews } from "@/lib/reviews";
import { loadSocialLinks } from "@/lib/site";

// Hero + showcase + reviews come from Payload. Cache the page and refresh every
// 5 min; those collections also revalidate "/" on every edit.
export const revalidate = 300;

export default async function Page() {
  const [heroSlides, showcase, reviews, site] = await Promise.all([
    loadHeroSlides(),
    loadShowcase(),
    loadReviews(),
    loadSocialLinks(),
  ]);
  return (
    <HomeContent
      heroSlides={heroSlides}
      showcase={showcase}
      reviews={reviews}
      site={site}
    />
  );
}
