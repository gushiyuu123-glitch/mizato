import { useEffect, useState } from "react";

import AppPc from "./AppPc.jsx";
import AppSp from "./AppSp.jsx";

const DESKTOP_QUERY = "(min-width: 768px)";

function getIsDesktop() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia(DESKTOP_QUERY).matches;
}

export default function App() {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const syncViewport = () => {
      setIsDesktop(mediaQuery.matches);
    };

    syncViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncViewport);
    } else {
      mediaQuery.addListener?.(syncViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncViewport);
      } else {
        mediaQuery.removeListener?.(syncViewport);
      }
    };
  }, []);

  return isDesktop ? <AppPc /> : <AppSp />;
}
