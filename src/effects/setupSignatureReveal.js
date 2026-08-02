// src/effects/setupSignatureReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupSignatureReveal(signatureElement) {
  if (!signatureElement || typeof window === "undefined") {
    return NOOP;
  }

  const heading = signatureElement.querySelector(
    "[data-signature-heading]"
  );

  const headingImage = heading?.querySelector("img");

  const line = signatureElement.querySelector(
    "[data-signature-line]"
  );

  const items = Array.from(
    signatureElement.querySelectorAll(
      "[data-signature-item]"
    )
  );

  const parallaxImages = Array.from(
    signatureElement.querySelectorAll(
      "[data-signature-parallax]"
    )
  );

  if (!heading || !headingImage) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches ?? false;

  if (reduceMotion) {
    gsap.set(heading, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
    });

    gsap.set(headingImage, {
      x: 0,
      opacity: 1,
      filter: "none",
    });

    if (line) {
      gsap.set(line, {
        scaleX: 1,
        opacity: 0.72,
      });
    }

    if (items.length) {
      gsap.set(items, {
        y: 0,
        opacity: 1,
        filter: "none",
      });
    }

    if (parallaxImages.length) {
      gsap.set(parallaxImages, {
        yPercent: 0,
        scale: 1,
      });
    }

    return () => {
      gsap.set(
        [
          heading,
          headingImage,
          line,
          ...items,
          ...parallaxImages,
        ].filter(Boolean),
        {
          clearProps: "all",
        }
      );
    };
  }

  const ctx = gsap.context(() => {
    gsap.set(heading, {
      clipPath: "inset(0% 100% 0% 0%)",
      opacity: 0,
    });

    gsap.set(headingImage, {
      x: -34,
      opacity: 0,
      filter: "blur(5px)",
    });

    if (line) {
      gsap.set(line, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
    }

    if (items.length) {
      gsap.set(items, {
        y: 28,
        opacity: 0,
        filter: "blur(5px)",
      });
    }

    if (parallaxImages.length) {
      gsap.set(parallaxImages, {
        yPercent: -5,
        scale: 1.08,
        transformOrigin: "center center",
      });
    }

    const revealTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
        overwrite: "auto",
      },

      scrollTrigger: {
        trigger: signatureElement,
        start: "top 72%",
        once: true,
        invalidateOnRefresh: true,
      },
    });

    revealTimeline
      .to(
        heading,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.35,
        },
        0
      )
      .to(
        headingImage,
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
        },
        0.3
      );

    if (line) {
      revealTimeline.to(
        line,
        {
          scaleX: 1,
          opacity: 0.72,
          duration: 0.9,
        },
        1.45
      );
    }

    if (items.length) {
      revealTimeline.to(
        items,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.18,
        },
        2.05
      );
    }

    parallaxImages.forEach((image, index) => {
      const item = image.closest(
        "[data-signature-item]"
      );

      if (!item) {
        return;
      }

      const drift =
        index === 1 ? 4.5 : 6;

      gsap.to(image, {
        yPercent: drift,
        ease: "none",
        overwrite: "auto",

        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
      });
    });
  }, signatureElement);

  const refreshFrame =
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  return () => {
    window.cancelAnimationFrame(
      refreshFrame
    );

    ctx.revert();
  };
}