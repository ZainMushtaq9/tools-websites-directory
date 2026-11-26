// Animated stat counter.
//
// The FINAL number is rendered in the HTML from the start, so the
// prerendered page and no-JS browsers always show the real figure.
// JavaScript only animates it: when the number scrolls into view it
// counts 0 -> value over ~900ms. With prefers-reduced-motion (or no
// IntersectionObserver) there is no animation at all — the final
// number simply stays put. Non-numeric values render as-is, unanimated.
import { useEffect, useRef, useState } from "react";

export default function StatCounter({ value, duration = 900 }) {
  const ref = useRef(null);
  const numeric = typeof value === "number" && Number.isFinite(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!numeric) return;
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let rafId = 0;
    let timeoutId = 0;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        // Ease-out so the count slows as it lands on the final figure.
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      rafId = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") {
      animate();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      // Safety net: never leave the counter mid-flight if the observer stalls.
      timeoutId = setTimeout(() => {
        setDisplay(value);
        observer.disconnect();
      }, duration + 1500);
      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
        cancelAnimationFrame(rafId);
      };
    }
    return () => cancelAnimationFrame(rafId);
  }, [value, duration, numeric]);

  return (
    <strong ref={ref} className="stat-number">
      {display}
    </strong>
  );
}
