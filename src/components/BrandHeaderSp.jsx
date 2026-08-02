import styles from "./BrandHeaderSp.module.css";

export default function BrandHeaderSp() {
  return (
    <header className={styles.header}>
      <a
        className={styles.logoLink}
        href="#top"
        aria-label="ページの先頭へ戻る"
      >
        <img
          className={styles.logo}
          src="/images/mizato-logo.svg"
          alt="MIZATO"
        />
      </a>
    </header>
  );
}
