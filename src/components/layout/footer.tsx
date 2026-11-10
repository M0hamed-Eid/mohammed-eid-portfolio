import Link from "next/link";
import { Mail } from "lucide-react";
import { BrandIcon } from "@/components/shared/brand-icon";
import { siteConfig } from "@/lib/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <Link href="/" className="font-display text-xl">
            Mohammed Eid<span className="text-gradient-brand">.</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            AI Engineer · Machine Learning Engineer · Data Scientist
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FooterLink href={`mailto:${siteConfig.email}`} label="Email">
            <Mail className="size-4" />
          </FooterLink>
          <FooterLink href={siteConfig.links.github} label="GitHub">
            <BrandIcon name="github" className="size-4" />
          </FooterLink>
          <FooterLink href={siteConfig.links.linkedin} label="LinkedIn">
            <BrandIcon name="linkedin" className="size-4" />
          </FooterLink>
          <FooterLink href={siteConfig.links.huggingface} label="Hugging Face">
            <BrandIcon name="huggingface" className="size-4" />
          </FooterLink>
          <FooterLink href={siteConfig.links.kaggle} label="Kaggle">
            <BrandIcon name="kaggle" className="size-4" />
          </FooterLink>
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} {siteConfig.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-brand-violet/50 hover:bg-white/5 transition-colors"
    >
      {children}
    </a>
  );
}
