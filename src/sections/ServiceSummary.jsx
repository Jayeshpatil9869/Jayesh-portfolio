import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
  const rootRef = useRef(null);
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rows = [
      ["#title-service-1", 4],
      ["#title-service-2", -4],
      ["#title-service-3", 4],
      ["#title-service-4", -4],
    ];

    rows.forEach(([id, xPercent]) => {
      gsap.to(id, {
        xPercent,
        scrollTrigger: {
          trigger: id,
          scrub: true,
        },
      });
    });
  }, { scope: rootRef });
  return (
    <section ref={rootRef} className="mt-20 overflow-hidden font-light leading-snug text-center mb-24 md:mb-42 service-text-responsive">
      <div id="title-service-1" className="px-4">
        <p>Architecture</p>
      </div>
      <div
        id="title-service-2"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4"
      >
        <p className="font-normal">Creative</p>
        <div className="w-8 h-1 sm:w-12 lg:w-20 bg-gold" />
        <p>Deployment</p>
      </div>
      <div
        id="title-service-3"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4"
      >
        <p>APIs</p>
        <div className="w-8 h-1 sm:w-12 lg:w-20 bg-gold" />
        <p className="italic">Frontends</p>
        <div className="w-8 h-1 sm:w-12 lg:w-20 bg-gold" />
        <p className="font-medium">Scalability</p>
      </div>
      <div id="title-service-4" className="px-4">
        <p>Databases</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
