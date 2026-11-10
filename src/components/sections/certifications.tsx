"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, BadgeCheck, ExternalLink, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { useFocusOnOpen } from "@/components/shared/use-focus-on-open";
import { certifications, type Certification } from "@/lib/data/education";

const featured = certifications.filter((c) => c.tier === "featured");
const foundation = certifications.filter((c) => c.tier === "foundation");

function CertCard({
  cert,
  index,
  onOpen,
  copiedCode,
  onVerify,
}: {
  cert: Certification;
  index: number;
  onOpen: (cert: Certification) => void;
  copiedCode: string | null;
  onVerify: (cert: Certification) => void;
}) {
  const hasImage = Boolean(cert.image);

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-brand-violet/30 transition-colors group flex flex-col">
        <div className="relative aspect-[4/3] bg-white/[0.03] overflow-hidden">
          {hasImage ? (
            <button
              type="button"
              onClick={() => onOpen(cert)}
              aria-label={`View the ${cert.name} certificate full size`}
              className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-pink"
            >
              <Image
                src={cert.image as string}
                alt={`${cert.name} certificate issued by ${cert.issuer}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ZoomIn className="size-6 text-white" />
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet/20 to-brand-pink/20 border border-white/10">
                <Award className="size-6 text-brand-pink" />
              </div>
            </div>
          )}
          <span
            className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ${
              cert.status === "Completed"
                ? "bg-background text-emerald-400"
                : "bg-background text-brand-orange"
            }`}
          >
            {cert.status}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start gap-2.5">
            <Award className="size-4 text-brand-pink shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h3 className="font-semibold text-sm leading-snug">{cert.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed flex-1">
            {cert.detail}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">{cert.period}</p>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onVerify(cert)}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-pink hover:text-brand-violet transition-colors shrink-0"
              >
                <BadgeCheck className="size-3.5" />
                {copiedCode === cert.name
                  ? "Code copied!"
                  : cert.verifyCode
                    ? "Verify"
                    : "View"}
              </a>
            )}
          </div>
          {cert.verifyCode && <p className="mt-3 text-xs text-muted-foreground break-all">Verification code: <span className="select-all font-mono">{cert.verifyCode}</span></p>}
        </div>
      </div>
    </Reveal>
  );
}

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const panelRef = useFocusOnOpen<HTMLDivElement>(!!active);

  function handleVerify(cert: Certification) {
    // Keep native anchor navigation synchronous: popup blockers must not turn
    // a failed clipboard operation into a failed credential-verification link.
    if (!cert.verifyCode || !navigator.clipboard) return;
    void navigator.clipboard.writeText(cert.verifyCode).then(() => {
      setCopiedCode(cert.name);
    }).catch(() => {
      setCopiedCode(null);
    });
  }

  return (
    <section id="certifications" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning."
          description="AI training and selected credentials. Open a certificate or follow its issuer verification link."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(0, 3).map((cert, idx) => (
            <CertCard
              key={cert.name}
              cert={cert}
              index={idx}
              onOpen={setActive}
              copiedCode={copiedCode}
              onVerify={handleVerify}
            />
          ))}
        </div>

        <details className="mt-6 rounded-2xl border border-white/10 p-5 sm:p-6">
          <summary className="cursor-pointer font-medium text-sm">More credentials &amp; foundational coursework ({featured.length - 3 + foundation.length})</summary>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...featured.slice(3), ...foundation].map((cert, index) => (
              <CertCard key={cert.name} cert={cert} index={index} onOpen={setActive} copiedCode={copiedCode} onVerify={handleVerify} />
            ))}
          </div>
        </details>
        <p role="status" className="mt-3 text-xs text-muted-foreground">{copiedCode ? `Verification code copied for ${copiedCode}. Paste it on the issuer’s site.` : ""}</p>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-4xl sm:max-w-4xl max-h-[90dvh] overflow-y-auto bg-popover border-none shadow-none p-0">
          <DialogTitle className="sr-only">
            {active ? `${active.name} — ${active.issuer}` : ""}
          </DialogTitle>
          {active?.image && (
            <div
              ref={panelRef}
              tabIndex={-1}
              className="rounded-2xl overflow-hidden glass p-2 sm:p-3 outline-none"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={active.image}
                  alt={`${active.name} certificate issued by ${active.issuer}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{active.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {active.issuer} · {active.period}
                  </p>
                </div>
                {active.verifyUrl && (
                  <a
                    href={active.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleVerify(active)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-pink hover:text-brand-violet transition-colors shrink-0"
                  >
                    {copiedCode === active.name
                      ? "Code copied!"
                      : active.verifyCode
                        ? "Verify credential"
                        : "View certificate"}
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
