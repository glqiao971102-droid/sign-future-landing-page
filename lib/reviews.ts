import { getPayload } from "payload";
import config from "@payload-config";

export type Review = {
  author: string;
  rating: number;
  text: string;
};

export async function loadReviews(): Promise<Review[]> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "reviews",
      sort: "order",
      limit: 100,
      depth: 0,
    });
    return res.docs.map((d) => ({
      author: (d.author as string) || "",
      rating: Math.max(1, Math.min(5, Number(d.rating) || 5)),
      text: (d.text as string) || "",
    }));
  } catch (err) {
    console.error("[reviews] failed to load:", err);
    return [];
  }
}
