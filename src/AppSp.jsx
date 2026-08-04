import BrandHeaderSp from "./components/BrandHeaderSp.jsx";
import SpAtmosphere from "./components/SpAtmosphere.jsx";

import HeroSp from "./sections/HeroSp.jsx";
import ConceptSp from "./sections/ConceptSp.jsx";
import SignatureSp from "./sections/SignatureSp.jsx";
import CounterSp from "./sections/CounterSp.jsx";
import MenuSp from "./sections/MenuSp.jsx";
import InformationSp from "./sections/InformationSp.jsx";
import AccessSp from "./sections/AccessSp.jsx";

import "./styles/SpUltimate.css";

export default function AppSp() {
  return (
    <div data-sp-world data-sp-scene="top">
      <SpAtmosphere />

      <a className="skipLink" href="#main-content">
        本文へ移動
      </a>

      <BrandHeaderSp />

      <main id="main-content" tabIndex={-1}>
        <HeroSp />
        <ConceptSp />
        <SignatureSp />
        <CounterSp />
        <MenuSp />
        <InformationSp />
        <AccessSp />
      </main>
    </div>
  );
}
