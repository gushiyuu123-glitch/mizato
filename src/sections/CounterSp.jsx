import { useEffect, useRef } from "react";
import styles from "./CounterSp.module.css";

export default function CounterSp() {
  const counterRef = useRef(null);
  const videoRef = useRef(null);
  const hasPlayedRef = useRef(false);

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

      playPromise?.catch?.(() => {
        video.pause();
      });
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
        threshold: 0.18,
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
      id="counter"
      data-sp-scene="counter"
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

        <h2
          id="counter-title"
          className={styles.axisHeading}
          data-sp-reveal
        >
          <span className={styles.srOnly}>At the Counter</span>

          <img
            className={styles.axisImage}
            src="/images/at-the-counter.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </h2>

        <p
          id="counter-description"
          className={styles.caption}
          data-sp-reveal
        >
          会話の間に、
          <br />
          グラスの音だけが残る。
        </p>

        <span className={styles.counterLine} aria-hidden="true" />
      </div>
    </section>
  );
}
