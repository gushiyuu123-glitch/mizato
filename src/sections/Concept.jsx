import { useLayoutEffect, useRef } from "react";
import { setupConceptReveal } from "../effects/setupConceptReveal.js";
import styles from "./Concept.module.css";

export default function Concept() {
  const conceptRef = useRef(null);

  useLayoutEffect(() => {
    return setupConceptReveal(conceptRef.current);
  }, []);

  return (
    <section
      ref={conceptRef}
      className={styles.concept}
      id="concept"
      aria-labelledby="concept-title"
    >
      <h2 id="concept-title" className={styles.axisHeading}>
        <span className={styles.srOnly}>Take a Seat</span>

        <span className={styles.axisReveal} aria-hidden="true">
          <img
            data-concept-axis
            className={styles.axisImage}
            src="/images/take-a-seat.svg"
            alt=""
          />
        </span>
      </h2>

      <span
        className={styles.dividerLine}
        data-concept-divider
        aria-hidden="true"
      />

      <div className={styles.copyBlock} data-concept-copy>
        <p className={styles.kicker}>A quieter side of Naha</p>

        <h3 className={styles.copyTitle}>
          After the noise,
          <br />
          a quieter night.
        </h3>

        <div className={styles.copyLines}>
          <p
            className={`${styles.copyLine} ${styles.line01}`}
            data-concept-copy-line
          >
            扉の向こうは、音のない世界。
          </p>

          <p
            className={`${styles.copyLine} ${styles.line02}`}
            data-concept-copy-line
          >
            グラスを傾けるたび、
          </p>

          <p
            className={`${styles.copyLine} ${styles.line03}`}
            data-concept-copy-line
          >
            時間の輪郭がほどけていく。
          </p>

          <p
            className={`${styles.copyLine} ${styles.line04}`}
            data-concept-copy-line
          >
            ここは、大人のための隠れ家バー。
          </p>
        </div>
      </div>
    </section>
  );
}
