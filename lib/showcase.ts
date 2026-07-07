import { getPayload } from "payload";
import config from "@payload-config";

export type ShowcaseItem = {
  title: string;
  description: string;
  url: string;
  alt: string;
  location?: string;
  size?: string;
  businessType?: string;
  baseMaterial?: string;
  price?: string;
};

type RawShowcase = {
  title?: string;
  description?: string;
  image?: unknown;
  location?: string;
  size?: string;
  businessType?: string;
  businessTypeOther?: string;
  baseMaterial?: string;
  price?: string;
  priceCustom?: string;
};

// Home "Who Is It For?" cards, managed in the Home Showcase collection.
export async function loadShowcase(): Promise<ShowcaseItem[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "showcase-items",
      sort: "order",
      limit: 100,
      depth: 1,
    });

    const items: ShowcaseItem[] = [];
    for (const raw of res.docs) {
      const doc = raw as RawShowcase;
      const image = doc.image as
        | { url?: string | null }
        | null
        | undefined;
      const url =
        image && typeof image === "object" ? (image.url ?? null) : null;
      if (!url) continue;

      const businessType =
        doc.businessType === "other" ? doc.businessTypeOther : doc.businessType;
      const price = doc.price === "custom" ? doc.priceCustom : doc.price;

      items.push({
        title: doc.title || "",
        description: doc.description || "",
        url,
        alt: doc.title || "",
        location: doc.location,
        size: doc.size,
        businessType,
        baseMaterial: doc.baseMaterial,
        price,
      });
    }

    // Sort by price, cheapest first. Items with no price go last.
    const priceValue = (p?: string) => {
      const digits = (p || "").replace(/[^0-9]/g, "");
      return digits ? parseInt(digits, 10) : Number.POSITIVE_INFINITY;
    };
    items.sort((a, b) => priceValue(a.price) - priceValue(b.price));

    return items;
  } catch (err) {
    console.error("[showcase] failed to load:", err);
    return [];
  }
}
