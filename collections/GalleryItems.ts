import type { CollectionConfig } from "payload";

import {
  revalidateWorkAfterChange,
  revalidateWorkAfterDelete,
} from "./revalidateWork";
import {
  MALAYSIA_STATES,
  BASE_MATERIALS,
  PRICE_TIERS,
  BUSINESS_TYPES,
} from "./signageOptions";

// Spaces / punctuation become hyphens; case is preserved. Matches the live
// preview in the admin SlugField component.
const formatSlug = (s: string) =>
  (s || "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// The work / portfolio gallery. Each item is one project photo plus the
// details shown on /work and in the lightbox. Category values match the
// section ids on /work.
export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  labels: { singular: "Gallery Item", plural: "Gallery Items" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "location", "order"],
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          // Slug always follows the Title (falls back to any manual slug text).
          data.slug = formatSlug(data.title || data.slug || "");
        }
        return data;
      },
    ],
    afterChange: [revalidateWorkAfterChange],
    afterDelete: [revalidateWorkAfterDelete],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      index: true,
      admin: {
        components: {
          Field: "@/components/admin/SlugField#SlugField",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          hasMany: true,
          required: true,
          admin: {
            width: "60%",
            description:
              "Pick one or more — this image shows in every category you select.",
          },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          admin: {
            width: "40%",
            description: "Lower numbers show first within a category.",
          },
        },
      ],
    },
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
        description:
          "Describes the image for screen readers and SEO. Falls back to the Title if blank.",
      },
    },
    {
      name: "caption",
      type: "textarea",
      admin: {
        description: "Short description shown under the enlarged image.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "location",
          type: "select",
          options: MALAYSIA_STATES,
          admin: { width: "50%", description: "Malaysian state / territory." },
        },
        {
          name: "businessType",
          type: "select",
          label: "Business Type",
          options: [
            ...BUSINESS_TYPES,
            { label: "Other (type your own)", value: "other" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "businessTypeOther",
      type: "text",
      label: "Business Type (Other)",
      admin: {
        condition: (data) => data?.businessType === "other",
        description: "Shown only when Business Type is set to Other.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "baseMaterial",
          type: "select",
          label: "Base Material",
          options: BASE_MATERIALS,
          admin: { width: "50%" },
        },
        {
          name: "price",
          type: "select",
          options: [
            ...PRICE_TIERS,
            { label: "Custom (type your own)", value: "custom" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "priceCustom",
      type: "text",
      label: "Price (Custom)",
      admin: {
        condition: (data) => data?.price === "custom",
        description: "Shown only when Price is set to Custom.",
      },
    },
  ],
};
