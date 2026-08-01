// src/effects/setupSignatureReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupSignatureReveal(signatureElement) {
  if (!signatureElement) return () => {};

  const heading = signatureElement.querySelector("[data-signature-heading]");
  const headingImage = heading?.querySelector("img");
  const line = signatureElement.querySelector("[data-signature-line]");
  const items = signatureElement.querySelectorAll("[data-signature-item]");
  const parallaxImages = signatureElement.querySelectorAll(
    "[data-signature-parallax]"
  );

  if (!heading || !headingImage) return () => {};

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (reduceMotion) {
    heading.style.clipPath = "inset(0% 0% 0% 0%)";
    heading.style.opacity = "1";

    headingImage.style.opacity = "1";
    headingImage.style.transform = "translateX(0)";
    headingImage.style.filter = "none";

    if (line) {
      line.style.opacity = "1";
      line.style.transform = "scaleX(1)";
    }

    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
      item.style.filter = "none";
    });

    parallaxImages.forEach((image) => {
      image.style.transform = "translate3d(0, 0, 0)";
    });

    return () => {};
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

    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: signatureElement,
        start: "top 72%",
        once: true,
      },
      defaults: {
        ease: "power3.out",
      },
    });

    revealTl
      .to(heading, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1.35,
      })
      .to(
        headingImage,
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
        },
        "-=1.05"
      );

    if (line) {
      revealTl.to(
        line,
        {
          scaleX: 1,
          opacity: 0.72,
          duration: 0.9,
        },
        "-=0.15"
      );
    }

    if (items.length) {
      revealTl.to(
        items,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.18,
        },
        "+=0.28"
      );
    }

    parallaxImages.forEach((image, index) => {
      const drift = index === 1 ? 4.5 : 6;

      gsap.to(image, {
        yPercent: drift,
        ease: "none",
        scrollTrigger: {
          trigger: image.closest("[data-signature-item]"),
          start: "top bottom",
          end: "bottom top",
          scrub: 1.25,
        },
      });
    });
  }, signatureElement);

  return () => ctx.revert();
}