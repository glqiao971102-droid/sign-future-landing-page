import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

// Refresh the cached home page whenever a slide changes.
const revalidateHome = () => {
  try {
    revalidatePath("/");
  } catch (err) {
    console.error("[revalidate] / revalidation skipped:", err);
  }
};

// The big rotating images at the top of the home page. Add / delete / reorder
// them here and the home hero updates automatically.
export const HeroSlides: CollectionConfig = {
  slug: "hero-slides",
  labels: { singular: "Hero Slide", plural: "Hero Slides" },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "order"],
    description: "Big rotating images at the top of the home page.",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateHome()],
    afterDelete: [() => revalidateHome()],
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      admin: {
        description: "Describes the image for screen readers and SEO.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first." },
    },
  ],
};
