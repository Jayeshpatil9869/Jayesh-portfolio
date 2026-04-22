import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Experience = () => {
  const text = `Working on fintech platforms and internal systems
focused on solving real
operational problems.`;

  const experienceData = [
    {
      title: "Software Developer (Full Stack)",
      company: "OneCapital – Pune, Maharashtra",
      period: "Dec 2025 - Present",
      type: "On-site",
      description:
        "Working on fintech platforms and internal systems focused on solving real operational problems.",
      responsibilities: [
        "Built and enhanced a wealth management dashboard for tracking AUM, brokerage, and client data",
        "Designed a multi-dashboard system (AAA, WealthMagic, combined) to unify multiple data sources",
        "Developed backend APIs using Node.js, Fastify, and Supabase for aggregation and filtering",
        "Implemented role-based access (wirecode system) for controlled data visibility",
        "Improved handling of large financial datasets and overall system performance",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Divines Code",
      period: "Jun 2025 - Mar 2026",
      type: "Nashik, Maharashtra",
      description:
        "Delivered production-grade web platforms and APIs for client-facing business systems.",
      responsibilities: [
        "Developed the company’s official website with performance-focused frontend architecture",
        "Built secure backend APIs and modular frontend components for scalable delivery",
        "Collaborated across the lifecycle from requirements to deployment and iterations",
        "Improved UX quality with responsive design patterns and motion-driven interactions",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "DigiMirai – Malegaon, Maharashtra",
      period: "Jan 2025 - May 2025",
      type: "On-site",
      description:
        "Worked across frontend and backend development to ship production-facing systems.",
      responsibilities: [
        "Developed the company’s official website",
        "Identified inefficiencies in Excel-based workflows across AAA and WealthMagic systems",
        "Contributed to building a centralized dashboard to simplify reporting and data access",
        "Worked across frontend and backend using React.js, Next.js, Node.js, and Supabase",
      ],
    },
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
          className={`px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 ${isDesktop ? "sticky" : "relative"}`}
          style={
            isDesktop
              ? {
                top: `calc(10vh + ${index * 5}em)`,
                marginBottom: `${(experienceData.length - index - 1) * 5}rem`,
              }
              : undefined
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
