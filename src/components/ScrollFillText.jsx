import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFillText
 * Word-level scroll-scrubbed fill (fewer DOM nodes than per-character splits).
 * Decorative spans are aria-hidden; full copy is exposed via sr-only text.
 */
export const ScrollFillText = ({
  text,
  className = "",
  paragraphClassName = "",
}) => {
  const containerRef = useRef(null);

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const accessibleText = paragraphs.join(" ");

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".scroll-fill-word");
      if (!words || words.length === 0) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(words, { color: "#ffffff" });
        return;
      }

      gsap.set(words, { color: "rgba(255, 255, 255, 0.2)" });

      gsap.to(words, {
        color: "#ffffff",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 35%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef, dependencies: [text] }
  );

  return (
    <div ref={containerRef} className={className}>
      <p className="sr-only">{accessibleText}</p>
      <div aria-hidden="true">
        {paragraphs.map((paragraph, pIdx) => {
          const words = paragraph.split(/\s+/);
          return (
            <p
              key={pIdx}
              className={`leading-relaxed tracking-wide text-pretty ${paragraphClassName}`}
            >
              {words.map((word, wIdx) => (
                <span key={wIdx} className="inline">
                  <span
                    className="scroll-fill-word"
                    style={{ color: "rgba(255, 255, 255, 0.2)" }}
                  >
                    {word}
                  </span>
                  {wIdx < words.length - 1 ? " " : null}
                </span>
              ))}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollFillText;
