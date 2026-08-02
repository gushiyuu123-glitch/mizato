// src/sections/Information.jsx

import { useLayoutEffect, useRef } from "react";
import { setupInformationReveal } from "../effects/setupInformationReveal.js";
import styles from "./Information.module.css";

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

export default function Information() {
  const informationRef = useRef(null);

  useLayoutEffect(() => {
    return setupInformationReveal(informationRef.current);
  }, []);

  return (
    <section
      ref={informationRef}
      className={styles.information}
      id="information"
      aria-labelledby="information-title"
    >
      <div className={styles.inner}>
        <div className={styles.leftPanel}>
          <figure
            className={styles.entranceFigure}
            data-information-visual
          >
            <img
              className={styles.entranceImage}
              src="/images/information-entrance.png"
              alt="暖簾の奥に見えるMIZATOのカウンター"
              data-information-image
            />

            <span
              className={styles.imageShade}
              aria-hidden="true"
            />

            <span
              className={`${styles.doorPanel} ${styles.doorPanelLeft}`}
              data-information-door-left
              aria-hidden="true"
            />

            <span
              className={`${styles.doorPanel} ${styles.doorPanelRight}`}
              data-information-door-right
              aria-hidden="true"
            />
          </figure>

          <header
            className={styles.intro}
            data-information-intro
          >
            <h2
              id="information-title"
              className={styles.title}
              data-information-title
            >
              Information
            </h2>

            <p className={styles.introCopy}>
              ご来店の前に。
              <br />
              営業時間やお席についてご案内します。
            </p>
          </header>
        </div>

        <span
          className={styles.divider}
          data-information-divider
          aria-hidden="true"
        />

        <dl className={styles.list}>
          {informationItems.map((item) => (
            <div
              key={item.labelEn}
              className={styles.item}
              data-information-item
            >
              <dt className={styles.label}>
                <span className={styles.labelEnglish}>
                  {item.labelEn}
                </span>

                <span className={styles.labelJapanese}>
                  {item.labelJa}
                </span>
              </dt>

              <dd className={styles.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
