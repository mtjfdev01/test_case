"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const HERO_READY_MAX_MS = 8000;
const AUTOPLAY_MS = 6500;

type HeroSlide = {
  id: string;
  headingTag: "h1" | "h2";
  mobileSrc: string;
  desktopSrc: string;
  imageAlt: string;
  /** Tailwind object-position classes; defaults match other category heroes */
  mobileObjectPosition?: string;
  desktopObjectPosition?: string;
  eyebrow: string;
  title: string;
  highlight: string;
  sub: string;
  desc: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

const QUOTE_CTA = { href: "/quote", label: "Get a Quote" } as const;

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "folding-cartons",
    headingTag: "h1",
    mobileSrc: "/assets/images/home_hero/v3-mobile-folding.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-folding.png",
    imageAlt:
      "Custom folding carton assortment — gable boxes, pillow packs, tuck ends, open printed interiors, and foil-accent retail cartons in forest green gold ivory and navy",
    eyebrow: "Custom Folding Cartons",
    title: "Printed Cartons",
    highlight: "Every Style",
    sub: "Gable, pillow, tuck-end, and sleeve cartons — one premium print system for every SKU.",
    desc: "Open interiors, foil accents, and soft-touch art card board — custom folding carton packaging for brands across the USA.",
    primary: { href: "/category/art_card_boxes", label: "Explore Folding Cartons" },
    secondary: QUOTE_CTA,
  },
  {
    id: "christmas",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-christmas.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-christmas.png",
    imageAlt: "Four Christmas packaging products: gift bag, wrapping paper, sweet box, and folding carton",
    eyebrow: "Custom Christmas Packaging",
    title: "Christmas Gift Boxes",
    highlight: "Bags & Wrap",
    sub: "Four premium Christmas formats for retail, hampers, and corporate gifting.",
    desc: "Gift bags, wrapping paper, sweet boxes, and festive folding cartons — one seasonal brand look.",
    primary: { href: "/category/christmas-packaging", label: "Explore Christmas Packaging" },
    secondary: QUOTE_CTA,
  },
  {
    id: "rigid",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-rigid.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-rigid.png",
    imageAlt: "Four premium rigid boxes: foam insert, velvet, divider, and printed magnetic",
    eyebrow: "Custom Rigid Boxes",
    title: "Inserts, Velvet",
    highlight: "Dividers & Print",
    sub: "Four premium rigid structures with inserts, foil, and magnetic closures.",
    desc: "Foam-insert, velvet, divider, and custom-printed rigid boxes for luxury unboxing.",
    primary: { href: "/category/rigid_boxes", label: "Explore Rigid Boxes" },
    secondary: QUOTE_CTA,
  },
  {
    id: "collection",
    headingTag: "h2",
    mobileSrc: "/assets/images/home_hero/v3-mobile-collection.png",
    desktopSrc: "/assets/images/home_hero/v3-desktop-collection.png",
    imageAlt: "Kraft window pouch, folding carton food packs, carry bag, kraft box, and hang tags",
    eyebrow: "Custom Packaging Company",
    title: "Boxes, Bags",
    highlight: "Pouches & Labels",
    sub: "One product from each remaining line — folding cartons, corrugated, pouches, bags, kraft, and tags.",
    desc: "Premium packaging for every idea, industry, and occasion across the USA.",
    primary: { href: "/catalog", label: "Explore All Products" },
    secondary: QUOTE_CTA,
  },
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function getViewportHeroSrc(slide: HeroSlide): string {
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
    return slide.mobileSrc;
  }
  return slide.desktopSrc;
}

function getHeroAssetUrls(): string[] {
  return [getViewportHeroSrc(HERO_SLIDES[0])];
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

function HeroSlidePhoto({
  item,
  eager,
  priority,
}: {
  item: HeroSlide;
  eager: boolean;
  priority: boolean;
}) {
  const isDesktop = useIsDesktop();
  if (!eager) return null;

  const showMobile = isDesktop !== true;
  const showDesktop = isDesktop !== false;
  const desktopPos = item.desktopObjectPosition ?? "object-[78%_center]";

  return (
    <>
      {showMobile ? (
        <Image
          src={item.mobileSrc}
          alt={item.imageAlt}
          width={1080}
          height={1100}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={90}
          sizes="100vw"
          className={
            isDesktop === null
              ? "h-auto w-full object-cover lg:hidden"
              : "h-auto w-full object-cover"
          }
          style={{ width: "100%", height: "auto" }}
        />
      ) : null}
      {showDesktop ? (
        <Image
          src={item.desktopSrc}
          alt={item.imageAlt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={90}
          sizes="100vw"
          className={
            isDesktop === null
              ? `hidden object-cover ${desktopPos} lg:block`
              : `object-cover ${desktopPos}`
          }
        />
      ) : null}
    </>
  );
}

function SlideCopy({ slide, compact = false }: { slide: HeroSlide; compact?: boolean }) {
  const Heading = slide.headingTag;
  return (
    <div
      className={`min-w-0 max-w-full ${
        compact
          ? "mx-auto w-full max-w-xl rounded-2xl bg-[#132f2b]/82 px-3.5 py-4 text-center shadow-[0_12px_40px_rgba(19,47,43,0.45)] backdrop-blur-md sm:px-5 sm:py-5"
          : "max-w-xl text-left"
      }`}
    >
      <p
        className={`flex items-center font-semibold uppercase tracking-[0.22em] text-[#c5a059] ${
          compact
            ? "justify-center gap-3 text-[10px] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
            : "justify-start gap-4 text-[11px] [text-shadow:0_1px_12px_rgba(19,47,43,0.55)]"
        }`}
      >
        <span className={`h-px bg-[#c5a059]/70 ${compact ? "w-8" : "w-10"}`} aria-hidden />
        {slide.eyebrow}
        {compact ? <span className="h-px w-8 bg-[#c5a059]/70" aria-hidden /> : null}
      </p>
      <Heading
        className={`font-[family-name:var(--font-playfair)] font-extrabold leading-[1.12] tracking-normal text-white ${
          compact
            ? "mt-2.5 text-[1.9rem] max-[360px]:text-[1.65rem] sm:text-4xl [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]"
            : "mt-4 text-[2.65rem] xl:text-[3.15rem] [text-shadow:0_2px_24px_rgba(19,47,43,0.55)]"
        }`}
      >
        <span className="block">{slide.title}</span>
        <span className="mt-1 block text-[#ead9b8]">{slide.highlight}</span>
      </Heading>
      <span
        className={`mt-3 block h-px bg-gradient-to-r from-[#c5a059] to-transparent ${
          compact ? "mx-auto w-16" : "mt-4 w-20"
        }`}
        aria-hidden
      />
      <p
        className={`font-semibold leading-snug text-white ${
          compact
            ? "mt-2.5 text-[14px] [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
            : "mt-4 text-[15px] xl:text-base [text-shadow:0_1px_16px_rgba(19,47,43,0.55)]"
        }`}
      >
        {slide.sub}
      </p>
      {compact ? null : (
        <p className="mt-3 text-sm leading-relaxed !text-white [text-shadow:0_1px_16px_rgba(19,47,43,0.55)] xl:text-[15px]">
          {slide.desc}
        </p>
      )}
      <div
        className={`flex flex-wrap items-center gap-3 ${
          compact ? "mt-4 justify-center" : "mt-7 justify-start"
        }`}
      >
        <Link
          href={slide.primary.href}
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1a3a2a] shadow-lg shadow-black/20 transition-all hover:scale-[1.03] hover:bg-gray-100 active:scale-[0.98] sm:px-8"
        >
          {slide.primary.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href={slide.secondary.href}
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-white transition-all sm:px-7 ${
            compact
              ? "border-[#c5a059] bg-[#132f2b]/70 hover:bg-[#c5a059]/20"
              : "border-[#c5a059]/70 hover:border-[#c5a059] hover:bg-[#c5a059]/10"
          }`}
        >
          {slide.secondary.label}
        </Link>
      </div>
    </div>
  );
}

type HomeHeroProps = {
  onReady?: () => void;
};

export default function HomeHero({ onReady }: HomeHeroProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const [loadRest, setLoadRest] = useState(false);
  const isDesktop = useIsDesktop();
  const slide = HERO_SLIDES[active] ?? HERO_SLIDES[0];
  const mobileAutoHeight = isDesktop !== true;

  useEffect(() => {
    let cancelled = false;
    let didNotify = false;
    let restTimer = 0;
    const finish = () => {
      if (cancelled || didNotify) return;
      didNotify = true;
      onReady?.();
      window.setTimeout(() => swiperRef.current?.autoplay?.start(), 400);

      const startRest = () => {
        if (cancelled) return;
        setLoadRest(true);
        HERO_SLIDES.slice(1).forEach((item) => {
          void preloadImage(getViewportHeroSrc(item));
        });
      };

      restTimer = window.setTimeout(startRest, 500);
    };

    const maxTimer = window.setTimeout(finish, HERO_READY_MAX_MS);
    void Promise.all(getHeroAssetUrls().map(preloadImage)).then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
      window.clearTimeout(restTimer);
    };
  }, [onReady]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.params.autoHeight = mobileAutoHeight;
    swiper.update();
  }, [mobileAutoHeight]);

  return (
    <section
      id="home-hero"
      className="relative flex w-full max-w-full flex-col overflow-hidden bg-[var(--dark-primary-green)] lg:block lg:h-[calc(100dvh-var(--site-header-h))] lg:max-h-[calc(100dvh-var(--site-header-h))]"
    >
      {/* Mobile: copy first, then full image below (no fixed viewport height) */}
      <div className="relative z-20 shrink-0 px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-6 lg:hidden">
        <SlideCopy slide={slide} compact />
      </div>

      <div className="relative w-full lg:absolute lg:inset-0">
        <Swiper
          modules={[Autoplay, Keyboard]}
          loop
          speed={900}
          spaceBetween={0}
          slidesPerView={1}
          autoHeight={mobileAutoHeight}
          initialSlide={0}
          keyboard={{ enabled: true }}
          autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.autoplay?.stop();
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.realIndex);
          }}
          className={`home-hero-swiper w-full max-w-full overflow-hidden [&_.swiper-slide]:max-w-full [&_.swiper-slide]:overflow-hidden ${
            mobileAutoHeight
              ? "h-auto [&_.swiper-slide]:h-auto"
              : "!h-full min-h-0 [&_.swiper-wrapper]:h-full [&_.swiper-slide]:!h-full"
          }`}
        >
          {HERO_SLIDES.map((item, idx) => (
            <SwiperSlide key={item.id} className={mobileAutoHeight ? "h-auto" : "!h-full overflow-hidden"}>
              <div
                className={`relative w-full overflow-hidden ${
                  mobileAutoHeight ? "h-auto" : "h-full min-h-0"
                }`}
              >
                <div
                  className={`hero-photo ${
                    mobileAutoHeight ? "relative w-full" : "absolute inset-0"
                  }`}
                >
                  <HeroSlidePhoto
                    item={item}
                    eager={idx === 0 || loadRest || idx === active}
                    priority={idx === 0}
                  />
                </div>
                <span
                  className="hero-shine pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-1/3 bg-gradient-to-r from-transparent via-[#ead9b8]/25 to-transparent lg:block"
                  aria-hidden
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[52%] bg-gradient-to-r from-[#132f2b]/92 via-[#132f2b]/58 to-transparent lg:block xl:w-[48%]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-t from-[#132f2b]/28 via-transparent to-transparent lg:block"
          aria-hidden
        />

        <span
          className="home-hero-orb pointer-events-none absolute left-[18%] top-[22%] z-[2] hidden h-24 w-24 rounded-full bg-[#c5a059]/18 blur-2xl lg:block"
          aria-hidden
        />
        <span
          className="home-hero-orb home-hero-orb-b pointer-events-none absolute bottom-[28%] right-[14%] z-[2] hidden h-32 w-32 rounded-full bg-[#ead9b8]/12 blur-3xl lg:block"
          aria-hidden
        />

        {/* Desktop overlay copy */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden h-full flex-col justify-center px-12 pb-20 pt-10 lg:flex xl:px-16">
          <div className="pointer-events-auto">
            <SlideCopy slide={slide} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-3 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-12 xl:right-16">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/60 bg-[#132f2b]/55 text-[#ead9b8] backdrop-blur-sm transition hover:bg-[#c5a059] hover:text-[#132f2b]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 6 9 12l6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/60 bg-[#132f2b]/55 text-[#ead9b8] backdrop-blur-sm transition hover:bg-[#c5a059] hover:text-[#132f2b]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
