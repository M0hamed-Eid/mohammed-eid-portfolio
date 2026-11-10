import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

// Content is visible in the initial HTML, including without JavaScript. Retain
// the wrapper API so sections can share layout without animation dependencies.
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function RevealGroup({ children, className }: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}
