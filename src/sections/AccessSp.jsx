import styles from "./AccessSp.module.css";

const ACCESS_INFO = {
  address: ["沖縄県那覇市松山 ○丁目○−○", "○○ビル 2F"],
  nearest: "美栄橋駅から徒歩○分",
  parking: "専用駐車場なし / 近隣コインパーキング",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=沖縄県那覇市松山",
};

const CLOSING_LINKS = [
  {
    label: "メニュー",
    href: "#menu",
  },
  {
    label: "店舗情報",
    href: "#information",
  },
  {
    label: "最初へ",
    href: "#top",
  },
];

export default function AccessSp() {
  return (
    <section
      className={styles.access}
      id="access"
      data-sp-scene="access"
      aria-labelledby="access-title"
      aria-describedby="access-summary"
    >
      <div className={styles.scene} aria-hidden="true">
        <img
          className={styles.sceneImage}
          src="/images/access-matsuyama.png"
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        />

        <span className={styles.sceneTone} />
        <span className={styles.sceneShade} />
        <span className={styles.sceneGrain} />
      </div>

      <div className={styles.content} data-sp-reveal>
        <header className={styles.heading}>
          <p className={styles.englishTitle}>Access</p>

          <h2 id="access-title" className={styles.title}>
            松山の夜へ。
          </h2>

          <p id="access-summary" className={styles.location}>
            MIZATOは、那覇・松山にあります。
          </p>
        </header>

        <address className={styles.address}>
          {ACCESS_INFO.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>最寄り</dt>
            <dd>{ACCESS_INFO.nearest}</dd>
          </div>

          <div className={styles.metaItem}>
            <dt>駐車場</dt>
            <dd>{ACCESS_INFO.parking}</dd>
          </div>
        </dl>

        <a
          className={styles.mapLink}
          href={ACCESS_INFO.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Mapsで場所を確認する
        </a>

        <nav className={styles.closingNav} aria-label="ページ内ナビゲーション">
          {CLOSING_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <small className={styles.creatorCredit}>
          <span>Web Design by</span>

          <a
            href="https://gushikendesign.com/"
            target="_blank"
            rel="author external noopener noreferrer"
            aria-label="GUSHIKEN DESIGNのWebサイトを見る"
          >
            GUSHIKEN DESIGN
          </a>
        </small>
      </div>
    </section>
  );
}
