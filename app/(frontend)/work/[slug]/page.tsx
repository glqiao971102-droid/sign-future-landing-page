import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryContent from "@/components/CategoryContent";
import { loadCategory, loadCategorySlugs } from "@/lib/gallery";

// Same caching strategy as /work — cached, refreshed every 5 min, and
// revalidated immediately when the admin edits categories or gallery items.
export const revalidate = 300;

// Pre-render every category page so navigating from a card is instant. New
// categories added later still render on demand (dynamicParams defaults true).
export async function generateStaticParams() {
  const slugs = await loadCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await loadCategory(slug);
  const label = category?.labelEn || "Our Work";
  return {
    title: `${label} — SIGN FUTURE ADVERTISING`,
    description: category?.subEn || undefined,
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const category = await loadCategory(slug);
  if (!category) notFound();
  return <CategoryContent category={category} />;
}
