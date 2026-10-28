import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { caseStudyProjects } from "../constants";

const CaseStudy = () => {
  if (!caseStudyProjects.length) return null;

  return (
    <section id="case-studies" className="flex flex-col pb-20">
      <AnimatedHeaderSection
        subTitle={"Selected work, explained"}
        title={"Case studies"}
        text={`Problem, solution, and impact for production work recruiters can skim before opening a live demo.`}
        textColor={"text-black"}
        withScrollTrigger={true}
        size="section"
      />
      <div className="flex flex-col gap-20">
        {caseStudyProjects.map((study) => {
          const { problem, solution, impact, id, summary } = study.caseStudy;
          const columns = [
            { label: "Problem", body: problem },
            { label: "Solution", body: solution },
            { label: "Impact", body: impact },
          ];

          return (
            <article
              key={id}
              id={id}
              className="scroll-mt-24 flex flex-col gap-8 border-t-2 border-black/20 pt-10 first:border-t-0 first:pt-0"
            >
              <div className="px-4 sm:px-10">
                <p className="section-kicker text-sm uppercase font-light text-black/60">
                  Case study
                </p>
                <h3 className="mt-2 text-2xl font-light tracking-tight sm:text-3xl md:text-4xl text-balance">
                  {study.name}
                </h3>
                <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed text-black/80 whitespace-pre-line">
                  {summary}
                </p>
              </div>
              <div className="grid gap-10 px-4 sm:px-10 md:grid-cols-3 md:gap-12">
                {columns.map((column) => (
                  <div
                    key={column.label}
                    className="flex flex-col gap-4 border-t-2 border-black pt-4"
                  >
                    <h4 className="section-kicker text-sm uppercase font-light">
                      {column.label}
                    </h4>
                    <p className="text-lg font-light leading-relaxed sm:text-xl text-pretty">
                      {column.body}
                    </p>
                  </div>
                ))}
              </div>
              <ul
                className="flex flex-wrap px-4 text-xs uppercase sm:px-10 md:text-sm gap-x-5 gap-y-2"
                aria-label={`Technologies used in ${study.name}`}
              >
                {study.frameworks.map((framework) => (
                  <li key={framework.id}>{framework.name}</li>
                ))}
              </ul>
              <div className="px-4 sm:px-10">
                {study.internal ? (
                  <p className="text-sm font-light text-black/70">
                    Internal company system. There is no public demo or source link.
                  </p>
                ) : (
                  <a
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm uppercase tracking-widest border-b border-black pb-0.5 hover:text-[#6b4e16] hover:border-[#6b4e16] transition-colors cursor-hover"
                  >
                    Open live project
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CaseStudy;
