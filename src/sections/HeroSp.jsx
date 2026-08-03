import { useLayoutEffect, useRef } from "react";
import { setupHeroParallax } from "../effects/setupHeroParallax.js";
import styles from "./HeroSp.module.css";

export default function HeroSp() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    return setupHeroParallax(heroRef.current);
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-hours"
    >
      <div
        className={styles.liquidCanvas}
        aria-hidden="true"
        style={{
          backgroundImage: 'url("/images/hero-counter-sp-v3.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.12) saturate(1.02)",
        }}
      />

      <a
        className={styles.reserveLink}
        href="#information"
        aria-label="営業時間や店舗情報を見る"
      >
        Before your visit
      </a>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          Cocktail &amp; Awamori / Matsuyama, Naha
        </p>

        <h1 id="hero-title" className={styles.logo}>
          <span className={styles.srOnly}>
            MIZATO｜那覇・松山のバー
          </span>

          <span className={styles.logoMark} aria-hidden="true">
            <img
              className={styles.logoImage}
              src="/images/mizato-logo.svg"
              alt=""
              fetchPriority="high"
              draggable="false"
            />
          </span>
        </h1>

        <p className={styles.copy}>表の那覇を、少し離れて。</p>

        <p id="hero-description" className={styles.lead}>
          那覇・松山のカウンターで、
          <br />
          泡盛、ウイスキー、カクテルを。
        </p>

        <p id="hero-hours" className={styles.openMeta}>
          OPEN 19:00 — 02:00 / CLOSED SUN
        </p>
      </div>
    </section>
  );
}
