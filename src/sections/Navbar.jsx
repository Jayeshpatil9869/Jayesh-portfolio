import React, { useEffect, useRef, useState } from "react";
import { socials, RESUME_URL } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { applyMagnetEffect } from "../utils/sheryEffects";
import { useLenis } from "lenis/react";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const lenis = useLenis();
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isNearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;

      setShowBurger(
        currentScrollY <= lastScrollY || currentScrollY < 10 || isNearBottom
      );

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply magnet effect to navigation links and social media links
  useEffect(() => {
    let cleanup;
    // Apply only after the menu is opened and on non-mobile devices
    if (isOpen && window.matchMedia("(min-width: 768px)").matches) {
      // Apply to navigation links
      cleanup = applyMagnetEffect(".magnet-btn", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    if (lenis) {
      lenis.scrollTo(`#${sectionId}`, { offset: 0, duration: 1.2 });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "auto" });
    }
  };
  return (
    <>
      <nav
        id="site-navigation-drawer"
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-24 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-[9vh]">
          {["home", "experience", "about", "work", "resume", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                {section === "resume" ? (
                  <div className="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-8">
                    <a
                      href={`#${section}`}
                      className="transition-all duration-300 cursor-pointer text-gold hover:text-white cursor-hover block"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu(); // Close menu on click
                        scrollToSection(section);
                      }}
                    >
                      {section}
                    </a>
                    <div className="flex gap-4 text-sm md:text-lg tracking-widest uppercase font-light mt-1 xl:mt-0 xl:pt-4 text-white/50">
                      <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors cursor-hover"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`${RESUME_URL}?t=${Date.now()}`, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        [ VIEW ]
                      </a>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            const response = await fetch(`${RESUME_URL}?t=${new Date().getTime()}`);
                            if (!response.ok) throw new Error("Network response was not ok");
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", "Jayesh_Patil_Resume.pdf");
                            document.body.appendChild(link);
                            link.click();
                            link.parentNode.removeChild(link);
                            window.URL.revokeObjectURL(url);
                          } catch (error) {
                            console.error("Resume download failed:", error);
                            window.open(RESUME_URL, "_blank");
                          }
                        }}
                        className="hover:text-gold transition-colors cursor-hover uppercase"
                      >
                        [ DOWNLOAD ]
                      </button>
                    </div>
                  </div>
                ) : (
                  <a
                    href={`#${section}`}
                    className="transition-all duration-300 cursor-pointer hover:text-white cursor-hover block"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu(); // Close menu on click
                      scrollToSection(section);
                    }}
                  >
                    {section}
                  </a>
                )}
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-[15px] tracking-widest lowercase text-pretty">
              work@jayeshbpatil.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-hover magnet-btn"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="site-navigation-drawer"
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 cursor-hover"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          aria-hidden="true"
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          aria-hidden="true"
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </button>
    </>
  );
};

export default Navbar;
