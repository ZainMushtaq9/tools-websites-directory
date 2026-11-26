// Scroll-reveal wrapper.
//
// No-JS / prerender safety is the whole point of this component:
// - The server-rendered (prerendered) HTML carries NO hidden class, so
//   with JavaScript disabled the content is fully visible.
// - The hidden state is only applied inside useEffect, i.e. only after
//   JavaScript has run and the IntersectionObserver is set up.
// - A timeout fallback reveals everything even if the observer never
//   fires (or the browser has no IntersectionObserver at all).
// - With prefers-reduced-motion the CSS keeps .reveal-hidden visible,
//   so the wrapper is a no-op for those users.
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", as: Tag = "div", delay = 0, ...rest }) {
  const ref = useRef(null);
  // "idle" = pre-JS state: no hidden class, content visible.
  const [state, setState] = useState("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState("hidden");
    const reveal = () => setState("visible");
    // Safety net: never leave content hidden if the observer stalls.
    const fallback = setTimeout(reveal, 1200);
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return () => clearTimeout(fallback);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const cls = [
    "reveal",
    className,
    state === "hidden" ? "reveal-hidden" : "",
    state === "visible" ? "reveal-visible" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
