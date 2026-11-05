import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createElement, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Masked line slide-up reveal (EXPERIENCE header family).
 * Animates inner spans only — safe inside sticky parents.
 *
 * @param {object} props
 * @param {string | string[]} props.lines - Single string (split on newlines) or array of lines
 * @param {string} [props.className]
 * @param {string} [props.lineClassName]
 * @param {string} [props.as] - Wrapper tag: "div" | "p" | "h3" | "h4" | "span"
 * @param {number} [props.stagger]
 * @param {string} [props.start] - ScrollTrigger start
 */
export default function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  as = "div",
  stagger = 0.12,
  start = "top 88%",
}) {
  const containerRef = useRef(null);
  const innerRefs = useRef([]);

  const normalized = Array.isArray(lines)
    ? lines.filter((line) => String(line).trim() !== "")
    : String(lines ?? "")
        .split("\n")
        .filter((line) => line.trim() !== "");

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const inners = innerRefs.current.filter(Boolean);
      if (!inners.length || reduce) return;

      gsap.from(inners, {
        y: "100%",
        opacity: 0,
        duration: 0.9,
        stagger,
        ease: "circ.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      });
    },
    { scope: containerRef, dependencies: [normalized.join("\u0001"), stagger, start] }
  );

  if (!normalized.length) return null;

  return createElement(
    as,
    { ref: containerRef, className },
    normalized.map((line, index) => (
      <span key={`${index}-${line.slice(0, 24)}`} className="block overflow-hidden">
        <span
          ref={(el) => {
            innerRefs.current[index] = el;
          }}
          className={`block text-pretty ${lineClassName}`}
        >
          {line}
        </span>
      </span>
    ))
  );
}
