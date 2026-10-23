import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import About from "./sections/About";
import Works from "./sections/Works";
import Resume from "./sections/Resume";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import ReactLenis from "lenis/react";
import CustomCursor from "./components/CustomCursor";
import LenisScrollSync from "./components/LenisScrollSync";

const App = () => {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{ autoRaf: false }}
      className="relative w-full min-h-screen"
    >
      <LenisScrollSync />
      <main className="opacity-100">
        <Navbar />
        <Hero />

        {/* 
          Critical SEO Change: 
          Removed Suspense and Lazy Loading to ensure Googlebot 
          sees all text content on the initial render without 
          waiting for hydration or chunk loading.
        */}
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <Resume />
        <ContactSummary />
        <Contact />

        <CustomCursor />
      </main>
    </ReactLenis>
  );
};

export default App;
