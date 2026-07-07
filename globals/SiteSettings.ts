import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

// Site-wide settings — currently the social media links shown in the contact
// section and the floating buttons. Edited once, used everywhere.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: { read: () => true },
  admin: {
    description: "Social media links used across the site.",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          // Links appear in the shared layout, so refresh every page.
          revalidatePath("/", "layout");
        } catch (err) {
          console.error("[revalidate] site-settings skipped:", err);
        }
      },
    ],
  },
  fields: [
    {
      name: "facebook",
      type: "text",
      label: "Facebook URL",
      admin: { description: "e.g. https://facebook.com/yourpage" },
    },
    {
      name: "instagram",
      type: "text",
      label: "Instagram URL",
      admin: { description: "e.g. https://instagram.com/yourhandle" },
    },
    {
      name: "tiktok",
      type: "text",
      label: "TikTok URL",
      admin: { description: "e.g. https://tiktok.com/@yourhandle" },
    },
  ],
};
