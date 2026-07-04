import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import WorkContent, { type GalleryImage } from "@/components/WorkContent";

export const metadata: Metadata = {
  title: "Our Work — SIGN FUTURE ADVERTISING",
  description:
    "Our signboard portfolio — 3D LED signboards, 3D signage, stainless steel, normal signboards, neon signs and indoor signage by SIGN FUTURE ADVERTISING, Malaysia.",
};

// Gallery content is dynamic (comes from Payload), so render at request time.
export const dynamic = "force-dynamic";

async function loadGallery(): Promise<Record<string, GalleryImage[]>> {
  const byCategory: Record<string, GalleryImage[]> = {};
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "gallery-items",
      depth: 1,
      limit: 500,
      sort: "order",
    });
    for (const doc of docs) {
      const cat = doc.category as string;
      const image = doc.image;
      const url =
        image && typeof image === "object" ? (image.url ?? null) : null;
      if (!url) continue;
      (byCategory[cat] ??= []).push({
        url,
        alt:
          (image && typeof image === "object" && image.alt) ||
          (doc.title as string) ||
          "",
      });
    }
  } catch (err) {
    // DB not configured yet, or unreachable — render the page with empty
    // galleries rather than crashing the whole site.
    console.error("[work] failed to load gallery from Payload:", err);
  }
  return byCategory;
}

export default async function Page() {
  const itemsByCategory = await loadGallery();
  return <WorkContent itemsByCategory={itemsByCategory} />;
}
