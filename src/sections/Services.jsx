import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Experience = () => {
  const text = `Full Stack Developer with hands-on experience
    in modern web technologies and
    agile development practices.`;

  const experienceData = [
    {
      title: "Full Stack Developer Intern",
      company: "DigiMirai – Malegaon, Maharashtra",
      period: "Jul 2025 – Present",
      type: "On-site",
      description: "Working as a full-stack developer intern focusing on web application development and deployment.",
    responsibilities: [
  "Built full-stack MERN applications with real-time dashboards",
  "Enhanced UI/UX with responsive designs and GSAP/Framer animations",
  "Implemented secure authentication and role-based access",
  "Integrated APIs and optimized backend performance",
  "Worked with teams to deliver end-to-end solutions for IPBazaar, Gaushala, and AI Copilot"
]


    }
  ];

  const experienceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px

  useGSAP(() => {
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
  text={text}
  textColor={"text-white"}
  withScrollTrigger={true}
  titleFontSize="text-5xl sm:text-6xl md:text-[8rem]" // <-- custom size
/>

      {experienceData.map((experience, index) => (
        <div
          ref={(el) => (experienceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(experienceData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl lg:text-5xl">{experience.title}</h2>
                <p className="text-2xl text-white/80">{experience.company}</p>
                <p className="text-xl text-white/60">{`${experience.period} | ${experience.type}`}</p>
              </div>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {experience.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {experience.responsibilities.map((responsibility, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {responsibility}
                    </h3>
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
