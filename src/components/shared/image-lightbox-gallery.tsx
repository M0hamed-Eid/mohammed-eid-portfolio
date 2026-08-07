"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProjectImage } from "@/lib/data/projects";

export function ImageLightboxGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState<ProjectImage | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((img) => (
          <button
            key={img.src}
            onClick={() => setActive(img)}
            className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/50"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {img.caption && (
              <span className="absolute bottom-2 left-3 text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          <DialogTitle className="sr-only">{active?.alt}</DialogTitle>
          {active && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
