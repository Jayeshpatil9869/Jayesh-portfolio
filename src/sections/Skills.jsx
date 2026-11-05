import { useMemo } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import PhysicsTagPile from "../components/PhysicsTagPile";
import { skillsData } from "../constants/experience";

/** Highlight core stack chips in the pile (gold accent). */
const FEATURED = new Set([
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
]);

const Skills = () => {
  const tags = useMemo(
    () =>
      skillsData.flatMap((group) =>
        group.items.map((label) => ({
          label,
          featured: FEATURED.has(label),
        }))
      ),
    []
  );

  return (
    <section id="skills" className="flex flex-col bg-black text-white pb-20">
      <AnimatedHeaderSection
        subTitle={"Stack used in production work"}
        title={"Skills"}
        text={`Tools I use to ship frontend, API, and full-stack products —
grouped for a quick recruiter scan.`}
        textColor={"text-white"}
        withScrollTrigger={true}
        size="section"
      />
      <div className="px-4 sm:px-10">
        <PhysicsTagPile
          tags={tags}
          trigger="view"
          replay={true}
          dropStyle="rain"
          gravity={1}
          bounce={0.35}
          friction={0.4}
          stagger={0.05}
          drag={true}
          cursorPush={true}
          keepReadable={true}
          maxTilt={25}
          featuredColor="#cfa355"
          colors={["#1a1a1a", "#393632", "#2a2a28", "#e5e5e0", "#8b8b73"]}
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.16)"
          height={440}
          className="w-full rounded-2xl border border-white/10 bg-black/40"
        />
      </div>
    </section>
  );
};

export default Skills;
