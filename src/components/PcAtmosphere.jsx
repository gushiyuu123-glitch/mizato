import { useEffect, useRef } from "react";
import styles from "./PcAtmosphere.module.css";

const SCENE_TONES = {
  top: { red: 222, green: 145, blue: 76, strength: 0.22 },
  concept: { red: 194, green: 116, blue: 58, strength: 0.15 },
  signature: { red: 218, green: 150, blue: 88, strength: 0.19 },
  counter: { red: 184, green: 111, blue: 62, strength: 0.14 },
  menu: { red: 205, green: 132, blue: 72, strength: 0.18 },
  information: { red: 190, green: 119, blue: 67, strength: 0.14 },
  access: { red: 145, green: 102, blue: 82, strength: 0.11 },
};

function setTone(root, sceneId) {
  const tone = SCENE_TONES[sceneId] ?? SCENE_TONES.top;

  root.style.setProperty("--pc-tone-r", String(tone.red));
  root.style.setProperty("--pc-tone-g", String(tone.green));
  root.style.setProperty("--pc-tone-b", String(tone.blue));
  root.style.setProperty("--pc-tone-strength", String(tone.strength));
}

export default function PcAtmosphere() {
  const atmosphereRef = useRef(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const world = atmosphere?.closest("[data-pc-world]");

    if (!atmosphere || !world) {
      return undefined;
    }

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const pointer = {
      currentX: window.innerWidth * 0.58,
      currentY: window.innerHeight * 0.42,
      targetX: window.innerWidth * 0.58,
      targetY: window.innerHeight * 0.42,
    };

    let frameId = 0;

    const renderPointer = () => {
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.075;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.075;

      world.style.setProperty("--pc-pointer-x", `${pointer.currentX}px`);
      world.style.setProperty("--pc-pointer-y", `${pointer.currentY}px`);

      frameId = window.requestAnimationFrame(renderPointer);
    };

    const handlePointerMove = (event) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      world.dataset.pcPointer = "active";
    };

    const handlePointerLeave = () => {
      pointer.targetX = window.innerWidth * 0.58;
      pointer.targetY = window.innerHeight * 0.42;
      world.dataset.pcPointer = "idle";
    };

    const syncScroll = () => {
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);

      world.style.setProperty("--pc-scroll-progress", String(progress));
    };

    const sections = Array.from(world.querySelectorAll("main > section"));
    const visibleSections = new Map();

    const sectionObserver = new IntersectionObserver(
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

        const sceneId = activeSection.id || "top";
        world.dataset.pcScene = sceneId;
        setTone(world, sceneId);
      },
      {
        rootMargin: "-27% 0px -27% 0px",
        threshold: [0.05, 0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    setTone(world, "top");
    syncScroll();

    window.addEventListener("scroll", syncScroll, { passive: true });

    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      document.documentElement.addEventListener(
        "mouseleave",
        handlePointerLeave
      );
      frameId = window.requestAnimationFrame(renderPointer);
    }

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave
      );
      window.cancelAnimationFrame(frameId);

      delete world.dataset.pcPointer;
      delete world.dataset.pcScene;

      [
        "--pc-pointer-x",
        "--pc-pointer-y",
        "--pc-scroll-progress",
        "--pc-tone-r",
        "--pc-tone-g",
        "--pc-tone-b",
        "--pc-tone-strength",
      ].forEach((property) => world.style.removeProperty(property));
    };
  }, []);

  return (
    <div ref={atmosphereRef} className={styles.atmosphere} aria-hidden="true">
      <span className={styles.pointerLight} />
      <span className={styles.horizonLight} />
      <span className={styles.edgeShade} />
      <span className={styles.grain} />
    </div>
  );
}
