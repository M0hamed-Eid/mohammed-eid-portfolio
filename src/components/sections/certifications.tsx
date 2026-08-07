"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ImageOff, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { certifications, type Certification } from "@/lib/data/education";

export function Certifications({
  availableImages,
}: {
  availableImages: Record<string, boolean>;
}) {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning."
          description="Click a certificate to view it full-size."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const hasImage = availableImages[cert.imageSlug];
            return (
              <Reveal key={cert.name} delay={(idx % 3) * 0.08}>
                <motion.button
                  whileHover={{ y: -4 }}
                  onClick={() => hasImage && setActive(cert)}
                  className="text-left w-full h-full rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-brand-violet/30 transition-colors group"
                  disabled={!hasImage}
                >
                  <div className="relative aspect-[4/3] bg-white/[0.03] flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <>
                        <Image
                          src={`/images/certificates/${cert.imageSlug}.jpg`}
                          alt={cert.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <ZoomIn className="size-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground p-6 text-center">
                        <ImageOff className="size-6" />
                        <span className="text-xs">Certificate image coming soon</span>
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ${
                        cert.status === "Completed"
                          ? "bg-emerald-400/15 text-emerald-400"
                          : "bg-brand-orange/15 text-brand-orange"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-2.5">
                      <Award className="size-4 text-brand-pink shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm leading-snug">{cert.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      {cert.detail}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-2">{cert.period}</p>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl bg-transparent border-none shadow-none p-0">
          <DialogTitle className="sr-only">{active?.name}</DialogTitle>
          {active && (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass">
              <Image
                src={`/images/certificates/${active.imageSlug}.jpg`}
                alt={active.name}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
