import { getPayload } from "payload";
import config from "@payload-config";

export type GalleryImage = {
  url: string;
  alt: string;
  title?: string;
  caption?: string;
  location?: string;
  size?: string;
  businessType?: string;
  baseMaterial?: string;
  price?: string;
};

type RawGalleryItem = {
  title?: string;
  category?: unknown;
  image?: unknown;
  alt?: string;
  caption?: string;
  location?: string;
  size?: string;
  businessType?: string;
  businessTypeOther?: string;
  baseMaterial?: string;
  price?: string;
  priceCustom?: string;
};

export type WorkCategory = {
  slug: string;
  labelEn: string;
  labelZh: string;
  subEn: string;
  subZh: string;
  cover?: string;
  images: GalleryImage[];
};

type RawCategory = {
  id: string | number;
  slug?: string;
  labelEn?: string;
  labelZh?: string;
  subEn?: string;
  subZh?: string;
  coverImage?: unknown;
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
  for (const raw of items.docs) {
    const item = raw as RawGalleryItem;
    const image = item.image as
      | { url?: string | null; alt?: string | null }
      | string
      | null
      | undefined;
    const url =
      image && typeof image === "object" ? (image.url ?? null) : null;
    const mediaAlt =
      image && typeof image === "object" ? (image.alt ?? "") : "";
    if (!url) continue;

    // "Other" / "Custom" selects store the real text in a companion field.
    const businessType =
      item.businessType === "other" ? item.businessTypeOther : item.businessType;
    const price = item.price === "custom" ? item.priceCustom : item.price;

    const galleryImage: GalleryImage = {
      url,
      alt: item.alt || mediaAlt || item.title || "",
      title: item.title,
      caption: item.caption,
      location: item.location,
      size: item.size,
      businessType,
      baseMaterial: item.baseMaterial,
      price,
    };

    // category is now hasMany → the image belongs to every category selected.
    const cats = Array.isArray(item.category)
      ? item.category
      : item.category != null
        ? [item.category]
        : [];
    for (const cat of cats) {
      const catId =
        cat && typeof cat === "object"
          ? (cat as { id: string | number }).id
          : cat;
      if (catId == null) continue;
      (byCat[String(catId)] ??= []).push(galleryImage);
    }
  }
  return byCat;
}

function toWorkCategory(c: RawCategory, images: GalleryImage[]): WorkCategory {
  const coverImage = c.coverImage as { url?: string | null } | null | undefined;
  const cover =
    coverImage && typeof coverImage === "object"
      ? (coverImage.url ?? undefined)
      : undefined;
  return {
    slug: c.slug || String(c.id),
    labelEn: c.labelEn || "",
    labelZh: c.labelZh || c.labelEn || "",
    subEn: c.subEn || "",
    subZh: c.subZh || c.subEn || "",
    cover: cover || images[0]?.url,
    images,
  };
}

// All categories, each with its images. Used by the /work landing grid.
export async function loadCategories(): Promise<WorkCategory[]> {
  try {
    const payload = await getPayload({ config });
    const [cats, byCat] = await Promise.all([
      payload.find({
        collection: "categories",
        sort: "order",
        limit: 200,
        depth: 1,
      }),
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
