import Image from "next/image";
import Link from "next/link";
import { HOME_CARDS } from "@/data/homeCards";
import { THANK_YOU_FAQS } from "@/data/thankYouFaqs";

const NEXT_STEPS = [
  {
    step: "01",
    title: "We review your brief",
    body: "Our team reads your requirements, artwork notes, and any uploaded references so we understand structure, quantity, and finish.",
  },
  {
    step: "02",
    title: "We prepare options",
    body: "You get clear recommendations on board, print, and finishing — folding cartons, rigid boxes, bags, or labels — matched to your brand.",
  },
  {
    step: "03",
    title: "We reply with next steps",
    body: "Expect a personal follow-up with questions or a quote path so you can move from idea to production with confidence.",
  },
] as const;

const EXPLORE = HOME_CARDS.filter((c) =>
  ["art_card_boxes", "rigid_boxes", "christmas-packaging", "corrugated_boxes"].includes(c.category),
).slice(0, 4);

export default function ThankYouView() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f0ea]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="quote-orb absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#1dd1a1]/25 blur-3xl" />
        <div className="quote-orb-delay absolute right-[-3rem] top-32 h-80 w-80 rounded-full bg-[#c5a059]/20 blur-3xl" />
        <div className="quote-orb absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#103a2a]/12 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        {/* Hero confirmation */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#132f2b] px-6 py-12 text-center shadow-[0_24px_80px_rgba(19,47,43,0.28)] sm:px-10 sm:py-16 lg:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 70% 20%, rgba(197,160,89,0.35), transparent 55%), radial-gradient(ellipse 50% 50% at 15% 80%, rgba(29,209,161,0.18), transparent 50%)",
            }}
            aria-hidden
          />
          <div className="relative">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">
              <span className="h-px w-8 bg-[#c5a059]/70" aria-hidden />
              Quote received
              <span className="h-px w-8 bg-[#c5a059]/70" aria-hidden />
            </p>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1dd1a1]/15 ring-1 ring-[#1dd1a1]/40">
              <svg className="h-8 w-8 text-[#1dd1a1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-[2.4rem] font-extrabold leading-[1.12] tracking-normal text-white sm:text-5xl lg:text-[3.35rem]">
              Thank you
              <span className="mt-1 block text-[#ead9b8]">We&apos;ve got your request</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Your custom packaging quote is in our queue. A Brandsface specialist will review your brief and follow up
              — usually within one business day — so you can move forward with folding cartons, rigid boxes, bags, or
              labels for brands across the USA.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1a3a2a] shadow-lg shadow-black/20 transition hover:bg-gray-100"
              >
                Browse packaging catalog
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/70 px-6 py-3 text-sm font-medium text-white transition hover:border-[#c5a059] hover:bg-[#c5a059]/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* What happens next */}
        <section className="mt-14 sm:mt-16" aria-labelledby="thank-you-next-steps">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">What happens next</p>
            <h2
              id="thank-you-next-steps"
              className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[#103a2a] sm:text-4xl"
            >
              From brief to packaging plan
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
              A clear process keeps your custom box quote moving — whether you need retail cartons, luxury rigid boxes,
              or seasonal gift packaging.
            </p>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {NEXT_STEPS.map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-[#103a2a]/08 bg-white/80 p-6 shadow-[0_10px_40px_rgba(16,58,42,0.06)] backdrop-blur-sm"
              >
                <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#c5a059]">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[#103a2a]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#103a2a]/75">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Explore categories — SEO internal links */}
        <section className="mt-16 sm:mt-20" aria-labelledby="thank-you-explore">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">While you wait</p>
            <h2
              id="thank-you-explore"
              className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[#103a2a] sm:text-4xl"
            >
              Explore packaging lines
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
              Browse popular formats so you can refine specs before our call — custom folding cartons, rigid boxes,
              Christmas packaging, and corrugated mailers.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((card) => (
              <li key={card.category}>
                <Link
                  href={`/category/${card.category}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-[0_10px_36px_rgba(16,58,42,0.08)] ring-1 ring-[#103a2a]/08 transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(16,58,42,0.12)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e2d8]">
                    <Image
                      src={card.image}
                      alt={card.heroTitle}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-sm font-bold text-[#103a2a]">{card.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#103a2a]/65">
                      {card.heroDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1a3a2a]">
                      View category
                      <svg className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — SEO */}
        <section className="mt-16 sm:mt-20" aria-labelledby="thank-you-faqs">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c5a059]">Quote FAQs</p>
            <h2
              id="thank-you-faqs"
              className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-extrabold text-[#103a2a] sm:text-4xl"
            >
              Common questions after you submit
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {THANK_YOU_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[#103a2a]/10 bg-white/90 px-5 py-4 open:shadow-[0_10px_36px_rgba(16,58,42,0.08)]"
              >
                <summary className="cursor-pointer list-none text-left text-sm font-semibold text-[#103a2a] marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-3">
                    {faq.question}
                    <span className="mt-0.5 shrink-0 text-[#c5a059] transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#103a2a]/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-16 rounded-[2rem] border border-[#103a2a]/10 bg-white/70 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-extrabold text-[#103a2a] sm:text-3xl">
            Need to add details?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
            You can submit another quote with updated quantities, dielines, or artwork — or open Get a Quote again from
            the menu anytime.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center rounded-full bg-[#103a2a] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0c2e22]"
            >
              Open Get a Quote
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center rounded-full border border-[#103a2a]/25 px-6 py-3 text-sm font-medium text-[#103a2a] transition hover:border-[#103a2a]/45"
            >
              Contact support
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
