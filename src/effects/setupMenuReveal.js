// src/effects/setupMenuReveal.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOOP = () => {};

export function setupMenuReveal(menuElement) {
  if (!menuElement || typeof window === "undefined") {
    return NOOP;
  }

  const intro = menuElement.querySelector("[data-menu-intro]");
  const menuTitle = menuElement.querySelector("[data-menu-title]");
  const menuTitleImage = menuTitle?.querySelector("img");

  const introEnglish = menuElement.querySelector(
    "[data-menu-intro-english]"
  );

  const introCopy = menuElement.querySelector(
    "[data-menu-intro-copy]"
  );

  const book = menuElement.querySelector("[data-menu-book]");
  const cover = menuElement.querySelector("[data-menu-cover]");
  const hint = menuElement.querySelector("[data-menu-hint]");

  const pages = Array.from(
    menuElement.querySelectorAll("[data-menu-page]")
  );

  if (!book || !cover || !pages.length) {
    return NOOP;
  }

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches ?? false;

  const pageData = pages.map((page) => ({
    page,

    title: page.querySelector(
      "[data-menu-page-title]"
    ),

    items: Array.from(
      page.querySelectorAll("[data-menu-item]")
    ),
  }));

  const introTargets = [
    menuTitle,
    menuTitleImage,
    introEnglish,
    introCopy,
  ].filter(Boolean);

  const allAnimatedTargets = [
    book,
    cover,
    hint,
    ...introTargets,
    ...pages,

    ...pageData.flatMap(({ title, items }) => [
      title,
      ...items,
    ]),
  ].filter(Boolean);

  if (reduceMotion) {
    menuElement.setAttribute(
      "data-menu-static",
      "true"
    );

    gsap.set(allAnimatedTargets, {
      clearProps: "all",
    });

    return () => {
      gsap.set(allAnimatedTargets, {
        clearProps: "all",
      });

      menuElement.removeAttribute(
        "data-menu-static"
      );
    };
  }

  const media = gsap.matchMedia();

  const ctx = gsap.context(() => {
    /*
      PC：
      MENU見出しを出しながら本を浮かせ、
      1カテゴリーずつページをめくる。
    */
    media.add(
      "(min-width: 768px)",
      () => {
        menuElement.removeAttribute(
          "data-menu-static"
        );

        const firstPage = pageData[0];
        const secondPage = pageData[1];
        const thirdPage = pageData[2];

        /*
          左のMENU SVG。
        */
        if (menuTitle) {
          gsap.set(menuTitle, {
            clipPath: "inset(0% 100% 0% 0%)",
            opacity: 0.92,
          });
        }

        if (menuTitleImage) {
          gsap.set(menuTitleImage, {
            x: -18,
            opacity: 0,
            filter: "blur(4px)",
          });
        }

        if (introEnglish || introCopy) {
          gsap.set(
            [introEnglish, introCopy].filter(Boolean),
            {
              y: 10,
              opacity: 0,
              filter: "blur(3px)",
            }
          );
        }

        /*
          閉じた本。
          CSS側のleftで全体を右へ寄せている。
        */
        gsap.set(book, {
          xPercent: -25,
          y: 54,
          scale: 0.92,
          rotateX: 4,
          opacity: 0,
          transformOrigin: "center center",
        });

        gsap.set(cover, {
          rotateY: 0,
          zIndex: 50,
          transformOrigin: "left center",
        });

        gsap.set(pages, {
          rotateY: 0,
          transformOrigin: "left center",
        });

        pages.forEach((page, index) => {
          gsap.set(page, {
            zIndex: 30 - index * 10,
          });
        });

        pageData.forEach(({ title, items }) => {
          if (title) {
            gsap.set(title, {
              y: 18,
              opacity: 0,
              filter: "blur(5px)",
            });
          }

          if (items.length) {
            gsap.set(items, {
              x: 34,
              opacity: 0,
              filter: "blur(4px)",
            });
          }
        });

        if (hint) {
          gsap.set(hint, {
            y: 8,
            opacity: 0,
          });
        }

        const timeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },

          scrollTrigger: {
            trigger: menuElement,
            start: "top top",
            end: "+=380%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /*
          MENU SVG。
        */
        if (menuTitle) {
          timeline.to(
            menuTitle,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.05,
              ease: "power3.out",
            },
            0
          );
        }

        if (menuTitleImage) {
          timeline.to(
            menuTitleImage,
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.95,
              ease: "power3.out",
            },
            0.08
          );
        }

        if (introEnglish || introCopy) {
          timeline.to(
            [introEnglish, introCopy].filter(Boolean),
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.13,
              ease: "power3.out",
            },
            0.38
          );
        }

        /*
          本が背景のバー空間から浮かぶ。
        */
        timeline.to(
          book,
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          0
        );

        if (hint) {
          timeline.to(
            hint,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            0.25
          );
        }

        /*
          表紙が左へ開く。
          開いた後もCSS側の右寄せ位置は維持される。
        */
        timeline
          .to(
            book,
            {
              xPercent: 0,
              duration: 1.45,
              ease: "power2.inOut",
            },
            0.75
          )
          .to(
            cover,
            {
              rotateY: -178,
              duration: 1.45,
              ease: "power2.inOut",
            },
            0.75
          )
          .set(
            cover,
            {
              zIndex: 1,
            },
            2.21
          );

        if (hint) {
          timeline.to(
            hint,
            {
              opacity: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            1.45
          );
        }

        /*
          AWAMORI
        */
        if (firstPage?.title) {
          timeline.to(
            firstPage.title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
            },
            2.05
          );
        }

        if (firstPage?.items.length) {
          timeline.to(
            firstPage.items,
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.72,
              stagger: 0.13,
              ease: "power3.out",
            },
            2.35
          );
        }

        /*
          AWAMORIページを左へめくる。
        */
        if (pages[0]) {
          timeline
            .to(
              pages[0],
              {
                rotateY: -178,
                duration: 1.45,
                ease: "power2.inOut",
              },
              4.2
            )
            .set(
              pages[0],
              {
                zIndex: 5,
              },
              5.66
            );
        }

        /*
          WHISKEY
        */
        if (secondPage?.title) {
          timeline.to(
            secondPage.title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
            },
            5.35
          );
        }

        if (secondPage?.items.length) {
          timeline.to(
            secondPage.items,
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.72,
              stagger: 0.13,
              ease: "power3.out",
            },
            5.65
          );
        }

        /*
          WHISKEYページを左へめくる。
        */
        if (pages[1]) {
          timeline
            .set(
              pages[1],
              {
                zIndex: 30,
              },
              7.45
            )
            .to(
              pages[1],
              {
                rotateY: -178,
                duration: 1.45,
                ease: "power2.inOut",
              },
              7.45
            );
        }

        /*
          COCKTAIL
        */
        if (thirdPage?.title) {
          timeline.to(
            thirdPage.title,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
            },
            8.65
          );
        }

        if (thirdPage?.items.length) {
          timeline.to(
            thirdPage.items,
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.72,
              stagger: 0.13,
              ease: "power3.out",
            },
            8.95
          );
        }

        return () => {
          gsap.set(allAnimatedTargets, {
            clearProps: "all",
          });
        };
      }
    );

    /*
      SP：
      本の3Dページめくりを使用せず、
      表紙と各カテゴリーを縦に読む。
    */
    media.add(
      "(max-width: 767px)",
      () => {
        menuElement.setAttribute(
          "data-menu-static",
          "true"
        );

        gsap.set(allAnimatedTargets, {
          clearProps: "all",
        });

        const targets = [
          intro,
          cover,
          ...pages,
        ].filter(Boolean);

        targets.forEach((target) => {
          gsap.fromTo(
            target,
            {
              y: 42,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",

              scrollTrigger: {
                trigger: target,
                start: "top 86%",
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        return () => {
          gsap.set(targets, {
            clearProps: "all",
          });

          menuElement.removeAttribute(
            "data-menu-static"
          );
        };
      }
    );
  }, menuElement);

  const refreshFrame =
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

  return () => {
    window.cancelAnimationFrame(
      refreshFrame
    );

    media.revert();
    ctx.revert();

    menuElement.removeAttribute(
      "data-menu-static"
    );
  };
}