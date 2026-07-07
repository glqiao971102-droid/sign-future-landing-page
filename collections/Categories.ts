import type { CollectionConfig } from "payload";

import {
  revalidateWorkAfterChange,
  revalidateWorkAfterDelete,
} from "./revalidateWork";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Gallery categories — fully managed from the admin panel. Adding / editing /
// reordering a category here syncs automatically to /work.
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Category", plural: "Categories" },
  admin: {
    useAsTitle: "labelEn",
    defaultColumns: ["labelEn", "labelZh", "slug", "order"],
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.labelEn) {
          data.slug = slugify(data.labelEn);
        }
        return data;
      },
    ],
    afterChange: [revalidateWorkAfterChange],
    afterDelete: [revalidateWorkAfterDelete],
  },
  fields: [
    { name: "labelEn", type: "text", required: true, label: "Label (English)" },
    { name: "labelZh", type: "text", label: "Label (中文)" },
    { name: "subEn", type: "text", label: "Subtitle (English)" },
    { name: "subZh", type: "text", label: "Subtitle (中文)" },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Cover Image",
      admin: {
        description:
          "Image shown on this category's card on /work. If left empty, the first gallery item's image is used.",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Auto-filled from the English label if left blank. Used as the #anchor on /work.",
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
