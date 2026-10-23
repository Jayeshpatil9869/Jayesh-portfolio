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
  const lenis = useLenis();
  const burgerRef = useRef(null);
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
    if (!isOpen) return;

    const drawer = navRef.current;
    const burger = burgerRef.current;
    const previouslyFocused = document.activeElement;
    lenis?.stop();

    const onKey = (event) => {
      if (event.key === "Escape") {
        tl.current?.reverse();
        iconTl.current?.reverse();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawer) return;
      const focusable = drawer.querySelectorAll("a, button");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    drawer?.querySelector("a, button")?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      } else {
        burger?.focus();
      }
    };
  }, [isOpen, lenis]);

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
        className="fixed z-50 flex flex-col justify-between w-full h-full px-6 sm:px-10 uppercase bg-black text-white/80 py-24 gap-y-10 md:w-1/2 md:left-1/2 overflow-y-auto overscroll-contain"
        data-lenis-prevent=""
      >
        <div className="flex flex-col text-[clamp(2rem,9vw,3rem)] gap-y-2 md:text-5xl lg:text-[clamp(2.75rem,6vh,5.5rem)]">
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
                          window.open(RESUME_URL, "_blank", "noopener,noreferrer");
                        }}
                      >
                        [ VIEW ]
                      </a>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            const response = await fetch(RESUME_URL);
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
            <a href="mailto:work@jayeshbpatil.com" className="text-[15px] tracking-widest lowercase text-pretty">
              work@jayeshbpatil.com
            </a>
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
        ref={burgerRef}
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-4 sm:right-10 cursor-hover"
        onClick={toggleMenu}
        style={{ top: "max(1rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
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
