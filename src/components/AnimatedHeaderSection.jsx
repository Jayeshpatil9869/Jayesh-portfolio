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
  titleFontSize = "text-[5rem] sm:text-[3rem] md:text-[10rem]", // default
  subTitleClassName = "text-sm font-light",
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: isMobile ? 0.1 : 0, // Reduced delay for LCP
      scrollTrigger: withScrollTrigger
        ? { trigger: contextRef.current }
        : undefined,
    });
    // Use autoAlpha to handle visibility + opacity to prevent flash of unstyled content
    tl.from(contextRef.current, { y: "50vh", duration: 1, ease: "circ.out" });
    tl.from(headerRef.current, { autoAlpha: 0, y: 200, duration: 1, ease: "circ.out" }, "<+0.1");
  }, [isMobile]);

  return (
    <header ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div ref={headerRef} className="flex flex-col justify-center gap-12 pt-16 sm:gap-16 will-change-transform">
          <p className={`tracking-[0.5rem] uppercase px-10 ${textColor} ${subTitleClassName}`}>
            {subTitle}
          </p>
          <div className="px-3">
            <h1
              className={`flex flex-col gap-12 uppercase font-normal banner-text-responsive ${titleFontSize} sm:gap-16 md:block pb-5 ${textColor}`}
              aria-label={title}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
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
