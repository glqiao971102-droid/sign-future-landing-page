import { getPayload } from "payload";
import config from "@payload-config";

export type GalleryImage = { url: string; alt: string };

export type WorkCategory = {
  slug: string;
  labelEn: string;
  labelZh: string;
  subEn: string;
  subZh: string;
  images: GalleryImage[];
};

type RawCategory = {
  id: string | number;
  slug?: string;
  labelEn?: string;
  labelZh?: string;
  subEn?: string;
  subZh?: string;
};

// Pull every gallery image and bucket it by category id.
async function loadImagesByCategory(): Promise<
  Record<string, GalleryImage[]>
> {
  const payload = await getPayload({ config });
  const items = await payload.find({
    collection: "gallery-items",
    depth: 1,
    limit: 1000,
    sort: "order",
  });

  const byCat: Record<string, GalleryImage[]> = {};
  for (const item of items.docs) {
    const cat = item.category as unknown;
    const catId =
      cat && typeof cat === "object"
        ? (cat as { id: string | number }).id
        : cat;
    const image = item.image;
    const url = image && typeof image === "object" ? (image.url ?? null) : null;
    if (catId == null || !url) continue;
    (byCat[String(catId)] ??= []).push({
      url,
      alt:
        (image && typeof image === "object" && image.alt) ||
        (item.title as string) ||
        "",
    });
  }
  return byCat;
}

function toWorkCategory(c: RawCategory, images: GalleryImage[]): WorkCategory {
  return {
    slug: c.slug || String(c.id),
    labelEn: c.labelEn || "",
    labelZh: c.labelZh || c.labelEn || "",
    subEn: c.subEn || "",
    subZh: c.subZh || c.subEn || "",
    images,
  };
}

// All categories, each with its images. Used by the /work landing grid.
export async function loadCategories(): Promise<WorkCategory[]> {
  try {
    const payload = await getPayload({ config });
    const [cats, byCat] = await Promise.all([
      payload.find({ collection: "categories", sort: "order", limit: 200 }),
      loadImagesByCategory(),
    ]);
    return cats.docs.map((c) =>
      toWorkCategory(c as RawCategory, byCat[String((c as RawCategory).id)] ?? []),
    );
  } catch (err) {
    // DB unreachable — render an empty gallery rather than crash.
    console.error("[gallery] failed to load categories:", err);
    return [];
  }
}

// Just the category slugs — used to pre-render the /work/[slug] pages.
export async function loadCategorySlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const cats = await payload.find({
      collection: "categories",
      limit: 200,
      depth: 0,
    });
    return cats.docs
      .map((c) => (c as RawCategory).slug || String((c as RawCategory).id))
      .filter(Boolean);
  } catch (err) {
    console.error("[gallery] failed to load category slugs:", err);
    return [];
  }
}

// A single category (by slug) plus its images. Used by /work/[slug].
export async function loadCategory(
  slug: string,
): Promise<WorkCategory | null> {
  try {
    const payload = await getPayload({ config });
    const cats = await payload.find({
      collection: "categories",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const cat = cats.docs[0] as RawCategory | undefined;
    if (!cat) return null;

    const byCat = await loadImagesByCategory();
    return toWorkCategory(cat, byCat[String(cat.id)] ?? []);
  } catch (err) {
    console.error(`[gallery] failed to load category "${slug}":`, err);
    return null;
  }
}
