// src/sections/Access.jsx

import { useLayoutEffect, useRef } from "react";
import { setupAccessReveal } from "../effects/setupAccessReveal.js";
import styles from "./AccessSp.module.css";

const ACCESS_INFO = {
  address: [
    "沖縄県那覇市松山 ○丁目○−○",
    "○○ビル 2F",
  ],
  nearest: "美栄橋駅から徒歩○分",
  parking: "専用駐車場なし / 近隣コインパーキング",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=沖縄県那覇市松山",
};

const CLOSING_LINKS = [
  {
    label: "Menu",
    href: "#menu",
  },
  {
    label: "Concept",
    href: "#concept",
  },
  {
    label: "Information",
    href: "#information",
  },
];

export default function AccessSp() {
  const accessRef = useRef(null);

  useLayoutEffect(() => {
    return setupAccessReveal(accessRef.current);
  }, []);

  return (
    <section
      ref={accessRef}
      className={styles.access}
      id="accessap"
      aria-labelledby="access-title"
      aria-describedby="access-summary"
    >
      <div
        className={styles.scene}
        data-access-scene
        aria-hidden="true"
      >
        <img
          className={styles.sceneImage}
          src="/images/access-matsuyama.png"
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
          data-access-image
        />

        <span className={styles.sceneTone} />
        <span className={styles.sceneShade} />
        <span className={styles.sceneGrain} />
      </div>

      <nav
        className={styles.closingNav}
        aria-label="ページ内ナビゲーション"
        data-access-nav
      >
        {CLOSING_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.inner}>
        <div
          className={styles.spacer}
          aria-hidden="true"
        />

        <div
          className={styles.content}
          data-access-content
        >
          <header
            className={styles.heading}
            data-access-heading
          >
            <h2
              id="access-title"
              className={styles.title}
              data-access-title
            >
              Access
            </h2>

            <p id="access-summary" className={styles.location}>
              那覇・松山にあります。
            </p>
          </header>

          <address
            className={styles.address}
            data-access-address
          >
            {ACCESS_INFO.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>

          <dl className={styles.meta}>
            <div
              className={styles.metaItem}
              data-access-meta
            >
              <dt>最寄り</dt>
              <dd>{ACCESS_INFO.nearest}</dd>
            </div>

            <div
              className={styles.metaItem}
              data-access-meta
            >
              <dt>駐車場</dt>
              <dd>{ACCESS_INFO.parking}</dd>
            </div>
          </dl>

          <a
            className={styles.mapLink}
            href={ACCESS_INFO.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-access-link
          >
            Google Mapsで場所を確認する
          </a>

          <small className="creatorCredit">
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
      </div>
    </section>
  );
}
