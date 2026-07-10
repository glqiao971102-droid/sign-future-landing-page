import { getPayload } from "payload";
import config from "@payload-config";

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  googleReviewsUrl?: string;
  googleRating?: string;
  googleReviewCount?: string;
  gtmId?: string;
  ga4Id?: string;
  googleSiteVerification?: string;
};

// Social media URLs, Google review info, and analytics IDs — all from the
// Site Settings global.
export async function loadSocialLinks(): Promise<SocialLinks> {
  try {
    const payload = await getPayload({ config });
    const s = await payload.findGlobal({ slug: "site-settings" });
    return {
      facebook: (s?.facebook as string) || undefined,
      instagram: (s?.instagram as string) || undefined,
      tiktok: (s?.tiktok as string) || undefined,
      googleReviewsUrl: (s?.googleReviewsUrl as string) || undefined,
      googleRating: (s?.googleRating as string) || undefined,
      googleReviewCount: (s?.googleReviewCount as string) || undefined,
      gtmId: (s?.gtmId as string) || undefined,
      ga4Id: (s?.ga4Id as string) || undefined,
      googleSiteVerification: (s?.googleSiteVerification as string) || undefined,
    };
  } catch (err) {
    console.error("[site] failed to load site settings:", err);
    return {};
  }
}
