"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[#103a2a]/15 bg-white px-4 py-2.5 text-sm text-[#103a2a] placeholder:text-[#103a2a]/40 outline-none transition focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25";

const labelClass = "mb-1.5 block text-sm font-semibold text-[#103a2a]";

export type QuickQuoteHeroSectionProps = {
  className?: string;
  /** Full-area background (e.g. `/assets/...`). Omit to use a neutral placeholder until you add an asset. */
  backgroundSrc?: string;
  /** Optional smaller / cropped asset for narrow viewports. */
  backgroundSrcMobile?: string;
  /** Card horizontal placement (use `left` when the artwork has open space on the left). */
  formAlign?: "left" | "right";
  /** `hero` = tall viewport-style band; `band` = shorter strip for mid-page (e.g. category hubs). */
  layout?: "hero" | "band";
  /** Align the card to the top of the hero band (flush with the image top) with square top corners. */
  hangOnTop?: boolean;
  /** Extra classes on the inner max-width row (flex). Use for manual padding / min-height / alignment tweaks. */
  contentClassName?: string;
  /** Extra classes on the white form card. Use for manual position: e.g. `-mt-[72px] mr-[8%] translate-y-2`. */
  cardClassName?: string;
};

/**
 * Hero band: full-bleed background image + right-aligned “Get Free Quote” card.
 */
export default function QuickQuoteHeroSection({
  className = "",
  backgroundSrc,
  backgroundSrcMobile,
  formAlign = "right",
  layout = "hero",
  hangOnTop = false,
  contentClassName = "",
  cardClassName = "",
}: QuickQuoteHeroSectionProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const next = e.target.files?.[0] ?? null;
    if (!next) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(next.type)) {
      setFileError("Please upload a JPG, PNG, or WEBP image.");
      setFile(null);
      e.target.value = "";
      return;
    }
    if (next.size > MAX_FILE_BYTES) {
      setFileError("Image must be 8 MB or smaller.");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(next);
  };

  const clearFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setFileError("");

    const fullNameValue = fullName.trim();
    const phoneValue = phone.trim();
    const emailValue = email.trim();
    const requirementValue = requirement.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const hasPhone = phoneDigits.length >= 7;
    const hasEmail = EMAIL_RE.test(emailValue);

    if (!phoneValue && !emailValue) {
      setError("Please enter an email or a contact number.");
      return;
    }
    if (phoneValue && !hasPhone) {
      setError("Please enter a valid contact number.");
      return;
    }
    if (emailValue && !hasEmail) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!hasPhone && !hasEmail) {
      setError("Please enter an email or a contact number.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("fullName", fullNameValue);
      formData.append("phone", phoneValue);
      formData.append("email", emailValue);
      formData.append("requirement", requirementValue);
      if (file) formData.append("attachment", file);

      const response = await fetch("/api/quotes", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message ?? "Unable to submit quote right now.");
        return;
      }

      setSubmitted(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setRequirement("");
      clearFile();
    } catch {
      setError("Unable to submit quote right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const alignItems = hangOnTop ? "items-start" : "items-center";

  return (
    <section className={`relative w-full ${hangOnTop ? "overflow-visible" : "overflow-hidden"} ${className}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundSrc ? (
          backgroundSrcMobile ? (
            <>
              <Image
                src={backgroundSrcMobile}
                alt=""
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                priority={false}
              />
              <Image
                src={backgroundSrc}
                alt=""
                fill
                className="hidden object-cover md:block"
                sizes="100vw"
                priority={false}
              />
            </>
          ) : (
            <Image
              src={backgroundSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          )
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-black/25 md:bg-black/20" aria-hidden />
      </div>

      <div
        className={[
          "relative z-[1] mx-auto flex max-w-[1280px]",
          alignItems,
          formAlign === "left" ? "justify-start" : "justify-end",
          layout === "band"
            ? hangOnTop
              ? "min-h-[380px] px-4 pb-12 pt-0 sm:min-h-[420px] sm:px-6 sm:pb-14 lg:min-h-[460px] lg:px-8 lg:pb-16"
              : "min-h-[360px] px-4 py-10 sm:min-h-[400px] sm:px-6 lg:min-h-[440px] lg:px-8 lg:py-14"
            : "min-h-[min(100svh,920px)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "w-full max-w-[440px] bg-white p-6 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8",
            hangOnTop
              ? "relative z-[2] rounded-t-none rounded-b-[28px] sm:rounded-b-[32px] sm:mr-4 md:mr-8 lg:mr-12 xl:mr-16"
              : "rounded-[28px] sm:rounded-[32px]",
            cardClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Get Free Quote</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Let&apos;s create packaging that stands out, makes a statement, and sets your brand apart from
            the rest.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-5 text-sm text-[#103a2a]">
              <p className="font-semibold">Thanks — we&apos;ve received your request.</p>
              <p className="mt-2 text-[#103a2a]/80">
                For dimensions, materials, and quantities, continue with our full quote form.
              </p>
              <Link
                href="/quote"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--dark-primary-green)] py-3 text-center text-sm font-bold text-white transition-colors hover:opacity-90"
              >
                Complete full quote
              </Link>
            </div>
          ) : (
            <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-5" noValidate>
              {error ? (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" role="alert">
                  {error}
                </p>
              ) : null}

              <div>
                <label htmlFor="quick-quote-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="quick-quote-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="quick-quote-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="quick-quote-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="quick-quote-phone" className={labelClass}>
                  Contact number
                </label>
                <input
                  id="quick-quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your contact number"
                  autoComplete="tel"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="quick-quote-requirement" className={labelClass}>
                  Additional information
                </label>
                <textarea
                  id="quick-quote-requirement"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Anything else you want to inform us...."
                  rows={3}
                  className={`${fieldClass} min-h-[4.25rem] resize-y py-2.5`}
                />
              </div>

              <div>
                <label htmlFor="quick-quote-file" className={labelClass}>
                  Upload artwork
                </label>
                <div className="rounded-xl border border-dashed border-[#103a2a]/25 bg-white px-3 py-2.5">
                  <input
                    ref={fileInputRef}
                    id="quick-quote-file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    onChange={onFileChange}
                    className="block w-full text-sm text-[#103a2a]/80 file:mr-3 file:rounded-lg file:border-0 file:bg-[#103a2a] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0c2e22]"
                  />
                  <p className="mt-1 text-xs text-[#103a2a]/55">JPG, PNG, or WEBP — max 8 MB</p>
                  {file ? (
                    <div className="mt-1.5 flex items-center justify-between gap-3 rounded-lg bg-[#103a2a]/5 px-2.5 py-1.5 text-sm text-[#103a2a]">
                      <span className="min-w-0 truncate font-medium">{file.name}</span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="shrink-0 text-xs font-semibold text-rose-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}
                  {fileError ? <p className="mt-1 text-sm font-medium text-rose-600">{fileError}</p> : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[var(--dark-primary-green)] py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dark-primary-green)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting…" : "Get a Quote"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
