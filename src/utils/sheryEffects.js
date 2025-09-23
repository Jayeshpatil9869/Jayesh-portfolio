import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Apply image effect to elements matching the selector
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Configuration options for the effect
 * @returns {Function} Cleanup function
 */
export const applyImageEffect = (selector, options = {}) => {
  try {
    // Default options for image effects
    const defaultOptions = {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    };

    // Merge default options with provided options
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Get all elements matching the selector
    const elements = document.querySelectorAll(selector);
    
    // Store event listeners for cleanup
    const listeners = [];
    
    elements.forEach(el => {
      // Create hover enter function
      const onEnter = () => {
        gsap.to(el, {
          scale: mergedOptions.scale,
          duration: mergedOptions.duration,
          ease: mergedOptions.ease,
        });
      };
      
      // Create hover leave function
      const onLeave = () => {
        gsap.to(el, {
          scale: 1,
          duration: mergedOptions.duration,
          ease: mergedOptions.ease,
        });
      };
      
      // Add event listeners
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      
      // Store listeners for cleanup
      listeners.push({ el, onEnter, onLeave });
    });

    // Return cleanup function
    return () => {
      listeners.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  } catch (error) {
    console.error("Error applying image effect:", error);
    return () => {}; // Return empty cleanup function
  }
};

/**
 * Apply magnet effect to elements matching the selector
 * @param {string} selector - CSS selector for target elements
 * @param {Object} options - Configuration options for the effect
 * @returns {Function} Cleanup function
 */
export const applyMagnetEffect = (selector, options = {}) => {
  try {
    // Default options for magnet effects
    const defaultOptions = {
      ease: "power2.out",
      duration: 0.3,
      strength: 0.6,
    };

    // Merge default options with provided options
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Get all elements matching the selector
    const elements = document.querySelectorAll(selector);
    
    // Store event listeners for cleanup
    const listeners = [];
    
    elements.forEach(el => {
      // Original position
      let originalX = 0;
      let originalY = 0;
      
      // Get original position on first hover
      const setOriginalPosition = () => {
        const rect = el.getBoundingClientRect();
        originalX = rect.left + rect.width / 2;
        originalY = rect.top + rect.height / 2;
      };
      
      // Create mousemove function
      const onMove = (e) => {
        if (originalX === 0 && originalY === 0) {
          setOriginalPosition();
        }
        
        const strength = mergedOptions.strength;
        const x = (e.clientX - originalX) * strength;
        const y = (e.clientY - originalY) * strength;
        
        gsap.to(el, {
          x: x,
          y: y,
          duration: mergedOptions.duration,
          ease: mergedOptions.ease,
        });
      };
      
      // Create mouseleave function
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: mergedOptions.duration,
          ease: mergedOptions.ease,
        });
      };
      
      // Add event listeners
      el.addEventListener('mouseenter', setOriginalPosition);
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      
      // Store listeners for cleanup
      listeners.push({ el, setOriginalPosition, onMove, onLeave });
    });

    // Return cleanup function
    return () => {
      listeners.forEach(({ el, setOriginalPosition, onMove, onLeave }) => {
        el.removeEventListener('mouseenter', setOriginalPosition);
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  } catch (error) {
    console.error("Error applying magnet effect:", error);
    return () => {}; // Return empty cleanup function
  }
};

/**
 * Cleanup function to remove Shery effects
 * Call this function in useEffect cleanup to prevent memory leaks
 * @deprecated Use the cleanup functions returned by individual effect functions
 */
export const cleanupSheryEffects = () => {
  console.warn('cleanupSheryEffects is deprecated. Use the cleanup functions returned by individual effect functions');
};