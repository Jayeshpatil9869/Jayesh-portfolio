import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useEffect } from "react";
import { applyMagnetEffect } from "../utils/sheryEffects";

const Contact = () => {
  const text = `Have a role, collaboration, or project in mind?
    I would like to hear from you.`;
  const items = [
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
  ];
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  useEffect(() => {
    let cleanup;
    if (window.matchMedia("(min-width: 768px)").matches) {
      cleanup = applyMagnetEffect(".magnet-btn", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Let's talk"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
          size="section"
        />
        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h3 className="font-normal">E-mail</h3>
              <div className="w-full h-px my-2 bg-white/30" />
              <a href="mailto:work@jayeshbpatil.com" className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                work@jayeshbpatil.com
              </a>
            </div>
            <div className="social-link">
              <h3 className="font-normal">Phone</h3>
              <div className="w-full h-px my-2 bg-white/30" />
              <a href="tel:+919209389015" className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 9209389015
              </a>
            </div>
            <div className="social-link">
              <h3 className="font-normal">Social Media</h3>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-loose tracking-widest uppercase md:text-base hover:text-white/80 transition-colors duration-200 cursor-hover magnet-btn"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
