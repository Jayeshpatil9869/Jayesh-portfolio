import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = ["Build", "Ship", "Iterate", "Measure", "Refine"];
const items2 = [
  "get in touch",
  "get in touch",
  "get in touch",
  "get in touch",
  "get in touch",
];

const SECTION_BG = "#e5e5e0";

const ContactSummary = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const short = window.matchMedia(
      "(max-height: 700px), (max-width: 767px)"
    ).matches;
    if (reduce || short) return;

    const el = containerRef.current;
    if (!el) return;

    // Root cause of "early sticky" was NOT the pin math alone:
    // ContactSummary had -mt-10, so start:"top top" fired while #resume
    // still overlapped the viewport (~20–40px) and Resume's scale:0.95
    // exposed body #d6d6d6 in the side gutters. That read as a gray
    // misaligned sticky strip above the black marquee.
    //
    // Pin contract (original gsap.to + scrub + pin API, Lenis-safe):
    // 1) No negative margin — pin only after Resume has cleared
    // 2) start top top — lock only once this h-dvh panel fully covers
    // 3) scrub true — 1:1 with Lenis (no 0.5 catch-up lag)
    // 4) pinType transform — avoids fixed-pin jumps under Lenis
    // 5) anticipatePin 0 — never pre-pin
    // 6) hold one viewport, then release (same on reverse)
    const tween = gsap.to(el, {
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight)}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        pinType: "transform",
        anticipatePin: 0,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        refreshPriority: -1,
        markers: false,
        onRefresh: (self) => {
          const spacer = self.pin?.parentElement;
          if (spacer?.classList.contains("pin-spacer")) {
            spacer.style.backgroundColor = SECTION_BG;
          }
        },
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-dvh h-dvh w-full text-black"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="Contact summary"
    >
      <Marquee items={items} className="text-white bg-black w-full shrink-0" />
      <div className="overflow-hidden px-4 font-light text-center contact-text-responsive flex-1 flex items-center justify-center">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-[#6b4e16]">together</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2 border-black w-full shrink-0 mt-auto"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
