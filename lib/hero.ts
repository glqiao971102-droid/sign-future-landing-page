import { getPayload } from "payload";
import config from "@payload-config";

export type HeroSlide = { url: string; alt: string };

// Home page hero images, managed from the Hero Slides collection in the admin.
export async function loadHeroSlides(): Promise<HeroSlide[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "hero-slides",
      sort: "order",
      limit: 50,
      depth: 1,
    });

    const slides: HeroSlide[] = [];
    for (const doc of res.docs) {
      const image = doc.image as
        | { url?: string | null; alt?: string | null }
        | null
        | undefined;
      const url =
        image && typeof image === "object" ? (image.url ?? null) : null;
      if (!url) continue;
      slides.push({
        url,
        alt:
          (doc.alt as string) ||
          (image && typeof image === "object" ? (image.alt ?? "") : "") ||
          "",
      });
    }
    return slides;
  } catch (err) {
    console.error("[hero] failed to load slides:", err);
    return [];
  }
}
