import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { experienceData, experienceIntro } from "../constants/experience";

const Experience = () => {
  const experienceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" });
  const isTallEnough = useMediaQuery({ minHeight: "720px" });
  const useSticky = isDesktop && isTallEnough;

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    experienceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);

  return (
    <section id="experience" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Professional Journey"}
        title={"Experience"}
        text={experienceIntro}
        textColor={"text-white"}
        withScrollTrigger={true}
        size="section"
      />

      {experienceData.map((experience, index) => (
        <div
          ref={(el) => (experienceRefs.current[index] = el)}
          key={experience.id}
          className={`px-4 sm:px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 ${useSticky ? "sticky" : "relative"}`}
          style={
            useSticky
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(experienceData.length - index - 1) * 5}rem`,
                }
              : undefined
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6 min-w-0 w-full">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-4xl lg:text-5xl text-balance">
                  {experience.title}
                </h3>
                <p className="text-lg sm:text-2xl text-white/80 text-balance">
                  {experience.company}
                </p>
                <p className="text-sm sm:text-base uppercase tracking-wider text-white/50">
                  {experience.employmentType}
                </p>
                <p className="text-base sm:text-xl text-white/60 text-balance break-words">
                  {`${experience.period} | ${experience.type}`}
                </p>
                {experience.note ? (
                  <p className="text-sm sm:text-base text-white/45 text-pretty max-w-3xl">
                    {experience.note}
                  </p>
                ) : null}
              </div>
              <p className="text-base sm:text-xl leading-relaxed tracking-normal sm:tracking-wide lg:text-2xl text-white/60 text-pretty">
                {experience.description}
              </p>
              <div className="flex flex-col gap-2 text-base sm:text-2xl sm:gap-4 lg:text-3xl text-white/80 min-w-0">
                {experience.responsibilities.map((responsibility, itemIndex) => (
                  <div key={`${experience.id}-${itemIndex}`}>
                    <p className="flex gap-4 sm:gap-8 text-pretty min-w-0">
                      <span className="shrink-0 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      <span className="min-w-0">{responsibility}</span>
                    </p>
                    {itemIndex < experience.responsibilities.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;
