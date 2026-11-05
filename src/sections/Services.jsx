import { Fragment } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import RevealLines from "../components/RevealLines";
import { useMediaQuery } from "react-responsive";
import { experienceData, experienceIntro } from "../constants/experience";

/**
 * Peek offset between stacked sticky cards (must match `top` step).
 * Sized so company + role title stay readable in the peek band.
 */
const STACK_STEP_EM = 7;
/**
 * End-of-section runway (real box, not padding).
 * Sticky constraint follows the parent's content size; padding alone does not
 * keep early cards pinned while later cards finish stacking.
 */
const STICKY_RUNWAY_VH = 85;

const Experience = () => {
  const isDesktop = useMediaQuery({ minWidth: "48rem" });
  const isTallEnough = useMediaQuery({ minHeight: "720px" });
  const useSticky = isDesktop && isTallEnough;
  const cardCount = experienceData.length;

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

      {experienceData.map((experience, index) => {
        const remainingAfter = cardCount - index - 1;

        return (
          <Fragment key={experience.id}>
            <div
              className={`px-4 sm:px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30 ${useSticky ? "sticky" : "relative"}`}
              style={
                useSticky
                  ? {
                      top: `calc(10vh + ${index * STACK_STEP_EM}em)`,
                      zIndex: index + 1,
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-4 font-light">
                <div className="flex flex-col gap-6 min-w-0 w-full">
                  <div className="flex flex-col gap-2">
                    <RevealLines
                      as="p"
                      lines={[experience.company]}
                      className="text-lg sm:text-2xl text-white/80 text-balance"
                    />
                    <RevealLines
                      as="h3"
                      lines={[experience.title]}
                      className="text-2xl sm:text-4xl lg:text-5xl text-balance"
                    />
                    <p className="text-sm sm:text-base uppercase tracking-wider text-white/50">
                      {experience.employmentType}
                    </p>
                    <p className="text-base sm:text-xl text-white/60 text-balance break-words">
                      {`${experience.period} | ${experience.type}`}
                    </p>
                    {experience.note ? (
                      <RevealLines
                        as="p"
                        lines={[experience.note]}
                        className="text-sm sm:text-base text-white/45 text-pretty max-w-3xl"
                      />
                    ) : null}
                  </div>
                  <RevealLines
                    as="p"
                    lines={[experience.description]}
                    className="text-base sm:text-xl leading-relaxed tracking-normal sm:tracking-wide lg:text-2xl text-white/60 text-pretty"
                  />
                  <div className="flex flex-col gap-2 text-base sm:text-2xl sm:gap-4 lg:text-3xl text-white/80 min-w-0">
                    {experience.responsibilities.map((responsibility, itemIndex) => (
                      <div key={`${experience.id}-${itemIndex}`}>
                        <div className="flex gap-4 sm:gap-8 text-pretty min-w-0">
                          <span className="shrink-0 text-lg text-white/55" aria-hidden="true">
                            0{itemIndex + 1}
                          </span>
                          <RevealLines
                            as="div"
                            lines={[responsibility]}
                            className="min-w-0 flex-1"
                            stagger={0.08}
                          />
                        </div>
                        {itemIndex < experience.responsibilities.length - 1 && (
                          <div className="w-full h-px my-2 bg-white/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*
              Stack gaps must NOT live as marginBottom on the sticky card.
              Sticky constraint uses the margin box, so large margins make early
              cards unstick while later cards are still entering (4th-card bug).
            */}
            {useSticky && remainingAfter > 0 ? (
              <div
                aria-hidden="true"
                className="pointer-events-none"
                style={{ height: `${remainingAfter * STACK_STEP_EM}rem` }}
              />
            ) : null}
          </Fragment>
        );
      })}

      {useSticky ? (
        <div
          aria-hidden="true"
          className="pointer-events-none"
          style={{ height: `${STICKY_RUNWAY_VH}vh` }}
        />
      ) : null}
    </section>
  );
};

export default Experience;
