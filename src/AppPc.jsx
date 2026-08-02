import { useLayoutEffect } from "react";

import BrandHeader from "./components/BrandHeader.jsx";
import PcAtmosphere from "./components/PcAtmosphere.jsx";
import PcBridge from "./components/PcBridge.jsx";

import Hero from "./sections/Hero.jsx";
import Concept from "./sections/Concept.jsx";
import Signature from "./sections/Signature.jsx";
import Counter from "./sections/Counter.jsx";
import Menu from "./sections/Menu.jsx";
import Information from "./sections/Information.jsx";
import Access from "./sections/Access.jsx";

import { setupLenis } from "./effects/setupLenis.js";

export default function AppPc() {
  useLayoutEffect(() => {
    return setupLenis();
  }, []);

  return (
    <div data-pc-world data-pc-pointer="idle">
      <PcAtmosphere />

      <a className="skipLink" href="#main-content">
        本文へ移動
      </a>

      <BrandHeader />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <PcBridge variant="threshold" />

        <Concept />
        <PcBridge variant="pour" />

        <Signature />
        <PcBridge variant="hush" />

        <Counter />
        <PcBridge variant="page" />

        <Menu />
        <PcBridge variant="corridor" />

        <Information />
        <PcBridge variant="street" />

        <Access />
      </main>
    </div>
  );
}
