import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import ThankYouView from "@/components/quote/ThankYouView";
import { THANK_YOU_FAQS } from "@/data/thankYouFaqs";
import { faqPageJsonLd, siteOrigin, thankYouShareMetadata } from "@/lib/seo";

export const metadata: Metadata = thankYouShareMetadata();

export default function ThankYouPage() {
  const origin = siteOrigin();
  const pageUrl = `${origin}/thank-you`;
  const faqLd = faqPageJsonLd(pageUrl, "Packaging Quote Confirmation FAQs | Brandsface", [...THANK_YOU_FAQS]);
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Thank You for Your Packaging Quote Request | Brandsface",
    description:
      "Confirmation page after submitting a custom packaging quote to Brandsface. Next steps, response times, and packaging categories to explore.",
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Brandsface",
      url: origin,
    },
    about: {
      "@type": "Service",
      name: "Custom packaging quote",
      provider: {
        "@type": "Organization",
        name: "Brandsface",
        url: origin,
      },
      areaServed: "US",
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: "Get a Quote", item: `${origin}/quote` },
      { "@type": "ListItem", position: 3, name: "Thank You", item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ThankYouView />
      <Footer showCtaBanner={false} />
    </>
  );
}
