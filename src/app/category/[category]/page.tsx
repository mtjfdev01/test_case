import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SaleCategoryClient from "@/components/sale/SaleCategoryClient";
import PageLoader from "@/components/common/PageLoader";
import { isValidCategorySlug, resolveCategorySlug, getCategoryHubFaqs } from "@/data/categoryPages";
import { HOME_CARDS } from "@/data/homeCards";
import { categoryShareMetadata, faqPageJsonLd, siteOrigin } from "@/lib/seo";
import { categoryHubPath } from "@/lib/routes";

export async function generateStaticParams() {
  return HOME_CARDS.map((c) => ({ category: c.category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const canonical = resolveCategorySlug(category);
  const card = HOME_CARDS.find((c) => c.category === canonical);
  if (!card || !canonical) {
    return { title: "Category | Brandsface" };
  }
  return categoryShareMetadata(canonical);
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategorySlug(category)) {
    notFound();
  }
  const canonical = resolveCategorySlug(category)!;
  const faqs = getCategoryHubFaqs(canonical);
  const card = HOME_CARDS.find((c) => c.category === canonical);
  const origin = siteOrigin();

  return (
    <>
      {faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqPageJsonLd(
                `${origin}${categoryHubPath(canonical)}`,
                `${card?.title ?? "Category"} FAQs | Brandsface`,
                faqs,
              ),
            ),
          }}
        />
      ) : null}
      <Suspense fallback={<PageLoader overlay />}>
        <SaleCategoryClient categorySlug={canonical} />
      </Suspense>
    </>
  );
}
