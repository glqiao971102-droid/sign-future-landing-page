import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import WorkContent, { type WorkCategory } from "@/components/WorkContent";

export const metadata: Metadata = {
  title: "Our Work — SIGN FUTURE ADVERTISING",
  description:
    "Our signboard portfolio — 3D LED signboards, 3D signage, stainless steel, normal signboards, neon signs and indoor signage by SIGN FUTURE ADVERTISING, Malaysia.",
};

// Gallery + categories are dynamic (come from Payload), so render at request time.
export const dynamic = "force-dynamic";

async function loadCategories(): Promise<WorkCategory[]> {
  try {
    const payload = await getPayload({ config });

    const [cats, items] = await Promise.all([
      payload.find({ collection: "categories", sort: "order", limit: 200 }),
      payload.find({
        collection: "gallery-items",
        depth: 1,
        limit: 1000,
        sort: "order",
      }),
    ]);

    // Group gallery images by their category id.
    const byCat: Record<string, { url: string; alt: string }[]> = {};
    for (const item of items.docs) {
      const cat = item.category as unknown;
      const catId =
        cat && typeof cat === "object"
          ? (cat as { id: string | number }).id
          : cat;
      const image = item.image;
      const url =
        image && typeof image === "object" ? (image.url ?? null) : null;
      if (catId == null || !url) continue;
      const key = String(catId);
      (byCat[key] ??= []).push({
        url,
        alt:
          (image && typeof image === "object" && image.alt) ||
          (item.title as string) ||
          "",
      });
    }

    return cats.docs.map((c) => ({
      slug: (c.slug as string) || String(c.id),
      labelEn: (c.labelEn as string) || "",
      labelZh: (c.labelZh as string) || (c.labelEn as string) || "",
      subEn: (c.subEn as string) || "",
      subZh: (c.subZh as string) || (c.subEn as string) || "",
      images: byCat[String(c.id)] ?? [],
    }));
  } catch (err) {
    // DB not configured / unreachable — render an empty gallery rather than crash.
    console.error("[work] failed to load categories from Payload:", err);
    return [];
  }
}

export default async function Page() {
  const categories = await loadCategories();
  return <WorkContent categories={categories} />;
}
