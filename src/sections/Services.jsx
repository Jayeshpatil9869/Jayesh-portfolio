import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Experience = () => {
  const text = `Working on fintech platforms, automated data pipelines,
and internal systems focused on solving real
operational problems.`;

  const experienceData = [
    {
      title: "Software Developer (Full Stack)",
      company: "OneCapital Investment Private Limited",
      period: "Dec 2025 - Present",
      type: "Pune, Maharashtra | On-site",
      description:
        "Architecting internal wealth management dashboards, financial analytics platforms, and automated data ingestion pipelines that eliminate manual operational bottlenecks.",
      responsibilities: [
        "Build and maintain internal wealth management dashboards for business teams, tracking AUM, brokerage, and real-time client KPIs",
        "Implement drag-and-drop Excel/XLSX data ingestion, parsing, schema validation, and database insertion workflows (eliminating 15+ hours/week of manual work)",
        "Design performant REST APIs using Node.js and Fastify with user-level data scoping and JWT authentication",
        "Implement multi-tier role-based access control (RBAC) across employee, manager, and administrator permission levels",
        "Develop inside a shared TypeScript monorepo using Turborepo and pnpm with reusable packages across frontend and backend services",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "OneCapital Investment Private Limited",
      period: "Oct 2025 - Dec 2025",
      type: "Pune, Maharashtra | On-site",
      description:
        "Shipped dashboard features for financial reporting and contributed to migrating Excel-based workflows into a centralized application.",
      responsibilities: [
        "Shipped dashboard reporting features and multi-level data filtering across AAA and WealthMagic systems",
        "Contributed to migrating manual Excel-based operations into a unified, high-performance web application",
        "Developed modular React components, Next.js pages, and Supabase PostgreSQL database schemas",
        "Contributed to REST API design, database architecture, testing, and production deployment, earning promotion to full-time Software Developer",
      ],
    },
    {
      title: "Freelance Full Stack Developer",
      company: "Divines Code",
      period: "Jun 2025 - Mar 2026",
      type: "Nashik, Maharashtra | Hybrid",
      description:
        "Delivered more than five end-to-end full-stack projects for business clients, spanning e-commerce, SaaS dashboards, and agency platforms.",
      responsibilities: [
        "Delivered 5+ production-grade web applications from concept to deployment, including D2C e-commerce platforms and admin dashboards",
        "Developed responsive, high-performance user interfaces using React, Next.js, and Tailwind CSS",
        "Built secure REST APIs using Node.js and Express with JWT authentication and role-based permissions",
        "Improved frontend performance through code splitting and image optimization, reducing page load times by ~25%",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Digi Mirai",
      period: "Jan 2025 - May 2025",
      type: "Malegaon, Maharashtra | On-site",
      description:
        "Worked across frontend and backend development to ship MERN-stack projects for commercial clients.",
      responsibilities: [
        "Shipped more than three MERN-stack client projects covering MongoDB schema design to deployed React frontends",
        "Built reusable React.js UI component libraries and modular Node.js/Express APIs used across multiple client applications",
        "Optimized MongoDB queries and database structures to improve API response times by ~20%",
        "Participated in structured code reviews, collaborative Git branch workflows, and staged production rollouts",
      ],
    },
  ];

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
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
        size="section"
      />

      {experienceData.map((experience, index) => (
        <div
          ref={(el) => (experienceRefs.current[index] = el)}
          key={index}
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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-4xl lg:text-5xl text-balance">{experience.title}</h3>
                <p className="text-lg sm:text-2xl text-white/80 text-balance">{experience.company}</p>
                <p className="text-base sm:text-xl text-white/60 text-balance">{`${experience.period} | ${experience.type}`}</p>
              </div>
              <p className="text-base sm:text-xl leading-relaxed tracking-normal sm:tracking-wide lg:text-2xl text-white/60 text-pretty">
                {experience.description}
              </p>
              <div className="flex flex-col gap-2 text-base sm:text-2xl sm:gap-4 lg:text-3xl text-white/80 min-w-0">
                {experience.responsibilities.map((responsibility, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <p className="flex gap-4 sm:gap-8 text-pretty min-w-0">
                      <span className="shrink-0 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {responsibility}
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
