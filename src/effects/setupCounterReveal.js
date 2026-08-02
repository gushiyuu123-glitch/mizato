import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupCounterReveal(counterElement) {
  if (!counterElement || typeof window === "undefined") {
    return NOOP;
  }

  const axis = counterElement.querySelector("[data-counter-axis]");

  if (!axis) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    counterElement.style.setProperty("--axis-trace-opacity", "0");
    counterElement.style.setProperty("--axis-trace-y", "115%");

    gsap.set(axis, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      y: 0,
      filter: "none",
    });

    return () => {
      gsap.set(axis, {
        clearProps: "all",
      });

      counterElement.style.removeProperty("--axis-trace-opacity");
      counterElement.style.removeProperty("--axis-trace-y");
    };
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

    gsap
      .timeline({
        defaults: {
          overwrite: "auto",
        },

        scrollTrigger: {
          trigger: counterElement,
          start: "top 66%",
          once: true,
          invalidateOnRefresh: true,
        },
      })
      .to(
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

  const refreshId = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    window.cancelAnimationFrame(refreshId);

    ctx.revert();

    counterElement.style.removeProperty("--axis-trace-opacity");
    counterElement.style.removeProperty("--axis-trace-y");
  };
}