import HeroLiquidCanvas from "../effects/HeroLiquidCanvas.jsx";
import styles from "./HeroSp.module.css";

export default function HeroSp() {
  return (
    <section
      id="top"
      className={styles.hero}
      data-sp-scene="top"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-hours"
    >
      <HeroLiquidCanvas
        className={styles.liquidCanvas}
        image="/images/hero-counter.jpeg"
      />

      <span className={styles.imageTone} aria-hidden="true" />

      <div className={styles.topMeta} aria-hidden="true">
        <span>那覇・松山</span>
        <span>19:00 — 02:00</span>
      </div>

      <div className={styles.inner}>
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
      </div>

      <div className={styles.footer}>
        <p id="hero-description" className={styles.lead}>
          泡盛、ウイスキー、カクテルを。
          <br />
          松山のカウンターで、静かな夜を。
        </p>

        <a className={styles.visitLink} href="#information">
          ご来店案内
        </a>
      </div>

      <p id="hero-hours" className={styles.srOnly}>
        営業時間は19時から翌2時、定休日は日曜日です。
      </p>

      <span className={styles.scrollLine} aria-hidden="true" />
    </section>
  );
}
