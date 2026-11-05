import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Works from "./sections/Works";
import CaseStudy from "./sections/CaseStudy";
import Resume from "./sections/Resume";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import ReactLenis from "lenis/react";
import CustomCursor from "./components/CustomCursor";
import LenisScrollSync from "./components/LenisScrollSync";

const SiteContent = () => (
  <>
    <a href="#main-content" className="sr-only skip-link">
      Skip to content
    </a>
    <Navbar />
    <main id="main-content" className="opacity-100">
      {/*
        Critical SEO note:
        Keep section content in the initial bundle so crawlers see text
        without waiting on lazy route chunks.
      */}
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Skills />
      <Education />
      <Works />
      <CaseStudy />
      <Resume />
      <ContactSummary />
      <Contact />
    </main>
    <footer className="border-t border-black/20 bg-[#d6d6d6] px-4 py-8 text-sm font-light text-black/70 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Jayesh Patil ·{" "}
          <a
            href="mailto:work@jayeshbpatil.com"
            className="underline-offset-4 hover:text-black hover:underline"
          >
            work@jayeshbpatil.com
          </a>
        </p>
        <a
          href="#home"
          className="uppercase tracking-widest text-xs hover:text-black"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Back to top
        </a>
      </div>
    </footer>
    <CustomCursor />
  </>
);

const App = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) {
    return <div className="relative w-full min-h-screen">{SiteContent()}</div>;
  }

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{ autoRaf: false }}
      className="relative w-full min-h-screen"
    >
      <LenisScrollSync />
      <SiteContent />
    </ReactLenis>
  );
};

export default App;
