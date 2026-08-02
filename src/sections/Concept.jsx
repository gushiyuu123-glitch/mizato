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
      aria-describedby="concept-summary"
    >
      <h2 id="concept-title" className={styles.axisHeading}>
        <span className={styles.srOnly}>Take a Seat</span>

        <span className={styles.axisReveal} aria-hidden="true">
          <img
            data-concept-axis
            className={styles.axisImage}
            src="/images/take-a-seat.svg"
            alt=""
            draggable="false"
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

        <div id="concept-summary" className={styles.copyLines}>
          <p
            className={`${styles.copyLine} ${styles.line01}`}
            data-concept-copy-line
          >
            那覇・松山の喧騒から、少し離れた場所。
          </p>

          <p
            className={`${styles.copyLine} ${styles.line02}`}
            data-concept-copy-line
          >
            泡盛、ウイスキー、カクテルを、
          </p>

          <p
            className={`${styles.copyLine} ${styles.line03}`}
            data-concept-copy-line
          >
            落ち着いたカウンターで楽しめます。
          </p>

          <p
            className={`${styles.copyLine} ${styles.line04}`}
            data-concept-copy-line
          >
            一人でも、会話を楽しむ夜にも。
          </p>
        </div>
      </div>
    </section>
  );
}
