"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

export function Hero({ hasPhoto }: { hasPhoto: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);

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
      <div className="mx-auto max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
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
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
            >
              Contact Me →
            </a>
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative size-72 sm:size-88 mx-auto">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange opacity-70 blur-2xl animate-gradient" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[2px] animate-gradient">
              <div className="size-full rounded-full bg-background" />
            </div>
            <div className="absolute inset-2 rounded-full overflow-hidden glass">
              {hasPhoto ? (
                <Image
                  src="/images/profile/photo.jpg"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 640px) 22rem, 18rem"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex size-full items-center justify-center font-display text-6xl text-gradient-brand">
                  {siteConfig.shortName
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
              )}
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 glass rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide"
            >
              AI <span className="text-brand-violet">·</span> ML{" "}
              <span className="text-brand-pink">·</span> DS
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
