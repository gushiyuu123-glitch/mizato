import styles from "./InformationSp.module.css";

const informationItems = [
  {
    labelEn: "Open",
    labelJa: "営業時間",
    value: "19:00 — 02:00",
  },
  {
    labelEn: "Closed",
    labelJa: "定休日",
    value: "日曜日",
  },
  {
    labelEn: "Seats",
    labelJa: "席数",
    value: "カウンター8席 / テーブル2卓",
  },
  {
    labelEn: "Charge",
    labelJa: "チャージ",
    value: "800円",
  },
  {
    labelEn: "Payment",
    labelJa: "お支払い",
    value: "現金・クレジットカード",
  },
  {
    labelEn: "Smoking",
    labelJa: "喫煙",
    value: "喫煙可",
  },
];

export default function InformationSp() {
  return (
    <section
      className={styles.information}
      id="information"
      data-sp-scene="information"
      aria-labelledby="information-title"
      aria-describedby="information-summary"
    >
      <div className={styles.visual} data-sp-reveal>
        <img
          className={styles.entranceImage}
          src="/images/information-entrance.png"
          alt="暖簾の奥に見えるMIZATOのカウンター"
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        <span className={styles.imageShade} aria-hidden="true" />
        <span
          className={`${styles.doorPanel} ${styles.doorPanelLeft}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.doorPanel} ${styles.doorPanelRight}`}
          aria-hidden="true"
        />

        <header className={styles.intro}>
          <p className={styles.englishTitle}>Information</p>

          <h2 id="information-title" className={styles.title}>
            ご来店の前に。
          </h2>

          <p id="information-summary" className={styles.introCopy}>
            営業時間やお席、チャージについて
            <br />
            ご案内します。
          </p>
        </header>
      </div>

      <dl className={styles.list} data-sp-reveal>
        {informationItems.map((item) => (
          <div key={item.labelEn} className={styles.item}>
            <dt className={styles.label}>
              <span className={styles.labelJapanese}>{item.labelJa}</span>
              <span className={styles.labelEnglish} aria-hidden="true">
                {item.labelEn}
              </span>
            </dt>

            <dd className={styles.value}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
