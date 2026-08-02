// src/effects/setupInformationReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupInformationReveal(informationElement) {
  if (!informationElement || typeof window === "undefined") {
    return NOOP;
  }

  const visual = informationElement.querySelector(
    "[data-information-visual]"
  );

  const visualImage = informationElement.querySelector(
    "[data-information-image]"
  );

  const doorLeft = informationElement.querySelector(
    "[data-information-door-left]"
  );

  const doorRight = informationElement.querySelector(
    "[data-information-door-right]"
  );

  const intro = informationElement.querySelector(
    "[data-information-intro]"
  );

  const title = informationElement.querySelector(
    "[data-information-title]"
  );

  const divider = informationElement.querySelector(
    "[data-information-divider]"
  );

  const items = Array.from(
    informationElement.querySelectorAll(
      "[data-information-item]"
    )
  );

  if (!visual || !intro || !items.length) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches ?? false;

  const animatedTargets = [
    visual,
    visualImage,
    doorLeft,
    doorRight,
    intro,
    title,
    divider,
    ...items,
  ].filter(Boolean);

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  if (visualImage) {
    if (visualImage.complete) {
      window.requestAnimationFrame(
        refreshScrollTrigger
      );
    } else {
      visualImage.addEventListener(
        "load",
        refreshScrollTrigger,
        {
          once: true,
        }
      );
    }
  }

  if (reduceMotion) {
    gsap.set(animatedTargets, {
      clearProps: "all",
    });

    if (divider) {
      gsap.set(divider, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });
    }

    gsap.set(items, {
      y: 0,
      opacity: 1,
      filter: "none",
    });

    return () => {
      visualImage?.removeEventListener(
        "load",
        refreshScrollTrigger
      );

      gsap.set(animatedTargets, {
        clearProps: "all",
      });
    };
  }

  const media = gsap.matchMedia();

  const ctx = gsap.context(() => {
    /*
      PC：
      入口画像が浮かび、
      左右の暗いパネルが扉のように開く。
    */
    media.add(
      "(min-width: 768px)",
      () => {
        gsap.set(visual, {
          yPercent: -50,
          y: 34,
          scale: 0.975,
          opacity: 0,
          transformOrigin: "center center",
        });

        if (visualImage) {
          gsap.set(visualImage, {
            yPercent: -2.5,
            scale: 1.1,
            transformOrigin: "center center",
          });
        }

        if (doorLeft) {
          gsap.set(doorLeft, {
            xPercent: 0,
          });
        }

        if (doorRight) {
          gsap.set(doorRight, {
            xPercent: 0,
          });
        }

        gsap.set(intro, {
          yPercent: -50,
          y: 22,
          opacity: 0,
          filter: "blur(5px)",
        });

        if (title) {
          gsap.set(title, {
            y: 16,
            opacity: 0,
            filter: "blur(5px)",
          });
        }

        if (divider) {
          gsap.set(divider, {
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
          });
        }

        gsap.set(items, {
          y: 18,
          opacity: 0,
          filter: "blur(4px)",
        });

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: informationElement,
            start: "top 72%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        /*
          入口画像が暗闇から現れる。
        */
        timeline.to(
          visual,
          {
            yPercent: -50,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
          },
          0
        );

        if (visualImage) {
          timeline.to(
            visualImage,
            {
              yPercent: 0,
              scale: 1.06,
              duration: 1.5,
              ease: "power3.out",
            },
            0
          );
        }

        /*
          左右のパネルが分かれて入口が開く。
        */
        if (doorLeft) {
          timeline.to(
            doorLeft,
            {
              xPercent: -102,
              duration: 1.35,
              ease: "power3.inOut",
            },
            0.28
          );
        }

        if (doorRight) {
          timeline.to(
            doorRight,
            {
              xPercent: 102,
              duration: 1.35,
              ease: "power3.inOut",
            },
            0.28
          );
        }

        /*
          Information見出し。
        */
        timeline.to(
          intro,
          {
            yPercent: -50,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
          },
          0.52
        );

        if (title) {
          timeline.to(
            title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.05,
              ease: "power3.out",
            },
            0.64
          );
        }

        /*
          中央線。
        */
        if (divider) {
          timeline.to(
            divider,
            {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power3.out",
            },
            0.78
          );
        }

        /*
          店舗情報。
        */
        timeline.to(
          items,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.78,
            stagger: 0.1,
            ease: "power3.out",
          },
          1.02
        );

        /*
          スクロールに合わせて、
          入口の奥行きをごく小さく動かす。
        */
        if (visualImage) {
          gsap.to(visualImage, {
            yPercent: 4,
            ease: "none",

            scrollTrigger: {
              trigger: informationElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        }

        return () => {
          gsap.set(animatedTargets, {
            clearProps: "all",
          });
        };
      }
    );

    /*
      SP：
      タイトル、入口画像、情報の順に縦表示。
    */
    media.add(
      "(max-width: 767px)",
      () => {
        gsap.set(intro, {
          y: 24,
          opacity: 0,
          filter: "blur(5px)",
        });

        if (title) {
          gsap.set(title, {
            y: 14,
            opacity: 0,
            filter: "blur(5px)",
          });
        }

        gsap.set(visual, {
          y: 36,
          opacity: 0,
          scale: 0.98,
        });

        if (visualImage) {
          gsap.set(visualImage, {
            scale: 1.09,
            transformOrigin: "center center",
          });
        }

        if (doorLeft) {
          gsap.set(doorLeft, {
            xPercent: 0,
          });
        }

        if (doorRight) {
          gsap.set(doorRight, {
            xPercent: 0,
          });
        }

        if (divider) {
          gsap.set(divider, {
            opacity: 0,
            clipPath: "inset(0% 100% 0% 0%)",
          });
        }

        gsap.set(items, {
          y: 20,
          opacity: 0,
          filter: "blur(4px)",
        });

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: informationElement,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          intro,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          0
        );

        if (title) {
          timeline.to(
            title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
            },
            0.1
          );
        }

        timeline.to(
          visual,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
          },
          0.36
        );

        if (visualImage) {
          timeline.to(
            visualImage,
            {
              scale: 1.06,
              duration: 1.3,
              ease: "power3.out",
            },
            0.36
          );
        }

        if (doorLeft) {
          timeline.to(
            doorLeft,
            {
              xPercent: -102,
              duration: 1.2,
              ease: "power3.inOut",
            },
            0.68
          );
        }

        if (doorRight) {
          timeline.to(
            doorRight,
            {
              xPercent: 102,
              duration: 1.2,
              ease: "power3.inOut",
            },
            0.68
          );
        }

        if (divider) {
          timeline.to(
            divider,
            {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power3.out",
            },
            1.05
          );
        }

        timeline.to(
          items,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.76,
            stagger: 0.1,
            ease: "power3.out",
          },
          1.25
        );

        return () => {
          gsap.set(animatedTargets, {
            clearProps: "all",
          });
        };
      }
    );
  }, informationElement);

  const refreshFrame =
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  return () => {
    window.cancelAnimationFrame(
      refreshFrame
    );

    visualImage?.removeEventListener(
      "load",
      refreshScrollTrigger
    );

    media.revert();
    ctx.revert();
  };
}