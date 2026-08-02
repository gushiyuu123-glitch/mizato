// src/sections/Counter.jsx

import { useEffect, useLayoutEffect, useRef } from "react";
import { setupCounterReveal } from "../effects/setupCounterReveal.js";
import styles from "./CounterSp.module.css";

export default function CounterSp() {
  const counterRef = useRef(null);
  const videoRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    return setupCounterReveal(counterRef.current);
  }, []);

  useEffect(() => {
    const counter = counterRef.current;
    const video = videoRef.current;

    if (!counter || !video) {
      return undefined;
    }

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const revealMedia = () => {
      counter.classList.add(styles.isMediaVisible);
    };

    if (reduceMotion) {
      revealMedia();
      video.pause();

      return () => {
        counter.classList.remove(styles.isMediaVisible);
      };
    }

    const playVideoOnce = () => {
      if (hasPlayedRef.current) {
        revealMedia();
        return;
      }

      hasPlayedRef.current = true;
      revealMedia();

      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise?.catch) {
        playPromise.catch(() => {
          /*
            自動再生が止められた場合も、
            静止画として映像の先頭フレームは残す。
          */
          video.pause();
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        playVideoOnce();
        observer.disconnect();
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(counter);

    return () => {
      observer.disconnect();
      video.pause();
      counter.classList.remove(styles.isMediaVisible);
    };
  }, []);

  return (
    <section
      ref={counterRef}
      className={styles.counter}
      id="countersp"
      aria-labelledby="counter-title"
      aria-describedby="counter-description"
    >
      <div className={styles.mediaStage}>
        <video
          ref={videoRef}
          className={styles.counterVideo}
          src="/videos/counter.mp4"
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
        />

        <span className={styles.mediaVeil} aria-hidden="true" />

        <p id="counter-description" className={styles.caption}>
          会話の間に、
          <br />
          グラスの音だけが残る。
        </p>
      </div>

      <h2 id="counter-title" className={styles.axisHeading}>
        <span className={styles.srOnly}>At the Counter</span>

        <span
          className={styles.axisReveal}
          data-counter-axis
          aria-hidden="true"
        >
          <img
            className={styles.axisImage}
            src="/images/at-the-counter.svg"
            alt=""
            draggable="false"
          />
        </span>
      </h2>
    </section>
  );
}
