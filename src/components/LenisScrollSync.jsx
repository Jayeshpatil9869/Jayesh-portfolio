import { useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One RAF owner: GSAP ticker drives Lenis, Lenis scroll updates ScrollTrigger.
 * ReactLenis must be mounted with autoRaf={false} so this is not a second loop.
 */
export default function LenisScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        gsap.ticker.remove(ticker);
      } else {
        gsap.ticker.add(ticker);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [lenis]);

  return null;
}
