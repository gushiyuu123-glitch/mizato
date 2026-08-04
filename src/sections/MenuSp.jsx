import { useRef, useState } from "react";
import styles from "./MenuSp.module.css";

const menuCategories = [
  {
    name: "Awamori",
    japanese: "泡盛",
    phrase: "島の酒を、夜の温度で。",
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
    items: [
      { name: "MIZATO Original", price: "¥1,300" },
      { name: "Seasonal Cocktail", price: "¥1,200" },
      { name: "Old Fashioned", price: "¥1,200" },
      { name: "Gin & Tonic", price: "¥1,000" },
    ],
  },
];

function clampCategoryIndex(index) {
  const length = menuCategories.length;
  return (index + length) % length;
}

export default function MenuSp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categoryButtonsRef = useRef([]);
  const touchStartRef = useRef(null);
  const activeCategory = menuCategories[activeIndex];

  const selectCategory = (nextIndex, { focus = false } = {}) => {
    const resolvedIndex = clampCategoryIndex(nextIndex);
    setActiveIndex(resolvedIndex);

    if (focus) {
      window.requestAnimationFrame(() => {
        categoryButtonsRef.current[resolvedIndex]?.focus();
      });
    }
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") {
      nextIndex = index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = menuCategories.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    selectCategory(nextIndex, { focus: true });
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalGesture =
      Math.abs(deltaX) >= 46 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalGesture) {
      return;
    }

    selectCategory(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  return (
    <section
      className={styles.menu}
      id="menu"
      data-sp-scene="menu"
      aria-labelledby="menu-title"
      aria-describedby="menu-summary"
    >
      <header className={styles.intro} data-sp-reveal>
        <h2 id="menu-title" className={styles.introTitle}>
          <span className={styles.srOnly}>Menu</span>

          <img
            className={styles.introTitleImage}
            src="/images/menu-title.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        </h2>

        <p className={styles.introCopy}>一杯ずつ、夜を選ぶ。</p>

        <p id="menu-summary" className={styles.summary}>
          泡盛・ウイスキー・カクテルの一例です。
        </p>
      </header>

      <div
        className={styles.categoryNav}
        role="tablist"
        aria-label="ドリンクの種類"
        data-sp-reveal
      >
        {menuCategories.map((category, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={category.name}
              ref={(node) => {
                categoryButtonsRef.current[index] = node;
              }}
              type="button"
              className={styles.categoryButton}
              role="tab"
              aria-label={`${category.japanese}、${category.name}`}
              aria-selected={isActive}
              aria-controls="active-menu-page"
              tabIndex={isActive ? 0 : -1}
              data-active={isActive ? "true" : "false"}
              onClick={() => selectCategory(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{category.japanese}</span>
              <small>{category.name}</small>
            </button>
          );
        })}
      </div>

      <div
        className={styles.menuStage}
        data-sp-reveal
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <article
          key={activeCategory.name}
          id="active-menu-page"
          className={styles.menuPage}
          role="tabpanel"
          aria-live="polite"
        >
          <header className={styles.pageHeader}>
            <p className={styles.pageEnglish}>{activeCategory.name}</p>
            <h3 className={styles.pageTitle}>{activeCategory.japanese}</h3>
            <p className={styles.pagePhrase}>{activeCategory.phrase}</p>
          </header>

          <div className={styles.menuList}>
            {activeCategory.items.map((item) => (
              <div
                key={`${activeCategory.name}-${item.name}`}
                className={styles.menuRow}
              >
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemRule} aria-hidden="true" />
                <span className={styles.itemPrice}>{item.price}</span>
              </div>
            ))}
          </div>

          <p className={styles.pageNote}>
            掲載メニューは一例です。
            <br />
            好みや気分をお聞かせください。
          </p>
        </article>
      </div>
    </section>
  );
}
