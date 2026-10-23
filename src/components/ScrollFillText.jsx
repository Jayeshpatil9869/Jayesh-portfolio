import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFillText
 * Splits text into paragraphs, words, and characters to produce
 * a cinematic scroll-scrubbed text filling / reveal animation with GSAP.
 */
export const ScrollFillText = ({
  text,
  className = "",
  paragraphClassName = "",
}) => {
  const containerRef = useRef(null);

  // Split into paragraphs by double newlines or empty lines
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll(".scroll-fill-char");
      if (!chars || chars.length === 0) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(chars, { color: "#ffffff" });
        return;
      }

      gsap.set(chars, { color: "rgba(255, 255, 255, 0.2)" });

      gsap.to(chars, {
        color: "#ffffff",
        stagger: 0.1,
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
      {paragraphs.map((paragraph, pIdx) => {
        const words = paragraph.split(/\s+/);
        return (
          <p
            key={pIdx}
            className={`leading-relaxed tracking-wide text-pretty ${paragraphClassName}`}
          >
            {words.map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="scroll-fill-char inline-block will-change-[color]"
                    style={{ color: "rgba(255, 255, 255, 0.2)" }}
                  >
                    {char}
                  </span>
                ))}
                {wIdx < words.length - 1 && (
                  <span
                    className="scroll-fill-char inline-block will-change-[color]"
                    style={{ color: "rgba(255, 255, 255, 0.2)" }}
                  >
                    &nbsp;
                  </span>
                )}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ScrollFillText;
