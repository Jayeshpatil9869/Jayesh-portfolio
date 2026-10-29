import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { educationData } from "../constants/experience";

const Education = () => {
  return (
    <section id="education" className="flex flex-col bg-black text-white pb-20">
      <AnimatedHeaderSection
        subTitle={"Academic background"}
        title={"Education"}
        text={`Formal computer applications education alongside
ongoing postgraduate study.`}
        textColor={"text-white"}
        withScrollTrigger={true}
        size="section"
      />
      <div className="flex flex-col px-4 sm:px-10">
        {educationData.map((item) => (
          <article
            key={item.id}
            className="border-t-2 border-white/30 py-8 sm:py-10"
          >
            <div className="flex flex-col gap-2 min-w-0">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-light text-balance">
                {item.degree}
              </h3>
              <p className="text-base sm:text-xl text-white/80 text-balance">
                {item.institution}
              </p>
              <p className="text-sm sm:text-lg text-white/60 break-words">
                {item.period}
                {item.status ? ` · ${item.status}` : ""}
              </p>
              {item.expected ? (
                <p className="text-sm sm:text-base text-white/45">{item.expected}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
