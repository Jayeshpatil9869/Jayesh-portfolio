import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  const aboutText = `I am a Full Stack Developer specializing in the MERN stack (MongoDB, Express, React, Node.js). Unlike typical frontend developers, I understand the full application lifecycle—from designing efficient database schemas and secure REST APIs to implementing pixel-perfect, responsive user interfaces.

My focus is on building production-ready software, not just prototypes. I prioritize clean architecture, long-term maintainability, and performance optimization. Whether integrating complex payment gateways or optimizing load times, I write code that solves real business problems and scales with your growth.`;
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
