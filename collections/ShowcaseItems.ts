import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import {
  MALAYSIA_STATES,
  BASE_MATERIALS,
  PRICE_TIERS,
  BUSINESS_TYPES,
} from "./signageOptions";

const revalidateHome = () => {
  try {
    revalidatePath("/");
  } catch (err) {
    console.error("[revalidate] / (showcase) skipped:", err);
  }
};

// The cards in the "Who Is It For?" section on the home page. Each is a photo
// plus the same detail fields as Gallery Items.
export const ShowcaseItems: CollectionConfig = {
  slug: "showcase-items",
  labels: { singular: "Home Showcase Item", plural: "Home Showcase" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "location", "order"],
    description: 'Photos + details shown in the home page "Who Is It For?" grid.',
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateHome()],
    afterDelete: [() => revalidateHome()],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      admin: { description: "Short line shown under the enlarged image." },
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
          name: "size",
          type: "text",
          admin: { width: "50%", description: "e.g. 10ft x 3ft" },
        },
      ],
    },
    {
      type: "row",
      fields: [
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
        {
          name: "baseMaterial",
          type: "select",
          label: "Base Material",
          options: BASE_MATERIALS,
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
          name: "price",
          type: "select",
          options: [
            ...PRICE_TIERS,
            { label: "Custom (type your own)", value: "custom" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          admin: { width: "50%", description: "Lower numbers show first." },
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
