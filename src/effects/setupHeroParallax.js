import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupHeroParallax(heroElement) {
  if (!heroElement) return () => {};

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) return () => {};

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
      scrollTrigger: {
        trigger: heroElement,
        start: "top top",
        end: "bottom top",
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });
  }, heroElement);

  return () => ctx.revert();
}