import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

const revalidateHome = () => {
  try {
    revalidatePath("/");
  } catch (err) {
    console.error("[revalidate] / (reviews) skipped:", err);
  }
};

// Google reviews shown in the strip above "Our Project" on the home page.
// Copy your best Google reviews in here.
export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "rating", "order"],
    description: "Customer reviews shown on the home page.",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateHome()],
    afterDelete: [() => revalidateHome()],
  },
  fields: [
    { name: "author", type: "text", required: true, label: "Reviewer name" },
    {
      name: "rating",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: { description: "1 to 5 stars." },
    },
    { name: "text", type: "textarea", label: "Review text" },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};
