import type { CollectionConfig } from "payload";

import {
  revalidateWorkAfterChange,
  revalidateWorkAfterDelete,
} from "./revalidateWork";

// The work / portfolio gallery. Category values match the section ids on /work.
export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: { singular: "Gallery Item", plural: "Gallery Items" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order"],
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateWorkAfterChange],
    afterDelete: [revalidateWorkAfterDelete],
  },
  fields: [
    { name: "title", type: "text" },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers show first within a category." },
    },
  ],
};
