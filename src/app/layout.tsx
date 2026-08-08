import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/layout/particle-background";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { LoadingScreen, SessionVisitScript } from "@/components/layout/loading-screen";
import { StructuredData } from "@/components/shared/structured-data";
import { siteConfig } from "@/lib/data/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI Engineer & Machine Learning Engineer`,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.summary,
  alternates: { canonical: siteConfig.url },
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "RAG",
    "LLM",
    "NLP",
    "Generative AI",
    "AI Agents",
    "Python",
    "Mohammed Eid Abdelmeguid",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — AI Engineer & Machine Learning Engineer`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AI Engineer & Machine Learning Engineer`,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // `SessionVisitScript` adds a `session-visited` class to the document element
      // before hydration, so the server and client class lists legitimately differ.
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <SessionVisitScript />
        <StructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <TooltipProvider delay={150}>
          <LoadingScreen />
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
