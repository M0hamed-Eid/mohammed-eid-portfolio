"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.6, bounce: 0 });
  const reduceMotion = useReducedMotion();

  // The final value is rendered server-side so crawlers and no-JS visitors see the
  // real number. Reset to zero before first paint so the count-up still reads as one.
  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    if (ref.current) {
      ref.current.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
    }
  }, [reduceMotion, prefix, suffix, decimals]);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    if (reduceMotion) return;
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, decimals, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {`${prefix}${value.toFixed(decimals)}${suffix}`}
    </motion.span>
  );
}
