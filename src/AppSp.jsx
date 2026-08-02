import BrandHeaderSp from "./components/BrandHeaderSp.jsx";

import HeroSp from "./sections/HeroSp.jsx";
import ConceptSp from "./sections/ConceptSp.jsx";
import SignatureSp from "./sections/SignatureSp.jsx";
import CounterSp from "./sections/CounterSp.jsx";
import MenuSp from "./sections/MenuSp.jsx";
import InformationSp from "./sections/InformationSp.jsx";
import AccessSp from "./sections/AccessSp.jsx";

export default function AppSp() {
  return (
    <>
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
    </>
  );
}
