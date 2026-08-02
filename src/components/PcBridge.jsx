import { useEffect, useRef } from "react";
import styles from "./PcBridge.module.css";

const VALID_VARIANTS = new Set([
  "threshold",
  "pour",
  "hush",
  "page",
  "corridor",
  "street",
]);

export default function PcBridge({ variant = "threshold" }) {
  const bridgeRef = useRef(null);
  const safeVariant = VALID_VARIANTS.has(variant) ? variant : "threshold";

  useEffect(() => {
    const bridge = bridgeRef.current;

    if (!bridge) {
      return undefined;
    }

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (reduceMotion) {
      bridge.classList.add(styles.isVisible);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        bridge.classList.add(styles.isVisible);
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(bridge);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bridgeRef}
      className={`${styles.bridge} ${styles[safeVariant]}`}
      aria-hidden="true"
      data-pc-bridge={safeVariant}
    >
      <span className={styles.depth} />
      <span className={styles.light} />
      <span className={styles.trace} />
      <span className={styles.dust} />
    </div>
  );
}
