// src/effects/setupLenis.js

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupLenis() {
  if (typeof window === "undefined") return () => {};

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const isMobile =
    window.matchMedia?.("(max-width: 767px)")?.matches ?? false;

  // SP / reduced-motion はネイティブスクロール
  if (reduceMotion || isMobile) {
    document.documentElement.classList.remove("has-lenis");
    return () => {};
  }

  document.documentElement.classList.add("has-lenis");

  const lenis = new Lenis({
    duration: 1.22,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.86,
    touchMultiplier: 1,
    anchors: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const updateLenis = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    gsap.ticker.remove(updateLenis);
    lenis.destroy();
    document.documentElement.classList.remove("has-lenis");
  };
}