// src/sections/Signature.jsx

import { useLayoutEffect, useRef } from "react";
import { setupSignatureReveal } from "../effects/setupSignatureReveal.js";
import styles from "./Signature.module.css";

const glassItems = [
  {
    name: "Awamori",
    copy: "透明な一杯に、島の余韻。",
    image: "/images/signature-awamori.png",
    alt: "泡盛を注いだグラス",
  },
  {
    name: "Whiskey",
    copy: "琥珀の奥に、夜が沈む。",
    image: "/images/signature-whiskey.png",
    alt: "琥珀色のウイスキーグラス",
  },
  {
    name: "Cocktail",
    copy: "香りのあとに、輪郭が残る。",
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
            />
          </span>
        </h2>

        <span
          className={styles.headingLine}
          data-signature-line
          aria-hidden="true"
        />
      </header>

      <div className={styles.glassArea}>
        {glassItems.map((item, index) => (
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
                data-signature-parallax
              />

              <span className={styles.itemNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
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
