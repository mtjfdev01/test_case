"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { HOME_FAQS, homeFaqJsonLd, type HomeFaqItem } from "@/data/homeFaqs";

function FaqAnswerText({ faq }: { faq: HomeFaqItem }) {
  if (!faq.links?.length) return faq.answer;

  const nodes: ReactNode[] = [];
  let rest = faq.answer;
  let key = 0;

  for (const link of faq.links) {
    const at = rest.indexOf(link.text);
    if (at === -1) continue;
    if (at > 0) nodes.push(rest.slice(0, at));
    nodes.push(
      <Link key={key++} href={link.href} className="home-faq-inline-link">
        {link.text}
      </Link>,
    );
    rest = rest.slice(at + link.text.length);
  }

  if (rest) nodes.push(rest);
  return nodes;
}
import { siteOrigin } from "@/lib/seo";
import "./HomeFaqs.css";

export default function HomeFaqs() {
  const [openIndex, setOpenIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const baseId = useId();
  const jsonLd = homeFaqJsonLd(siteOrigin());

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className={`home-faq px-4 py-16 sm:px-6 sm:py-20 lg:py-24 ${inView ? "is-inview" : ""}`}
      aria-labelledby="home-faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <span className="home-faq-orb home-faq-orb--a" aria-hidden />
      <span className="home-faq-orb home-faq-orb--b" aria-hidden />

      <div className="home-faq-inner mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="home-faq-copy lg:sticky lg:top-28">
          <p className="home-faq-kicker text-xs font-semibold uppercase tracking-[0.22em]">
            Packaging FAQs
          </p>
          <h2
            id="home-faq-heading"
            className="home-faq-heading mt-3 max-w-md text-[2.05rem] font-extrabold leading-[1.3] text-[var(--dark-primary-green)] sm:text-4xl sm:leading-[1.28] lg:text-[2.75rem] lg:leading-[1.26]"
          >
            Answers before you print a single carton.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--dark-primary-green)]/75 sm:text-base">
            The questions USA brands ask most about custom boxes, rigid packaging, pouches, bags,
            and labels — timelines, MOQs, print, and how to get a written quote.
          </p>
          <Link
            href="/quote"
            className="home-faq-cta mt-7 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Get a Quote
            <svg className="home-faq-cta-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-3 pr-[3.4rem] md:pr-0">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const triggerId = `${baseId}-trigger-${index}`;

            return (
              <article
                key={faq.question}
                className={`home-faq-item rounded-2xl ${isOpen ? "is-open" : ""}`}
                style={{ ["--i" as string]: index }}
              >
                <h3 className="m-0">
                  <button
                    id={triggerId}
                    type="button"
                    className="home-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="home-faq-index text-[0.7rem] font-bold tracking-[0.14em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="home-faq-question text-[0.98rem] sm:text-[1.05rem]">
                      {faq.question}
                    </span>
                    <span className="home-faq-plus" aria-hidden>
                      <span className="home-faq-plus-h" />
                      <span className="home-faq-plus-v" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="home-faq-panel"
                >
                  <div className="home-faq-panel-inner">
                    <p className="home-faq-answer m-0 text-sm sm:text-[0.9375rem]">
                      <FaqAnswerText faq={faq} />
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
