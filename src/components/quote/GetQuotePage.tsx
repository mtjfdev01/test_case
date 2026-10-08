"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-[#103a2a]/15 bg-white px-4 py-2.5 text-sm text-[#103a2a] placeholder:text-[#103a2a]/40 outline-none transition focus:border-[#103a2a]/45 focus:ring-1 focus:ring-[#103a2a]/25";

const SHOWCASE = [
  {
    src: "/assets/images/quote/quote-box-senja.jpg",
    alt: "Gradient printed folding carton",
  },
  {
    src: "/assets/images/quote/quote-box-mug.jpg",
    alt: "Kraft cube carton with white band",
  },
  {
    src: "/assets/images/quote/quote-box-holographic.jpg",
    alt: "Holographic foil rigid boxes",
  },
  {
    src: "/assets/images/quote/quote-box-aer.jpg",
    alt: "Iridescent printed skincare cartons",
  },
  {
    src: "/assets/images/quote/quote-box-rewind.jpg",
    alt: "Open carton with holographic inner print",
  },
  {
    src: "/assets/images/quote/quote-box-spiller.jpg",
    alt: "Stacked metallic printed cartons",
  },
  {
    src: "/assets/images/quote/quote-box-emboss.jpg",
    alt: "Debossed grey rigid box",
  },
] as const;

const BENTO = [
  {
    ...SHOWCASE[0],
    className: "col-start-1 row-start-1 row-span-3 sm:row-span-5",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
  {
    ...SHOWCASE[1],
    className: "col-start-2 row-start-1 row-span-2 sm:row-span-3",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
  {
    ...SHOWCASE[2],
    className: "col-start-2 row-start-3 row-span-3 sm:col-start-3 sm:row-start-1 sm:row-span-4",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
  {
    ...SHOWCASE[3],
    className: "col-start-1 row-start-4 row-span-2 sm:col-start-2 sm:row-start-4 sm:row-span-3",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
  {
    ...SHOWCASE[4],
    className: "col-span-2 col-start-1 row-start-6 row-span-2 sm:col-span-1 sm:row-start-6 sm:row-span-3",
    sizes: "(min-width: 1024px) 180px, 90vw",
  },
  {
    ...SHOWCASE[5],
    className: "col-start-1 row-start-8 row-span-2 sm:col-start-3 sm:row-start-5 sm:row-span-4",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
  {
    ...SHOWCASE[6],
    className: "col-start-2 row-start-8 row-span-2 sm:col-start-2 sm:row-start-7 sm:row-span-2",
    sizes: "(min-width: 1024px) 180px, 45vw",
  },
] as const;

function BentoTile({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`quote-bento-tile ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function GetQuotePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
    setSubmitError("");
    setFileError("");

    const phoneValue = phone.trim();
    const emailValue = email.trim();
    const fullNameValue = fullName.trim();
    const requirementValue = requirement.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const hasPhone = phoneDigits.length >= 7;
    const hasEmail = EMAIL_RE.test(emailValue);

    if (!phoneValue && !emailValue) {
      setSubmitError("Please enter an email or a contact number.");
      return;
    }
    if (phoneValue && !hasPhone) {
      setSubmitError("Please enter a valid contact number.");
      return;
    }
    if (emailValue && !hasEmail) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!hasPhone && !hasEmail) {
      setSubmitError("Please enter an email or a contact number.");
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
        setSubmitError(data.message ?? "Unable to submit quote right now.");
        return;
      }

      setFullName("");
      setPhone("");
      setEmail("");
      setRequirement("");
      clearFile();
      router.push("/thank-you");
      return;
    } catch {
      setSubmitError("Unable to submit quote right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f0ea]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="quote-orb absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#1dd1a1]/20 blur-3xl" />
        <div className="quote-orb-delay absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-[#c5a059]/18 blur-3xl" />
        <div className="quote-orb absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#103a2a]/10 blur-3xl" />
      </div>

      <main id="quote-form" className="relative z-10 w-full scroll-mt-24">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 px-5 pb-8 pt-3 sm:px-8 sm:pb-10 sm:pt-4 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 lg:px-10 lg:pb-12 lg:pt-5">
          <section className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#103a2a]/55">
              Custom packaging quote
            </p> */}
            <h1 className="max-w-lg font-[family-name:var(--font-playfair)] text-[2.05rem] font-extrabold leading-[1.12] text-[#103a2a] sm:text-4xl lg:text-[2.75rem]">
              Packaging that{" "}
              <span className="italic text-[#6b8e6b]">grows your brand</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#103a2a]/75 sm:text-base">
              Get a quote for folding cartons, art card packaging, metallized cardboard boxes, custom logo boxes, shopping bags, carry bags, labels, tags, stickers, and other print and packaging.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Art card", "Custom print", "Foil & emboss"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-[#103a2a]/12 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#103a2a]/70 backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(16,58,42,0.10)] backdrop-blur-sm sm:p-8">
                <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5" noValidate>
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#103a2a]">
                      Get a Quote
                    </h2>
                    <p className="mt-1 text-sm text-[#103a2a]/60">Email or phone is enough to get started.</p>
                  </div>

                  <div>
                    <label htmlFor="quote-name" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                      Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-email" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                      Email
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                      Contact number
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your contact number"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-requirement" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                      Additional information
                    </label>
                    <textarea
                      id="quote-requirement"
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      placeholder="Anything else you want to inform us...."
                      rows={3}
                      className={`${fieldClass} min-h-[4.25rem] resize-y py-2.5`}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-file" className="mb-1.5 block text-sm font-semibold text-[#103a2a]">
                      Upload artwork
                    </label>
                    <div className="rounded-xl border border-dashed border-[#103a2a]/25 bg-white px-3 py-2.5">
                      <input
                        ref={fileInputRef}
                        id="quote-file"
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

                  {submitError ? (
                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                      {submitError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-[var(--color-brand-primary,#103a2a)] py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--color-cta-hover,#0c2e22)] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting…" : "Submit Quote Request"}
                  </button>
                </form>
            </div>
          </section>

          <section className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <div className="quote-bento grid h-[430px] grid-cols-2 grid-rows-9 gap-2.5 sm:h-[500px] sm:grid-cols-3 sm:grid-rows-8 sm:gap-3 lg:h-[540px]">
              {BENTO.map((tile) => (
                <BentoTile
                  key={tile.src}
                  src={tile.src}
                  alt={tile.alt}
                  className={tile.className}
                  sizes={tile.sizes}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
