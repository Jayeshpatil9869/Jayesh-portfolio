import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

gsap.registerPlugin(ScrollTrigger);

const CLIP_COLLAPSED = "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

function webpFromSrc(src) {
  if (!src) return null;
  const next = src.replace(/\.(png|jpe?g)$/i, ".webp");
  return next !== src ? next : null;
}

/**
 * Bottom-to-top clip-path image wipe (About portrait language).
 *
 * @param {"scroll" | "manual"} [trigger]
 */
const RevealImage = forwardRef(function RevealImage(
  {
    src,
    webpSrc,
    alt = "",
    className = "",
    width,
    height,
    trigger = "scroll",
    loading = "lazy",
  },
  ref
) {
  const imgRef = useRef(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const reset = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (reduceMotionRef.current) {
      gsap.set(el, { clipPath: CLIP_OPEN });
      return;
    }
    gsap.set(el, { clipPath: CLIP_COLLAPSED });
  }, []);

  const play = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (reduceMotionRef.current) {
      gsap.set(el, { clipPath: CLIP_OPEN });
      return;
    }
    gsap.fromTo(
      el,
      { clipPath: CLIP_COLLAPSED },
      {
        clipPath: CLIP_OPEN,
        duration: trigger === "manual" ? 0.45 : 2,
        ease: trigger === "manual" ? "power2.out" : "power4.out",
      }
    );
  }, [trigger]);

  useImperativeHandle(ref, () => ({ play, reset }), [play, reset]);

  useGSAP(
    () => {
      const el = imgRef.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      reduceMotionRef.current = reduce;

      if (reduce) {
        gsap.set(el, { clipPath: CLIP_OPEN });
        return;
      }

      if (trigger === "manual") {
        gsap.set(el, { clipPath: CLIP_COLLAPSED });
        return;
      }

      gsap.set(el, { clipPath: CLIP_COLLAPSED });
      gsap.to(el, {
        clipPath: CLIP_OPEN,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { trigger: el },
      });
    },
    { dependencies: [src, trigger] }
  );

  const resolvedWebp = webpSrc ?? webpFromSrc(src);

  return (
    <picture>
      {resolvedWebp ? <source srcSet={resolvedWebp} type="image/webp" /> : null}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
});

export default RevealImage;
export { CLIP_COLLAPSED, CLIP_OPEN };
