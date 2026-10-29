import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ScrollFillText from "../components/ScrollFillText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Code with purpose. Built for impact.`;
  const aboutText = `I am a Full Stack Developer focused on practical production systems — not just polished UI.

At OneCapital Investment Private Limited, I work on wealth management dashboards that bring AUM, brokerage, and client-level reporting into one place, replacing Excel-heavy workflows for business teams.

I work across the full lifecycle: architecture, REST APIs, data processing, and performance-focused frontend delivery. Core stack: React.js, Next.js, TypeScript, Node.js, Fastify, PostgreSQL, Supabase, and MongoDB where the project calls for it.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-[27px] text-white/80">
        <img
          ref={imgRef}
          src="images/jayesh-patil.jpg"
          alt="Portrait of Jayesh Patil"
          className="w-full max-w-md rounded-3xl"
          loading="lazy"
          decoding="async"
          width="448"
          height="500"
        />
        <ScrollFillText
          text={aboutText}
          className={"w-full"}
          paragraphClassName="mb-8 last:mb-0"
        />
      </div>
    </section>
  );
};

export default About;
