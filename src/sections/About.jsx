import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ScrollFillText from "../components/ScrollFillText";
import RevealImage from "../components/RevealImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Code with purpose. Built for impact.`;
  const aboutText = `I am a Full Stack Developer with a strong frontend focus — shipping practical production systems, not just polished UI.

At OneCapital Investment Private Limited I work full-time on wealth management dashboards that bring AUM, brokerage, and client-level reporting into one place for business teams. I started there as an intern in September 2025 and moved into the Software Developer role in March 2026.

Alongside that, I deliver freelance full-stack work through Divines Code, and I continue postgraduate study (MCA) at Savitribai Phule Pune University. Core stack: React.js, Next.js, TypeScript, Node.js, Fastify, PostgreSQL, Supabase, and MongoDB where the project calls for it.`;

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
        <RevealImage
          src="images/jayesh-patil.jpg"
          webpSrc="images/jayesh-patil.webp"
          alt="Portrait of Jayesh Patil"
          className="w-full max-w-md rounded-3xl"
          width="448"
          height="500"
          trigger="scroll"
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
