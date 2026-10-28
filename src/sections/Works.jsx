import { Icon } from "../lib/icons";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { featuredProjects, practiceProjects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

const Works = () => {
  const lenis = useLenis();
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const listedProjects = [...featuredProjects, ...practiceProjects];

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `Client and production work first.
    Practice clones sit below so they never
    compete with shipped systems.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.set(previewRef.current, { x: -600, y: -400 });
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(".project-item", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".project-item",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInternalLink = (e, hash) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(hash, { duration: 1.2 });
      return;
    }
    document.querySelector(hash)?.scrollIntoView();
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    if (!moveX.current || !moveY.current) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  const renderProject = (project, index) => (
    <a
      key={project.id}
      href={project.href}
      target={project.internal ? undefined : "_blank"}
      rel={project.internal ? undefined : "noopener noreferrer"}
      className="relative flex flex-col gap-1 py-5 cursor-pointer project-item group md:gap-0 cursor-hover"
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
      onClick={
        project.internal
          ? (e) => handleInternalLink(e, project.href)
          : undefined
      }
      aria-label={
        project.internal
          ? `Read case study: ${project.name}`
          : `View project ${project.name}`
      }
    >
      <div
        ref={(el) => {
          overlayRefs.current[index] = el;
        }}
        className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
      />

      <div className="flex justify-between gap-4 px-4 sm:px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
        <h2 className="min-w-0 text-xl sm:text-[26px] lg:text-[32px] leading-tight text-balance">
          {project.name}
        </h2>
        <Icon
          icon="lucide:arrow-up-right"
          className="md:size-6 size-5 shrink-0"
          aria-hidden="true"
        />
      </div>
      <div className="w-full h-0.5 bg-black/80" />
      <div className="flex flex-wrap px-4 sm:px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
        {project.caseStudy && !project.internal ? (
          <p className="text-black/60 transition-colors duration-500 md:group-hover:text-white/70">
            Case study below
          </p>
        ) : null}
        {project.frameworks.map((framework) => (
          <p
            key={framework.id}
            className="text-black transition-colors duration-500 md:group-hover:text-white"
          >
            {framework.name}
          </p>
        ))}
      </div>
      <div className="relative px-4 sm:px-10 md:hidden">
        <div className="relative w-full aspect-[16/10]">
          <ProjectPicture
            src={project.image}
            alt={`${project.name} preview`}
            className="object-cover w-full h-full rounded-md"
            width="800"
            height="500"
          />
        </div>
      </div>
    </a>
  );

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {featuredProjects.map((project, index) =>
          renderProject(project, index)
        )}

        {practiceProjects.length > 0 ? (
          <>
            <div className="px-4 pt-16 pb-4 sm:px-10">
              <p className="section-kicker text-sm uppercase font-light text-black/50">
                Practice & clones
              </p>
              <p className="mt-2 max-w-xl text-base font-light text-black/70">
                Front-end studies and recreations. Useful for craft — not client
                deliverables.
              </p>
            </div>
            {practiceProjects.map((project, index) =>
              renderProject(project, featuredProjects.length + index)
            )}
          </>
        ) : null}

        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 overflow-hidden pointer-events-none w-[560px] md:block hidden opacity-0"
        >
          {currentIndex !== null && listedProjects[currentIndex] ? (
            <ProjectPicture
              src={listedProjects[currentIndex].image}
              alt=""
              className="object-cover w-full h-full"
              width="560"
              height="400"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

function webpSrc(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function ProjectPicture({ src, alt, className, width, height }) {
  const webp = webpSrc(src);
  return (
    <picture>
      {webp !== src ? <source srcSet={webp} type="image/webp" /> : null}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default Works;
