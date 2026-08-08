"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 5, suffix: "", label: "AI/ML Projects Shipped" },
  { value: 79, suffix: "%", label: "Best Benchmark Accuracy" },
  { value: 13, suffix: "K+", label: "Knowledge Graph Entities" },
  { value: 890, suffix: "K+", label: "Words in Published Dataset" },
];

/** Capability chips that orbit the portrait — the AI-focused branding, made visual. */
const ORBIT_CHIPS = [
  { label: "RAG", className: "-top-3 -right-4", delay: 0 },
  { label: "LLM Agents", className: "top-1/4 -left-14 sm:-left-20", delay: 0.6 },
  { label: "NLP", className: "bottom-1/4 -right-12 sm:-right-16", delay: 1.2 },
  { label: "Computer Vision", className: "-bottom-2 left-0", delay: 1.8 },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % siteConfig.roles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 sm:pt-32"
    >
      <div className="mx-auto max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            {siteConfig.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] mt-6"
          >
            {siteConfig.shortName.split(" ")[0]}
            <br />
            <span className="italic text-gradient-brand animate-gradient">
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 h-8 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={siteConfig.roles[roleIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-sm sm:text-base uppercase tracking-[0.2em] text-muted-foreground font-medium"
              >
                {siteConfig.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full gap-2 px-6")}
            >
              View Projects
              <ArrowRight className="size-4" />
            </a>
            <a
              href={siteConfig.links.resume}
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full gap-2 px-6"
              )}
            >
              <Download className="size-4" />
              Download CV
            </a>
            <Link
              href="/resume"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 underline-offset-4 hover:underline"
            >
              Preview résumé
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MapPin className="size-3.5" />
            {siteConfig.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-gradient-brand">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="order-1 lg:order-2 relative mx-auto"
        >
          <div className="relative size-64 sm:size-80 lg:size-88 mx-auto">
            {/* soft brand bloom */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange opacity-60 blur-3xl animate-gradient" />

            {/* slow counter-rotating accent rings */}
            <motion.div
              aria-hidden
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-5 rounded-full border border-dashed border-white/10"
            >
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-pink shadow-[0_0_12px] shadow-brand-pink/60" />
            </motion.div>
            <motion.div
              aria-hidden
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 rounded-full border border-white/[0.06]"
            >
              <span className="absolute left-0 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-violet shadow-[0_0_10px] shadow-brand-violet/60" />
            </motion.div>

            {/* gradient rim */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[2px] animate-gradient">
              <div className="size-full rounded-full bg-background" />
            </div>

            <div className="absolute inset-2 rounded-full overflow-hidden glass">
              <Image
                src="/images/profile/photo.jpg"
                alt={`${siteConfig.name} — ${siteConfig.roles[0]}`}
                fill
                sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 16rem"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>

            {/* orbiting capability chips */}
            {ORBIT_CHIPS.map((chip) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + chip.delay * 0.25 }}
                className={cn("absolute", chip.className)}
              >
                <motion.span
                  animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: chip.delay,
                  }}
                  className="block glass rounded-full px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide whitespace-nowrap"
                >
                  {chip.label}
                </motion.span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
