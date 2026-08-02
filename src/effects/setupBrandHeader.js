// src/effects/setupBrandHeader.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupBrandHeader(headerElement) {
  if (
    !headerElement ||
    typeof window === "undefined"
  ) {
    return NOOP;
  }

  const heroElement =
    document.querySelector("#top") ||
    document.querySelector("main > section");

  const accessElement =
    document.querySelector("#access");

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches ?? false;

  /*
    初期状態はHeroを邪魔しないように非表示。
  */
  gsap.set(headerElement, {
    y: -10,
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });

  const showHeader = () => {
    gsap.to(headerElement, {
      y: 0,
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      duration: reduceMotion ? 0.01 : 0.72,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const hideHeader = () => {
    gsap.to(headerElement, {
      y: -8,
      opacity: 0,
      pointerEvents: "none",
      duration: reduceMotion ? 0.01 : 0.5,
      ease: "power2.out",
      overwrite: "auto",

      onComplete: () => {
        gsap.set(headerElement, {
          visibility: "hidden",
        });
      },
    });
  };

  const ctx = gsap.context(() => {
    /*
      Heroを抜けたあとにMIZATOロゴを表示。
    */
    const heroTrigger = heroElement
      ? ScrollTrigger.create({
          trigger: heroElement,
          start: "bottom 18%",
          end: "bottom top",

          onEnter: showHeader,
          onLeaveBack: hideHeader,
        })
      : null;

    /*
      Accessは画面そのものが締めなので、
      ロゴを消して余白を守る。
    */
    const accessTrigger = accessElement
      ? ScrollTrigger.create({
          trigger: accessElement,
          start: "top 58%",
          end: "bottom top",

          onEnter: hideHeader,
          onLeaveBack: showHeader,
        })
      : null;

    /*
      リロード時に途中位置だった場合の初期判定。
    */
    const currentScroll =
      window.scrollY ||
      document.documentElement.scrollTop;

    const heroBottom = heroElement
      ? heroElement.getBoundingClientRect().bottom +
        currentScroll
      : 0;

    const accessTop = accessElement
      ? accessElement.getBoundingClientRect().top +
        currentScroll
      : Number.POSITIVE_INFINITY;

    const shouldShow =
      currentScroll > heroBottom * 0.72 &&
      currentScroll < accessTop -
        window.innerHeight * 0.45;

    if (shouldShow) {
      gsap.set(headerElement, {
        y: 0,
        opacity: 1,
        visibility: "visible",
        pointerEvents: "auto",
      });
    }

    return () => {
      heroTrigger?.kill();
      accessTrigger?.kill();
    };
  }, headerElement);

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