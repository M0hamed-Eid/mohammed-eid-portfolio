"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

/** `id` is the section anchor on the home page; `route` items are standalone pages. */
const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ROUTE_LINKS = [{ href: "/adas", label: "ADAS" }];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section currently owns the viewport. Off the
  // home page there are no sections to observe — any stale value is ignored below,
  // since `isActive` is gated on `isHome`.
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  /** Anchors must be absolute once we're off the home page. */
  const anchorHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300",
          scrolled ? "glass py-2 shadow-lg shadow-black/20 mx-4" : "py-1"
        )}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="font-display text-2xl tracking-tight hover:opacity-80 transition-opacity"
        >
          M<span className="text-gradient-brand">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = isHome && activeSection === link.id;
            return (
              <a
                key={link.id}
                href={anchorHref(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-sm rounded-full transition-colors hover:bg-white/5",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange"
                  />
                )}
              </a>
            );
          })}
          {ROUTE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "px-3.5 py-2 text-sm rounded-full transition-colors hover:bg-white/5",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.links.resume}
          download
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden md:inline-flex rounded-full gap-2"
          )}
        >
          <Download className="size-3.5" />
          Resume
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden rounded-full"
            )}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="glass border-l w-72">
            <SheetTitle className="font-display text-2xl px-4 pt-4">
              Mohammed<span className="text-gradient-brand">.</span>
            </SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 mt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={anchorHref(link.id)}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base rounded-xl hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {ROUTE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base rounded-xl hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/resume"
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base rounded-xl hover:bg-white/5 transition-colors"
              >
                Résumé
              </Link>
              <a
                href={siteConfig.links.resume}
                download
                className={cn(buttonVariants(), "rounded-full gap-2 mt-4")}
              >
                <Download className="size-4" />
                Download Resume
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
