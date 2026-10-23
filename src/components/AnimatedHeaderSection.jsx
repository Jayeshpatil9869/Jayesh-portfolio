import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  isMobile = false,
  withScrollTrigger = false,
  heading = "h2",
  size = "section",
  subTitleClassName = "text-sm font-light",
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  const TitleTag = heading === "h1" ? "h1" : "h2";

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tl = gsap.timeline({
      delay: isMobile ? 0.1 : 0,
      scrollTrigger: withScrollTrigger
        ? { trigger: contextRef.current }
        : undefined,
    });
    tl.from(contextRef.current, { y: "50vh", duration: 1, ease: "circ.out" });
    tl.from(headerRef.current, { autoAlpha: 0, y: 200, duration: 1, ease: "circ.out" }, "<+0.1");
  }, [isMobile, withScrollTrigger]);

  return (
    <header ref={contextRef}>
      <div className="overflow-hidden">
        <div ref={headerRef} className="flex flex-col justify-center gap-8 pt-16 sm:gap-12 will-change-transform">
          <p className={`section-kicker uppercase px-4 sm:px-10 text-balance ${textColor} ${subTitleClassName}`}>
            {subTitle}
          </p>
          <div className="px-4 sm:px-6">
            <TitleTag
              className={`flex flex-wrap gap-x-[0.28em] gap-y-1 uppercase font-normal pb-3 ${size === "display" ? "banner-text-display" : "banner-text-responsive"} ${textColor}`}
            >
              {titleParts.map((part, index) => (
                <span key={index} className="inline-block">{part}</span>
              ))}
            </TitleTag>
          </div>
        </div>
      </div>
      <div className={`relative px-4 sm:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeaderSection;
