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
    // Trim stray whitespace so a copy-paste space can't break the tag IDs.
    const clean = (v: unknown) => {
      const t = typeof v === "string" ? v.trim() : "";
      return t || undefined;
    };
    return {
      facebook: clean(s?.facebook),
      instagram: clean(s?.instagram),
      tiktok: clean(s?.tiktok),
      googleReviewsUrl: clean(s?.googleReviewsUrl),
      googleRating: clean(s?.googleRating),
      googleReviewCount: clean(s?.googleReviewCount),
      gtmId: clean(s?.gtmId),
      ga4Id: clean(s?.ga4Id),
      googleSiteVerification: clean(s?.googleSiteVerification),
    };
  } catch (err) {
    console.error("[site] failed to load site settings:", err);
    return {};
  }
}
