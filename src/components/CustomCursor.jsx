import React, { useEffect, useRef } from "react";

/** 
 * Drop <CustomCursor /> once near the end of your app (e.g., in _app.tsx or Layout). 
 * Tailwind is optional; the component uses its own styles and hides on small screens 
 * similarly to `hidden sm:block md:block`. 
 */ 
export default function CustomCursor() { 
  const outerRef = useRef(null); 
  const innerRef = useRef(null); 

  useEffect(() => { 
    if (typeof window === "undefined") return; 

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0; 
    if (isTouch) { 
      // Hide on touch devices 
      outerRef.current?.style.setProperty("display", "none"); 
      innerRef.current?.style.setProperty("display", "none"); 
      return; 
    } 

    const outer = outerRef.current; 
    const inner = innerRef.current; 

    // Target positions (mouse) and lerped positions (outer cursor) 
    let targetX = window.innerWidth / 2; 
    let targetY = window.innerHeight / 2; 
    let lerpX = targetX; 
    let lerpY = targetY; 

    let rafId = 0; 

    const onMouseMove = (e) => { 
      targetX = e.clientX; 
      targetY = e.clientY; 
      // Inner cursor snaps to pointer 
      inner.style.left = `${targetX}px`; 
      inner.style.top = `${targetY}px`; 
    }; 

    const onMouseDown = () => { 
      outer.classList.add("click"); 
      inner.classList.add("cursorinnerhover"); 
    }; 
    const onMouseUp = () => { 
      outer.classList.remove("click"); 
      inner.classList.remove("cursorinnerhover"); 
    }; 

    const onMouseEnter = () => { 
      outer.style.opacity = "1"; 
      inner.style.opacity = "0.6"; 
    }; 
    const onMouseLeave = () => { 
      outer.style.opacity = "0"; 
      inner.style.opacity = "0"; 
    }; 

    const onPointerOver = (e) => { 
      const el = e.target; 
      if (el.closest("a, button, [role='button'], .cursor-hover")) { 
        outer.classList.add("hover"); 
      } 
    }; 
    const onPointerOut = (e) => { 
      const el = e.target; 
      if (el.closest("a, button, [role='button'], .cursor-hover")) { 
        outer.classList.remove("hover"); 
      } 
    }; 

    const loop = () => { 
      // Smooth follow for the outer ring 
      const ease = 0.18; // smaller = smoother/slower 
      lerpX += (targetX - lerpX) * ease; 
      lerpY += (targetY - lerpY) * ease; 

      outer.style.transform = `translate3d(calc(${lerpX}px - 50%), calc(${lerpY}px - 50%), 0)`; 

      rafId = requestAnimationFrame(loop); 
    }; 

    document.addEventListener("mousemove", onMouseMove); 
    document.addEventListener("mousedown", onMouseDown); 
    document.addEventListener("mouseup", onMouseUp); 
    document.addEventListener("mouseenter", onMouseEnter); 
    document.addEventListener("mouseleave", onMouseLeave); 
    document.addEventListener("mouseover", onPointerOver, true); 
    document.addEventListener("mouseout", onPointerOut, true); 

    rafId = requestAnimationFrame(loop); 

    return () => { 
      cancelAnimationFrame(rafId); 
      document.removeEventListener("mousemove", onMouseMove); 
      document.removeEventListener("mousedown", onMouseDown); 
      document.removeEventListener("mouseup", onMouseUp); 
      document.removeEventListener("mouseenter", onMouseEnter); 
      document.removeEventListener("mouseleave", onMouseLeave); 
      document.removeEventListener("mouseover", onPointerOver, true); 
      document.removeEventListener("mouseout", onPointerOut, true); 
    }; 
  }, []); 

  return ( 
    <> 
      {/* Containers replicate `hidden sm:block md:block` behavior */} 
      <div className="custom-cursor-wrapper"> 
        <div ref={outerRef} className="cursor-outer" /> 
        <div ref={innerRef} className="cursor-inner" /> 
      </div> 

      <style>{` 
        /* Visibility like: hidden sm:block md:block */ 
        .custom-cursor-wrapper { position: fixed; inset: 0; pointer-events: none; z-index: 9999; } 
        @media (max-width: 639px) { /* < sm */ 
          .custom-cursor-wrapper { display: none; } 
        } 

        /* Base cursors */ 
        .cursor-outer { 
          width: 30px; height: 30px; border-radius: 50%; 
          border: 1px solid #cfa355; position: fixed; left: 0; top: 0; 
          transform: translate3d(calc(-50% + 15px), -50%, 0); 
          transition: transform 200ms ease-out, opacity 200ms ease-out; 
          mix-blend-mode: difference; pointer-events: none; opacity: 1; 
        } 
        .cursor-inner { 
          width: 15px; height: 15px; border-radius: 50%; background: #cfa355; 
          opacity: 0.6; position: fixed; transform: translate(-50%, -50%); 
          pointer-events: none; transition: width .3s, height .3s, opacity .3s; 
          mix-blend-mode: difference; 
        } 

        /* States */ 
        .cursor-outer.hover { transform: scale(1.6) translate3d(calc(-50% + 15px), -50%, 0); } 
        .cursor-outer.click { transform: scale(0.9) translate3d(calc(-50% + 15px), -50%, 0); } 
        .cursor-inner.cursorinnerhover { width: 8px; height: 8px; opacity: 0.9; } 

        /* Respect users who prefer reduced motion */ 
        @media (prefers-reduced-motion: reduce) { 
          .cursor-outer { transition: none; } 
          .cursor-inner { transition: none; } 
        } 
      `}</style> 
    </> 
  ); 
}