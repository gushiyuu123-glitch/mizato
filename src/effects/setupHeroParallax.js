import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

const HERO_PROPERTIES = [
  "--hero-bg-y",
  "--hero-bg-scale",
  "--hero-text-y",
  "--hero-text-opacity",
  "--hero-dim",
];

function clearHeroProperties(heroElement) {
  HERO_PROPERTIES.forEach((property) => {
    heroElement.style.removeProperty(property);
  });
}

export function setupHeroParallax(heroElement) {
  if (!heroElement || typeof window === "undefined") {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    clearHeroProperties(heroElement);
    return NOOP;
  }

  const ctx = gsap.context(() => {
    gsap.set(heroElement, {
      "--hero-bg-y": "0vh",
      "--hero-bg-scale": 1,
      "--hero-text-y": "0vh",
      "--hero-text-opacity": 1,
      "--hero-dim": 0,
    });

    gsap.to(heroElement, {
      "--hero-bg-y": "6.5vh",
      "--hero-bg-scale": 1.038,
      "--hero-text-y": "-7vh",
      "--hero-text-opacity": 0.68,
      "--hero-dim": 0.22,

      ease: "none",
      overwrite: "auto",

      scrollTrigger: {
        trigger: heroElement,
        start: "top top",
        end: "bottom top",
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });
  }, heroElement);

  const refreshId = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    window.cancelAnimationFrame(refreshId);

    ctx.revert();
    clearHeroProperties(heroElement);
  };
}