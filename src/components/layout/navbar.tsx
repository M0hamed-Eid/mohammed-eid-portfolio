"use client";

import { useEffect, useState } from "react";
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

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a
          href="#top"
          className="font-display text-2xl tracking-tight hover:opacity-80 transition-opacity"
        >
          M<span className="text-gradient-brand">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors hover:bg-white/5"
            >
              {link.label}
            </a>
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
            <nav className="flex flex-col gap-1 px-4 mt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base rounded-xl hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
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
