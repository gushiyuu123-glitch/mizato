// src/sections/Counter.jsx

import { useLayoutEffect, useRef } from "react";
import { setupCounterReveal } from "../effects/setupCounterReveal.js";
import styles from "./Counter.module.css";

export default function Counter() {
  const counterRef = useRef(null);

  useLayoutEffect(() => {
    return setupCounterReveal(counterRef.current);
  }, []);

  return (
    <section ref={counterRef} className={styles.counter} id="counter">
      <h2 className={styles.axisHeading}>
        <span className={styles.srOnly}>At the Counter</span>

        <span
          className={styles.axisReveal}
          data-counter-axis
          aria-hidden="true"
        >
          <img
            className={styles.axisImage}
            src="/images/at-the-counter.svg"
            alt=""
          />
        </span>
      </h2>
    </section>
  );
}