import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import RevealLines from "../components/RevealLines";
import { educationData } from "../constants/experience";

const Education = () => {
  return (
    <section id="education" className="flex flex-col bg-black text-white pb-20">
      <AnimatedHeaderSection
        subTitle={"Academic background"}
        title={"Education"}
        text={`Formal computer applications education, postgraduate study,
and structured full-stack training.`}
        textColor={"text-white"}
        withScrollTrigger={true}
        size="section"
      />
      <div className="flex flex-col px-4 sm:px-10">
        {educationData.map((item) => {
          const detailLines = [
            item.institution,
            `${item.period}${item.status ? ` · ${item.status}` : ""}`,
            item.expected || null,
          ].filter(Boolean);

          return (
            <article
              key={item.id}
              className="border-t-2 border-white/30 py-8 sm:py-10"
            >
              <div className="flex flex-col gap-2 min-w-0">
                {item.kind ? (
                  <p className="text-sm uppercase tracking-wider text-white/50">
                    {item.kind}
                  </p>
                ) : null}
                <RevealLines
                  as="h3"
                  lines={[item.degree]}
                  className="text-xl sm:text-3xl lg:text-4xl font-light text-balance"
                />
                <RevealLines
                  as="div"
                  lines={detailLines}
                  className="flex flex-col gap-1 text-base sm:text-xl text-white/80"
                  lineClassName="text-balance break-words"
                  stagger={0.1}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
