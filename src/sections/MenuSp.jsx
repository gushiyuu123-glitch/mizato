// src/sections/MenuSp.jsx

import { useLayoutEffect, useRef } from "react";
import { setupMenuReveal } from "../effects/setupMenuReveal.js";
import styles from "./MenuSp.module.css";

const menuCategories = [
  {
    name: "Awamori",
    japanese: "泡盛",
    phrase: "島の酒を、夜の温度で。",
    backCopy: "A quiet spirit from the islands.",
    items: [
      { name: "島のブレンド", price: "¥900" },
      { name: "琉球古酒 三十度", price: "¥1,100" },
      { name: "甕熟成 古酒", price: "¥1,300" },
      { name: "泡盛ハイボール", price: "¥900" },
    ],
  },
  {
    name: "Whiskey",
    japanese: "ウイスキー",
    phrase: "琥珀の奥へ、静かに沈む。",
    backCopy: "Amber, oak, and the depth of night.",
    items: [
      { name: "Single Malt", price: "¥1,200" },
      { name: "Japanese Whisky", price: "¥1,400" },
      { name: "Bourbon", price: "¥1,000" },
      { name: "Highball", price: "¥1,100" },
    ],
  },
  {
    name: "Cocktail",
    japanese: "カクテル",
    phrase: "香りと余韻を、一杯の中に。",
    backCopy: "A drink shaped around the night.",
    items: [
      { name: "MIZATO Original", price: "¥1,300" },
      { name: "Seasonal Cocktail", price: "¥1,200" },
      { name: "Old Fashioned", price: "¥1,200" },
      { name: "Gin & Tonic", price: "¥1,000" },
    ],
  },
];

export default function MenuSp() {
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    return setupMenuReveal(menuRef.current);
  }, []);

  return (
    <section
      ref={menuRef}
      className={styles.menu}
      id="menu"
      aria-labelledby="menu-title"
      aria-describedby="menu-summary"
    >
      <div className={styles.intro} data-menu-intro>
        <h2 id="menu-title" className={styles.introTitle}>
          <span className={styles.srOnly}>Menu</span>

          <span
            className={styles.introTitleReveal}
            data-menu-title
            aria-hidden="true"
          >
            <img
              className={styles.introTitleImage}
              src="/images/menu-title.svg"
              alt=""
              draggable="false"
            />
          </span>
        </h2>

        <p className={styles.introEnglish} data-menu-intro-english>
          A page for each pour.
        </p>

        <p className={styles.introCopy} data-menu-intro-copy>
          一杯ずつ、夜を選ぶ。
        </p>

        <p id="menu-summary" className="sectionContext menuContext">
          泡盛・ウイスキー・カクテルの一例です。
        </p>
      </div>

      <div className={styles.bookStage} data-menu-stage>
        <div className={styles.book} data-menu-book>
          <div className={styles.bookShadow} aria-hidden="true" />

          <div className={styles.bookBase} aria-hidden="true">
            <span className={styles.baseLeft} />
            <span className={styles.baseRight} />
          </div>

          <div className={styles.cover} data-menu-cover>
            <div className={`${styles.coverFace} ${styles.coverFront}`}>
              <span className={styles.coverEyebrow}>
                Cocktail &amp; Awamori
              </span>

              <span className={styles.coverLogo}>MIZATO</span>
              <span className={styles.coverMeta}>Drink Menu</span>
            </div>

            <div className={`${styles.coverFace} ${styles.coverBack}`}>
              <span className={styles.coverBackLine} />

              <p className={styles.coverBackCopy}>
                The night is
                <br />
                served quietly.
              </p>
            </div>
          </div>

          {menuCategories.map((category, categoryIndex) => (
            <article
              key={category.name}
              className={styles.pageSheet}
              data-menu-page
              data-page-index={categoryIndex}
              aria-labelledby={`menu-category-${categoryIndex}`}
            >
              <div className={`${styles.pageFace} ${styles.pageFront}`}>
                <header className={styles.pageHeader}>
                  <p className={styles.pageJapanese}>
                    {category.japanese}
                  </p>

                  <h3
                    id={`menu-category-${categoryIndex}`}
                    className={styles.pageTitle}
                    data-menu-page-title
                  >
                    {category.name}
                  </h3>

                  <p className={styles.pagePhrase}>{category.phrase}</p>
                </header>

                <div className={styles.menuList}>
                  {category.items.map((item) => (
                    <div
                      key={`${category.name}-${item.name}`}
                      className={styles.menuRow}
                      data-menu-item
                    >
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemRule} aria-hidden="true" />
                      <span className={styles.itemPrice}>{item.price}</span>
                    </div>
                  ))}
                </div>

                <p className={styles.pageNote}>
                  掲載しているメニューは一例です。
                  <br />
                  お好みをお聞かせください。
                </p>
              </div>

              <div
                className={`${styles.pageFace} ${styles.pageBack}`}
                aria-hidden="true"
              >
                <p className={styles.backCategory}>{category.name}</p>
                <span className={styles.backLine} aria-hidden="true" />
                <p className={styles.backCopy}>{category.backCopy}</p>
              </div>
            </article>
          ))}

          <span className={styles.spine} aria-hidden="true" />
        </div>
      </div>

      <p className={styles.scrollHint} data-menu-hint aria-hidden="true">
        Scroll to open
      </p>
    </section>
  );
}
