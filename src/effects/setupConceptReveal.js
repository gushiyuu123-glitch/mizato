import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupConceptReveal(conceptElement) {
  if (!conceptElement) return () => {};

  const axis = conceptElement.querySelector("[data-concept-axis]");
  const divider = conceptElement.querySelector("[data-concept-divider]");
  const copy = conceptElement.querySelector("[data-concept-copy]");
  const copyLines = conceptElement.querySelectorAll("[data-concept-copy-line]");

  if (!axis) return () => {};

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    conceptElement.style.setProperty("--axis-trace-opacity", "0");
    conceptElement.style.setProperty("--axis-trace-y", "-115%");

    axis.style.clipPath = "inset(0% 0% 0% 0%)";
    axis.style.opacity = "1";

    if (divider) {
      divider.style.clipPath = "inset(0% 0% 0% 0%)";
      divider.style.opacity = "1";
    }

    if (copy) {
      copy.style.opacity = "1";
      copy.style.filter = "none";
      copy.style.transform = "translateY(-50%)";
    }

    return () => {};
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: conceptElement,
        start: "top 72%",
        once: true,
      },
    });

    tl.to(
      axis,
      {
        clipPath: "inset(0% 0% 0% 0%)",
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
      tl.to(
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
  tl.to(
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
  tl.to(
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

  return () => ctx.revert();
}