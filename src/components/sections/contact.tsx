"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, CheckCircle2, XCircle, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { BrandIcon, type BrandName } from "@/components/shared/brand-icon";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site-config";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  company: z.string().max(0).optional(), // honeypot
});

type ContactForm = z.infer<typeof contactSchema>;

const CONTACT_LINKS: {
  label: string;
  value: string;
  href: string;
  icon: BrandName | "mail";
}[] = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: "mail" },
  {
    label: "LinkedIn",
    value: "mohammed-eid-abdelmeguid",
    href: siteConfig.links.linkedin,
    icon: "linkedin",
  },
  { label: "GitHub", value: "M0hamed-Eid", href: siteConfig.links.github, icon: "github" },
  {
    label: "Hugging Face",
    value: "mohammedeid",
    href: siteConfig.links.huggingface,
    icon: "huggingface",
  },
  { label: "Kaggle", value: "m0hammedeid", href: siteConfig.links.kaggle, icon: "kaggle" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent."
          description="Open to AI/ML Engineer and Data Scientist roles, plus research collaborations."
        />

        <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <Reveal>
            <div className="space-y-2">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-brand-violet/30 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                      {link.icon === "mail" ? (
                        <Mail className="size-4 text-brand-pink" />
                      ) : (
                        <BrandIcon name={link.icon} className="size-4 text-brand-pink" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                      <p className="text-sm font-medium">{link.value}</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground group-hover:text-brand-pink group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </a>
              ))}

              <a
                href={siteConfig.links.portfolioRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-brand-violet/30 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <Code2 className="size-4 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">This Site</p>
                    <p className="text-sm font-medium">Portfolio Source Code</p>
                  </div>
                </div>
                <BrandIcon
                  name="github"
                  className="size-4 text-muted-foreground group-hover:text-brand-pink transition-colors"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-3xl p-6 sm:p-8 space-y-4"
            >
              <input
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
                {...register("company")}
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none focus:border-brand-violet/50 transition-colors"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-xs text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  {...register("email")}
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none focus:border-brand-violet/50 transition-colors"
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  {...register("message")}
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm outline-none focus:border-brand-violet/50 transition-colors resize-none"
                  placeholder="Let's talk about..."
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs text-destructive mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className={cn(buttonVariants(), "w-full rounded-full gap-2")}
              >
                {status === "loading" && <Loader2 className="size-4 animate-spin" />}
                {status === "idle" && "Send Message"}
                {status === "loading" && "Sending..."}
                {status === "success" && "Sent!"}
                {status === "error" && "Try Again"}
              </motion.button>

              {status === "success" && (
                <p className="flex items-center gap-1.5 text-sm text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Thanks — I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-1.5 text-sm text-destructive">
                  <XCircle className="size-4" />
                  Something went wrong. Email me directly instead.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
