import { useLayoutEffect, useRef } from "react";
import { setupBrandHeader } from "../effects/setupBrandHeader.js";
import styles from "./BrandHeaderSp.module.css";

export default function BrandHeaderSp() {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    return setupBrandHeader(headerRef.current);
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-brand-header
    >
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