import { useLayoutEffect } from "react";

import BrandHeader from "./components/BrandHeader.jsx";

import Hero from "./sections/Hero.jsx";
import Concept from "./sections/Concept.jsx";
import Signature from "./sections/Signature.jsx";
import Counter from "./sections/Counter.jsx";
import Menu from "./sections/Menu.jsx";
import Information from "./sections/Information.jsx";
import Access from "./sections/Access.jsx";

import { setupLenis } from "./effects/setupLenis.js";

export default function App() {
  useLayoutEffect(() => {
    return setupLenis();
  }, []);

  return (
    <>
      <BrandHeader />

      <main>
        <Hero />
        <Concept />
        <Signature />
        <Counter />
        <Menu />
        <Information />
        <Access />
      </main>
    </>
  );
}