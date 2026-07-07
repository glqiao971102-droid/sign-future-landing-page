import type { Metadata } from "next";
import WorkContent from "@/components/WorkContent";
import { loadCategories } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Our Work — SIGN FUTURE ADVERTISING",
  description:
    "Our signboard portfolio — 3D LED signboards, 3D signage, stainless steel, normal signboards, neon signs and indoor signage by SIGN FUTURE ADVERTISING, Malaysia.",
};

// Gallery + categories come from Payload. Cache the rendered page so navigating
// to /work is instant, and refresh at most every 5 minutes as a fallback. The
// Categories / GalleryItems collections also call revalidatePath("/work") on
// every edit, so admin changes still appear immediately.
export const revalidate = 300;

export default async function Page() {
  const categories = await loadCategories();
  return <WorkContent categories={categories} />;
}
