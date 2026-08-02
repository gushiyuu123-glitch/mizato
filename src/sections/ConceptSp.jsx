import styles from "./ConceptSp.module.css";

export default function ConceptSp() {
  return (
    <section
      className={styles.concept}
      id="concept"
      data-sp-scene="concept"
      aria-labelledby="concept-title"
      aria-describedby="concept-summary"
    >
      <header className={styles.heading} data-sp-reveal>
        <h2 id="concept-title" className={styles.axisHeading}>
          <span className={styles.srOnly}>Take a Seat</span>

          <img
            className={styles.axisImage}
            src="/images/take-a-seat.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </h2>

        <p className={styles.kicker}>那覇の音が、少し遠くなる。</p>
      </header>

      <figure className={styles.visual} data-sp-reveal>
        <img
          className={styles.visualImage}
          src="/images/hero-counter.jpeg"
          alt="MIZATOの静かなカウンター"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <span className={styles.visualShade} aria-hidden="true" />
      </figure>

      <div className={styles.copyBlock} data-sp-reveal>
        <p className={styles.statement}>
          席に着くまで、
          <br />
          夜は少しずつ静かになる。
        </p>

        <div id="concept-summary" className={styles.copyLines}>
          <p>
            那覇・松山の喧騒から、
            <br />
            ほんの少し離れた場所。
          </p>

          <p>
            一人で過ごす夜にも、
            <br />
            誰かと話したい夜にも。
          </p>
        </div>
      </div>
    </section>
  );
}
