import { useEffect, useRef } from "react";
import styles from "./SpAtmosphere.module.css";

const SCENE_TONES = {
  top: { red: 221, green: 145, blue: 78, soft: 0.08, faint: 0.025 },
  concept: { red: 173, green: 93, blue: 49, soft: 0.065, faint: 0.02 },
  signature: { red: 218, green: 151, blue: 91, soft: 0.082, faint: 0.024 },
  counter: { red: 147, green: 78, blue: 47, soft: 0.055, faint: 0.018 },
  menu: { red: 195, green: 130, blue: 74, soft: 0.075, faint: 0.023 },
  information: { red: 178, green: 110, blue: 63, soft: 0.06, faint: 0.019 },
  access: { red: 117, green: 82, blue: 72, soft: 0.05, faint: 0.016 },
};

function applyTone(world, sceneId) {
  const tone = SCENE_TONES[sceneId] ?? SCENE_TONES.top;

  world.style.setProperty("--sp-tone-r", String(tone.red));
  world.style.setProperty("--sp-tone-g", String(tone.green));
  world.style.setProperty("--sp-tone-b", String(tone.blue));
  world.style.setProperty("--sp-tone-soft", String(tone.soft));
  world.style.setProperty("--sp-tone-faint", String(tone.faint));
}

export default function SpAtmosphere() {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const world = atmosphere?.closest("[data-sp-world]");

    if (!atmosphere || !world) {
      return undefined;
    }

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const revealTargets = Array.from(
      world.querySelectorAll("[data-sp-reveal]")
    );

    let revealObserver;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => {
        target.dataset.spVisible = "true";
      });
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.dataset.spVisible = "true";
            revealObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -10% 0px",
        }
      );

      revealTargets.forEach((target) => revealObserver.observe(target));
    }

    const sections = Array.from(
      world.querySelectorAll("main > section[data-sp-scene]")
    );
    const visibleSections = new Map();

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target);
          }
        });

        const activeSection = Array.from(visibleSections.entries()).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0];

        if (!activeSection) {
          return;
        }

        const sceneId = activeSection.dataset.spScene || "top";
        world.dataset.spScene = sceneId;
        applyTone(world, sceneId);
      },
      {
        rootMargin: "-31% 0px -31% 0px",
        threshold: [0.01, 0.15, 0.35, 0.62],
      }
    );

    sections.forEach((section) => sceneObserver.observe(section));

    let frameId = 0;

    const syncScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const scrollable = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1
        );
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);

        world.style.setProperty("--sp-progress", progress.toFixed(4));
        world.style.setProperty(
          "--sp-glow-shift",
          `${(-3.5 * progress).toFixed(2)}vh`
        );

        frameId = 0;
      });
    };

    applyTone(world, "top");
    syncScroll();

    window.addEventListener("scroll", syncScroll, { passive: true });

    const readyFrame = window.requestAnimationFrame(() => {
      world.dataset.spReady = "true";
    });

    return () => {
      revealObserver?.disconnect();
      sceneObserver.disconnect();
      window.removeEventListener("scroll", syncScroll);
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(readyFrame);

      delete world.dataset.spReady;
      delete world.dataset.spScene;

      [
        "--sp-tone-r",
        "--sp-tone-g",
        "--sp-tone-b",
        "--sp-tone-soft",
        "--sp-tone-faint",
        "--sp-progress",
        "--sp-glow-shift",
      ].forEach((property) => world.style.removeProperty(property));
    };
  }, []);

  return (
    <div
      ref={atmosphereRef}
      className={styles.atmosphere}
      aria-hidden="true"
    >
      <span className={styles.glow} />
      <span className={styles.edgeShade} />
      <span className={styles.grain} />
    </div>
  );
}
