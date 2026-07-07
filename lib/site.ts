import { getPayload } from "payload";
import config from "@payload-config";

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
};

// Social media URLs, managed in the Site Settings global in the admin.
export async function loadSocialLinks(): Promise<SocialLinks> {
  try {
    const payload = await getPayload({ config });
    const s = await payload.findGlobal({ slug: "site-settings" });
    return {
      facebook: (s?.facebook as string) || undefined,
      instagram: (s?.instagram as string) || undefined,
      tiktok: (s?.tiktok as string) || undefined,
    };
  } catch (err) {
    console.error("[site] failed to load social links:", err);
    return {};
  }
}
