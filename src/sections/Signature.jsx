// src/sections/Signature.jsx

import { useLayoutEffect, useRef } from "react";
import { setupSignatureReveal } from "../effects/setupSignatureReveal.js";
import styles from "./Signature.module.css";

const glassItems = [
  {
    name: "Awamori",
    copy: "定番から古酒まで、島の酒を一杯ずつ。",
    image: "/images/signature-awamori.png",
    alt: "泡盛を注いだグラス",
  },
  {
    name: "Whiskey",
    copy: "シングルモルトや国産を、好みの飲み方で。",
    image: "/images/signature-whiskey.png",
    alt: "琥珀色のウイスキーグラス",
  },
  {
    name: "Cocktail",
    copy: "定番と季節の一杯を、その日の気分に合わせて。",
    image: "/images/signature-cocktail.png",
    alt: "MIZATOのカクテルグラス",
  },
];

export default function Signature() {
  const signatureRef = useRef(null);

  useLayoutEffect(() => {
    return setupSignatureReveal(signatureRef.current);
  }, []);

  return (
    <section
      ref={signatureRef}
      className={styles.signature}
      id="signature"
      aria-labelledby="signature-title"
      aria-describedby="signature-summary"
    >
      <header className={styles.header}>
        <h2 id="signature-title" className={styles.heading}>
          <span className={styles.srOnly}>In the Glass</span>

          <span
            className={styles.headingReveal}
            data-signature-heading
            aria-hidden="true"
          >
            <img
              className={styles.headingImage}
              src="/images/in-the-glass.svg"
              alt=""
              draggable="false"
            />
          </span>
        </h2>

        <span
          className={styles.headingLine}
          data-signature-line
          aria-hidden="true"
        />

        <p
          id="signature-summary"
          className="sectionContext signatureContext"
        >
          泡盛・ウイスキー・カクテルを中心にご用意しています。
        </p>
      </header>

      <div className={styles.glassArea}>
        {glassItems.map((item) => (
          <article
            key={item.name}
            className={styles.glassItem}
            data-signature-item
          >
            <div className={styles.imageShell}>
              <img
                className={styles.itemImage}
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
                data-signature-parallax
              />
            </div>

            <div className={styles.itemMeta}>
              <h3 className={styles.itemTitle}>{item.name}</h3>
              <p className={styles.itemCopy}>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
