import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useState, useEffect, Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import { useLenis } from "lenis/react";

const LazyEtheralShadow = lazy(() => import("@/components/ui/etheral-shadow").then(module => ({ default: module.Component })));

const Hero = () => {
  const lenis = useLenis();
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const reduceMotion = useMediaQuery({ query: "(prefers-reduced-motion: reduce)" });
  const [showBackground, setShowBackground] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px 0px 0px 0px", // Keep it active a bit before/after
  });

  useEffect(() => {
    if (reduceMotion) return;
    if (isMobile) {
      // Defer heavy animations on mobile until idle or 2.5s fallback
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setTimeout(() => setShowBackground(true), 2000); // 2s inside idle
        }, { timeout: 3000 });
      } else {
        setTimeout(() => setShowBackground(true), 2500);
      }
    } else {
      setTimeout(() => setShowBackground(true), 100);
    }
  }, [isMobile, reduceMotion]);

  const scrollToSection = (sectionId) => {
    if (lenis) {
      lenis.start();
      lenis.scrollTo(`#${sectionId}`, { offset: 0, duration: 1.2 });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView();
  };

  const text = `Production web apps, SaaS, fintech dashboards,
and e-commerce — built end to end.
React.js · Next.js · TypeScript · Node.js · Fastify · PostgreSQL · Supabase`;

  return (
    <section ref={ref} id="home" className="flex flex-col justify-end min-h-screen">

      <AnimatedHeaderSection
        isMobile={isMobile}
        heading="h1"
        size="display"
        subTitle={"Full Stack Developer"}
        title={"Jayesh Patil"}
        text={text}
        textColor={"text-black"}
        subTitleClassName="text-sm sm:text-base md:text-lg lg:text-xl font-medium"
      />
      <div className="flex flex-wrap items-center gap-4 px-4 pb-10 sm:px-10 sm:gap-6">
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("work");
          }}
          className="inline-flex items-center justify-center px-5 py-3 text-xs font-medium tracking-[0.2em] uppercase text-white bg-black hover:bg-[#6b4e16] transition-colors cursor-hover"
        >
          View work
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
          className="inline-flex items-center justify-center px-5 py-3 text-xs font-medium tracking-[0.2em] uppercase text-black border border-black/80 hover:border-[#6b4e16] hover:text-[#6b4e16] transition-colors cursor-hover"
        >
          Contact
        </a>
      </div>
      <div className="absolute inset-0 -z-50 w-screen h-screen">
        {showBackground && (
          <Suspense fallback={null}>
            <LazyEtheralShadow
              color="rgba(101, 101, 101, 1)"
              animation={{ scale: 100, speed: 90 }}
              noise={{ opacity: 1, scale: 1.2 }}
              sizing="fill"
              paused={!inView || isMobile || reduceMotion}
            />
          </Suspense>
        )}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-[#d6d6d6]" />
      </div>
    </section>
  );
};

export default Hero;
