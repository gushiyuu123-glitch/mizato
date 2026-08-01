import { useLayoutEffect, useRef } from "react";
import HeroLiquidCanvas from "../effects/HeroLiquidCanvas.jsx";
import { setupHeroParallax } from "../effects/setupHeroParallax.js";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    return setupHeroParallax(heroRef.current);
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <HeroLiquidCanvas
        className={styles.liquidCanvas}
        image="/images/hero-counter.jpeg"
      />

      <a
        className={styles.reserveLink}
        href="#reserve"
        aria-label="Reserve a seat"
      >
        Reserve a seat
      </a>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          Cocktail & Awamori / Matsuyama, Naha
        </p>

        <h1 className={styles.logo}>
          <span className={styles.srOnly}>MIZATO</span>
          <span className={styles.logoMark} aria-hidden="true">
            <img
              className={styles.logoImage}
              src="/images/mizato-logo.svg"
              alt=""
            />
          </span>
        </h1>

        <p className={styles.copy}>表の那覇を、少し離れて。</p>

        <p className={styles.lead}>
          那覇・松山。Barのカウンターで、
          <br />
          夜の余韻の一杯を。
        </p>

        <p className={styles.openMeta}>OPEN 19:00 - 02:00</p>
      </div>
    </section>
  );
}