import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupConceptReveal(conceptElement) {
  if (!conceptElement || typeof window === "undefined") {
    return NOOP;
  }

  const axis = conceptElement.querySelector("[data-concept-axis]");
  const divider = conceptElement.querySelector("[data-concept-divider]");
  const copy = conceptElement.querySelector("[data-concept-copy]");

  const copyLines = Array.from(
    conceptElement.querySelectorAll("[data-concept-copy-line]")
  );

  if (!axis) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    conceptElement.style.setProperty("--axis-trace-opacity", "0");
    conceptElement.style.setProperty("--axis-trace-y", "-115%");

    gsap.set(axis, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      clearProps: "filter,y",
    });

    if (divider) {
      gsap.set(divider, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      });
    }

    if (copy) {
      gsap.set(copy, {
        yPercent: -50,
        y: 0,
        opacity: 1,
        filter: "none",
      });
    }

    if (copyLines.length) {
      gsap.set(copyLines, {
        y: 0,
        opacity: 1,
      });
    }

    return () => {
      gsap.set(
        [axis, divider, copy, ...copyLines].filter(Boolean),
        {
          clearProps: "all",
        }
      );

      conceptElement.style.removeProperty("--axis-trace-opacity");
      conceptElement.style.removeProperty("--axis-trace-y");
    };
  }

  const ctx = gsap.context(() => {
    gsap.set(conceptElement, {
      "--axis-trace-opacity": 0,
      "--axis-trace-y": "110%",
    });

    gsap.set(axis, {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 0.94,
    });

    if (divider) {
      gsap.set(divider, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
      });
    }

    if (copy) {
      gsap.set(copy, {
        yPercent: -50,
        y: 18,
        opacity: 0,
        filter: "blur(6px)",
      });
    }

    if (copyLines.length) {
      gsap.set(copyLines, {
        y: 14,
        opacity: 0,
      });
    }

    const timeline = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },

      scrollTrigger: {
        trigger: conceptElement,
        start: "top 72%",
        once: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(
        axis,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.75,
          ease: "power3.out",
        },
        0
      )
      .to(
        conceptElement,
        {
          "--axis-trace-opacity": 1,
          duration: 0.18,
          ease: "none",
        },
        0.05
      )
      .to(
        conceptElement,
        {
          "--axis-trace-y": "-115%",
          duration: 1.75,
          ease: "power3.out",
        },
        0.05
      )
      .to(
        conceptElement,
        {
          "--axis-trace-opacity": 0,
          duration: 0.36,
          ease: "power2.out",
        },
        1.34
      );

    if (divider) {
      timeline.to(
        divider,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
        },
        1.42
      );
    }

    if (copy) {
      timeline.to(
        copy,
        {
          yPercent: -50,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
        },
        1.78
      );
    }

    if (copyLines.length) {
      timeline.to(
        copyLines,
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.11,
          ease: "power3.out",
        },
        2.08
      );
    }
  }, conceptElement);

  const refreshId = window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    window.cancelAnimationFrame(refreshId);

    ctx.revert();

    conceptElement.style.removeProperty("--axis-trace-opacity");
    conceptElement.style.removeProperty("--axis-trace-y");
  };
}