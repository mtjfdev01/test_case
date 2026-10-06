export type HomeFaqItem = {
  question: string;
  answer: string;
  /** Phrases in `answer` to wrap as in-page links. JSON-LD stays plain text. */
  links?: { text: string; href: string }[];
};

/**
 * Homepage FAQs — People-Also-Ask intent for custom packaging (USA market served).
 * Keep answers factual: do not claim US manufacturing.
 */
export const HOME_FAQS: HomeFaqItem[] = [
  {
    question: "How much does custom packaging cost?",
    answer:
      "Custom packaging cost depends on box style, board, print colors, finishing, quantity, and freight to your US warehouse. Brandsface does not publish a one-size catalog price. Share your specs and you get a written quote with structure and finishing options — so you can compare cost before you commit.",
  },
  {
    question: "What is the minimum order quantity for custom boxes?",
    answer:
      "MOQ depends on the format. Custom folding cartons and corrugated mailers usually start lower than rigid boxes or specialty pouches. We can often run samples or a pilot quantity for a USA launch — tell us your first-run volume when you request a quote.",
  },
  {
    question: "How long does custom packaging take?",
    answer:
      "Lead time starts after artwork approval. Simple cartons move faster than rigid boxes, foil, or emboss work. Brandsface locks a production window you can plan a US launch around. Book early for Q4, Christmas packaging, and peak e-commerce dates.",
  },
  {
    question: "What types of custom packaging can you make?",
    answer:
      "Brandsface makes custom folding cartons (art card), corrugated shippers and mailers, kraft boxes, luxury rigid boxes, stand-up and spout pouches, carry bags, labels and tags, and Christmas packaging. We match structure, print, and finish to your product, shelf, and unboxing.",
  },
  {
    question: "Can I print my logo on custom boxes?",
    answer:
      "Yes. We print your logo, brand colors, and Pantone targets on custom boxes, pouches, bags, and labels, then proof so shelf and unboxing match. Foil, emboss, soft-touch, windows, and inserts are available where the structure supports them. Upload artwork with your quote if you already have a dieline.",
  },
  {
    question: "Do you ship custom packaging to the USA?",
    answer:
      "Yes. Brandsface is a custom packaging company serving brands across the USA. We specify boxes, pouches, bags, and labels for US retail and e-commerce, then ship to your US destination. Quotes include a production window and freight to the address you give us.",
  },
  {
    question: "How do I get a custom packaging quote?",
    answer:
      "Open Get a Quote, add your name, product type, size, quantity, and the US ship-to location. Include artwork or notes if you have them. You will get a written scope, finishing options, and a production window — so you can compare structure and cost before you commit.",
    links: [{ text: "Open Get a Quote", href: "/quote" }],
  },
];

export function homeFaqJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    url: `${origin}/`,
    name: "Brandsface custom packaging FAQs",
    isPartOf: {
      "@type": "WebSite",
      name: "Brandsface",
      url: origin,
    },
  };
}
