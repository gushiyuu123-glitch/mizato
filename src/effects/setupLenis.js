// src/effects/setupLenis.js

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupLenis() {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    return NOOP;
  }

  const root = document.documentElement;

  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const mobileQuery = window.matchMedia(
    "(max-width: 767px)"
  );

  let lenis = null;
  let refreshFrame = 0;

  const shouldUseNativeScroll = () => {
    return reduceMotionQuery.matches || mobileQuery.matches;
  };

  const scheduleRefresh = () => {
    if (refreshFrame) {
      window.cancelAnimationFrame(refreshFrame);
    }

    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = 0;
      ScrollTrigger.refresh();
    });
  };

  const handleLenisScroll = () => {
    ScrollTrigger.update();
  };

  const updateLenis = (time) => {
    if (!lenis) return;

    lenis.raf(time * 1000);
  };

  const startLenis = () => {
    if (lenis || shouldUseNativeScroll()) {
      return;
    }

    root.classList.add("has-lenis");

    lenis = new Lenis({
      duration: 1.22,

      easing: (t) =>
        Math.min(
          1,
          1.001 - Math.pow(2, -10 * t)
        ),

      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1,
      anchors: true,

      /*
        GSAP側のtickerで動かすため、
        Lenis自身のRAFは使用しない。
      */
      autoRaf: false,
    });

    lenis.on(
      "scroll",
      handleLenisScroll
    );

    gsap.ticker.add(updateLenis);

    scheduleRefresh();
  };

  const stopLenis = ({
    refresh = true,
  } = {}) => {
    if (refreshFrame) {
      window.cancelAnimationFrame(
        refreshFrame
      );

      refreshFrame = 0;
    }

    gsap.ticker.remove(updateLenis);

    if (lenis) {
      lenis.off?.(
        "scroll",
        handleLenisScroll
      );

      lenis.destroy();
      lenis = null;
    }

    root.classList.remove("has-lenis");

    if (refresh) {
      scheduleRefresh();
    }
  };

  const syncScrollMode = () => {
    if (shouldUseNativeScroll()) {
      stopLenis();
      return;
    }

    startLenis();
  };

  const addMediaListener = (
    mediaQuery,
    listener
  ) => {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener(
        "change",
        listener
      );

      return;
    }

    mediaQuery.addListener?.(listener);
  };

  const removeMediaListener = (
    mediaQuery,
    listener
  ) => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener(
        "change",
        listener
      );

      return;
    }

    mediaQuery.removeListener?.(listener);
  };

  addMediaListener(
    reduceMotionQuery,
    syncScrollMode
  );

  addMediaListener(
    mobileQuery,
    syncScrollMode
  );

  syncScrollMode();

  return () => {
    removeMediaListener(
      reduceMotionQuery,
      syncScrollMode
    );

    removeMediaListener(
      mobileQuery,
      syncScrollMode
    );

    stopLenis({
      refresh: false,
    });
  };
}