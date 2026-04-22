import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Code with purpose. Built for impact.`;
  const aboutText = `I am a Full Stack Software Developer focused on building practical, high-impact systems, not just polished UI.

At OneCapital, I helped design and ship a centralized wealth management dashboard to replace Excel-heavy workflows used across AAA and WealthMagic. The platform unified AUM, brokerage, and client-level insights in one place, reducing manual reporting effort and making financial data easier to access for non-technical teams.

I work across the full lifecycle, from architecture and APIs to performance-focused frontend delivery. My core stack includes React, Next.js, Node.js, Fastify, Supabase, and TypeScript, with a strong focus on scalable systems and clean execution.`;
  const imgRef = useRef(null);
  useGSAP(() => {
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
          alt="man"
          className="w-md rounded-3xl"
          loading="lazy"
          decoding="async"
          width="448"
          height="500"
        />
        <AnimatedTextLines
          text={aboutText}
          className={"w-full"}
          lineClassName="mb-8 last:mb-0"
        />
      </div>
    </section>
  );
};

export default About;
