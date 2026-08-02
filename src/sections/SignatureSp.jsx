import styles from "./SignatureSp.module.css";

const glassItems = [
  {
    name: "Awamori",
    japanese: "泡盛",
    copy: "定番から古酒まで、島の酒を一杯ずつ。",
    image: "/images/signature-awamori.png",
    alt: "泡盛を注いだグラス",
  },
  {
    name: "Whiskey",
    japanese: "ウイスキー",
    copy: "シングルモルトや国産を、好みの飲み方で。",
    image: "/images/signature-whiskey.png",
    alt: "琥珀色のウイスキーグラス",
  },
  {
    name: "Cocktail",
    japanese: "カクテル",
    copy: "定番と季節の一杯を、その日の気分に合わせて。",
    image: "/images/signature-cocktail.png",
    alt: "MIZATOのカクテルグラス",
  },
];

export default function SignatureSp() {
  return (
    <section
      className={styles.signature}
      id="signature"
      data-sp-scene="signature"
      aria-labelledby="signature-title"
      aria-describedby="signature-summary"
    >
      <header className={styles.header} data-sp-reveal>
        <h2 id="signature-title" className={styles.heading}>
          <span className={styles.srOnly}>In the Glass</span>

          <img
            className={styles.headingImage}
            src="/images/in-the-glass.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </h2>

        <p id="signature-summary" className={styles.summary}>
          三つの酒を、その夜の温度で。
        </p>
      </header>

      <div
        className={styles.glassRail}
        role="list"
        aria-label="MIZATOで楽しめるお酒"
        data-sp-reveal
      >
        {glassItems.map((item) => (
          <article
            key={item.name}
            className={styles.glassItem}
            role="listitem"
          >
            <div className={styles.imageShell}>
              <span className={styles.glassGlow} aria-hidden="true" />

              <img
                className={styles.itemImage}
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>

            <div className={styles.itemMeta}>
              <p className={styles.itemJapanese}>{item.japanese}</p>
              <h3 className={styles.itemTitle}>{item.name}</h3>
              <p className={styles.itemCopy}>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
