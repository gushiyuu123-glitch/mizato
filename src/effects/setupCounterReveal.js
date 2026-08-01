// src/effects/setupCounterReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupCounterReveal(counterElement) {
  if (!counterElement) return () => {};

  const axis = counterElement.querySelector("[data-counter-axis]");

  if (!axis) return () => {};

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    counterElement.style.setProperty("--axis-trace-opacity", "0");
    counterElement.style.setProperty("--axis-trace-y", "115%");

    axis.style.clipPath = "inset(0% 0% 0% 0%)";
    axis.style.opacity = "1";
    axis.style.filter = "none";
    axis.style.transform = "translateY(0)";

    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.set(counterElement, {
      "--axis-trace-opacity": 0,
      "--axis-trace-y": "-115%",
    });

    gsap.set(axis, {
      clipPath: "inset(0% 0% 100% 0%)",
      opacity: 0,
      y: -26,
      filter: "blur(6px)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: counterElement,
        start: "top 66%",
        once: true,
      },
    });

    tl.to(
      axis,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.05,
        ease: "power3.out",
      },
      0
    )
      .to(
        counterElement,
        {
          "--axis-trace-opacity": 1,
          duration: 0.22,
          ease: "none",
        },
        0.12
      )
      .to(
        counterElement,
        {
          "--axis-trace-y": "115%",
          duration: 2.05,
          ease: "power3.out",
        },
        0.12
      )
      .to(
        counterElement,
        {
          "--axis-trace-opacity": 0,
          duration: 0.48,
          ease: "power2.out",
        },
        1.58
      );
  }, counterElement);

  return () => ctx.revert();
}