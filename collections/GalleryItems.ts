import type { CollectionConfig } from "payload";

// The work / portfolio gallery. Category values match the section ids on /work.
export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: { singular: "Gallery Item", plural: "Gallery Items" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "order"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text" },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "3D LED Signboard", value: "led" },
        { label: "3D Signboard", value: "threeD" },
        { label: "3D Stainless Steel Signboard", value: "steel" },
        { label: "Normal Signboard", value: "normal" },
        { label: "Neon Sign", value: "neon" },
        { label: "Indoor Signboard", value: "indoor" },
      ],
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
