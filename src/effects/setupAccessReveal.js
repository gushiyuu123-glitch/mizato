// src/effects/setupAccessReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupAccessReveal(accessElement) {
  if (
    !accessElement ||
    typeof window === "undefined"
  ) {
    return NOOP;
  }

  const scene = accessElement.querySelector(
    "[data-access-scene]"
  );

  const image = accessElement.querySelector(
    "[data-access-image]"
  );

  const navigation = accessElement.querySelector(
    "[data-access-nav]"
  );

  const content = accessElement.querySelector(
    "[data-access-content]"
  );

  const heading = accessElement.querySelector(
    "[data-access-heading]"
  );

  const title = accessElement.querySelector(
    "[data-access-title]"
  );

  const address = accessElement.querySelector(
    "[data-access-address]"
  );

  const metaItems = Array.from(
    accessElement.querySelectorAll(
      "[data-access-meta]"
    )
  );

  const link = accessElement.querySelector(
    "[data-access-link]"
  );

  if (
    !scene ||
    !image ||
    !content ||
    !heading
  ) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches ?? false;

  const animatedTargets = [
    scene,
    image,
    navigation,
    content,
    heading,
    title,
    address,
    link,
    ...metaItems,
  ].filter(Boolean);

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  if (image.complete) {
    window.requestAnimationFrame(
      refreshScrollTrigger
    );
  } else {
    image.addEventListener(
      "load",
      refreshScrollTrigger,
      {
        once: true,
      }
    );
  }

  if (reduceMotion) {
    gsap.set(animatedTargets, {
      clearProps: "all",
    });

    return () => {
      image.removeEventListener(
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
      松山の夜景にピントが合い、
      情報が現れたあと、
      左上の回遊ナビが最後に残る。
    */
    media.add(
      "(min-width: 768px)",
      () => {
        gsap.set(scene, {
          opacity: 0,
          clipPath: "inset(5% 0% 5% 0%)",
        });

        gsap.set(image, {
          xPercent: -1.4,
          scale: 1.1,
          filter:
            "blur(3px) brightness(0.48) contrast(1.04) saturate(0.72)",
          transformOrigin: "center center",
        });

        if (navigation) {
          gsap.set(navigation, {
            y: -10,
            opacity: 0,
            filter: "blur(3px)",
          });
        }

        gsap.set(content, {
          y: 26,
          opacity: 0,
          filter: "blur(5px)",
        });

        gsap.set(heading, {
          y: 20,
          opacity: 0,
          filter: "blur(5px)",
        });

        if (title) {
          gsap.set(title, {
            y: 14,
            opacity: 0,
            filter: "blur(4px)",
          });
        }

        if (address) {
          gsap.set(address, {
            y: 18,
            opacity: 0,
            filter: "blur(4px)",
          });
        }

        gsap.set(metaItems, {
          y: 16,
          opacity: 0,
          filter: "blur(4px)",
        });

        if (link) {
          gsap.set(link, {
            y: 12,
            opacity: 0,
          });
        }

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: accessElement,
            start: "top 72%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          scene,
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.out",
          },
          0
        );

        timeline.to(
          image,
          {
            xPercent: 0,
            scale: 1.035,
            filter:
              "blur(0.8px) brightness(0.6) contrast(1.06) saturate(0.82)",
            duration: 1.65,
            ease: "power3.out",
          },
          0
        );

        timeline.to(
          content,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          0.32
        );

        timeline.to(
          heading,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          0.4
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
            0.5
          );
        }

        if (address) {
          timeline.to(
            address,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.84,
              ease: "power3.out",
            },
            0.76
          );
        }

        timeline.to(
          metaItems,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.76,
            stagger: 0.11,
            ease: "power3.out",
          },
          0.92
        );

        if (link) {
          timeline.to(
            link,
            {
              y: 0,
              opacity: 1,
              duration: 0.76,
              ease: "power3.out",
            },
            1.18
          );
        }

        /*
          Footerの代わりになる小さなナビ。
          すべてが出たあと、最後に静かに残す。
        */
        if (navigation) {
          timeline.to(
            navigation,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
            },
            1.38
          );
        }

        /*
          スクロール通過中の微細なカメラ移動。
        */
        gsap.to(image, {
          xPercent: 1.25,
          scale: 1.075,
          ease: "none",

          scrollTrigger: {
            trigger: accessElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.25,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          gsap.set(animatedTargets, {
            clearProps: "all",
          });
        };
      }
    );

    /*
      SP：
      夜景を先に見せ、
      その下へ情報を落とす。
      左上ナビはCSS側で非表示。
    */
    media.add(
      "(max-width: 767px)",
      () => {
        gsap.set(scene, {
          opacity: 0,
          clipPath: "inset(5% 0% 8% 0%)",
        });

        gsap.set(image, {
          xPercent: -1,
          scale: 1.09,
          filter:
            "blur(2.5px) brightness(0.54) contrast(1.03) saturate(0.74)",
          transformOrigin: "center center",
        });

        gsap.set(content, {
          y: 24,
          opacity: 0,
          filter: "blur(5px)",
        });

        gsap.set(heading, {
          y: 20,
          opacity: 0,
          filter: "blur(5px)",
        });

        if (title) {
          gsap.set(title, {
            y: 14,
            opacity: 0,
            filter: "blur(4px)",
          });
        }

        if (address) {
          gsap.set(address, {
            y: 18,
            opacity: 0,
            filter: "blur(4px)",
          });
        }

        gsap.set(metaItems, {
          y: 16,
          opacity: 0,
          filter: "blur(4px)",
        });

        if (link) {
          gsap.set(link, {
            y: 12,
            opacity: 0,
          });
        }

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: accessElement,
            start: "top 84%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          scene,
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power3.out",
          },
          0
        );

        timeline.to(
          image,
          {
            xPercent: 0,
            scale: 1.035,
            filter:
              "blur(0.7px) brightness(0.68) contrast(1.04) saturate(0.82)",
            duration: 1.45,
            ease: "power3.out",
          },
          0
        );

        timeline.to(
          content,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
          },
          0.48
        );

        timeline.to(
          heading,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
          },
          0.56
        );

        if (title) {
          timeline.to(
            title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power3.out",
            },
            0.64
          );
        }

        if (address) {
          timeline.to(
            address,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power3.out",
            },
            0.86
          );
        }

        timeline.to(
          metaItems,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.74,
            stagger: 0.1,
            ease: "power3.out",
          },
          1.02
        );

        if (link) {
          timeline.to(
            link,
            {
              y: 0,
              opacity: 1,
              duration: 0.74,
              ease: "power3.out",
            },
            1.3
          );
        }

        gsap.to(image, {
          yPercent: 2.5,
          scale: 1.065,
          ease: "none",

          scrollTrigger: {
            trigger: accessElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          gsap.set(animatedTargets, {
            clearProps: "all",
          });
        };
      }
    );
  }, accessElement);

  const refreshFrame =
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  return () => {
    window.cancelAnimationFrame(
      refreshFrame
    );

    image.removeEventListener(
      "load",
      refreshScrollTrigger
    );

    media.revert();
    ctx.revert();
  };
}