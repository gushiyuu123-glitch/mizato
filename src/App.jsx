import { useLayoutEffect } from "react";
import Hero from "./sections/Hero.jsx";
import Concept from "./sections/Concept.jsx";
import Signature from "./sections/Signature.jsx";
import { setupLenis } from "./effects/setupLenis.js";
import Counter from "./sections/Counter.jsx";

export default function App() {
  useLayoutEffect(() => {
    return setupLenis();
  }, []);

  return (
    <>
      <Hero />
      <Concept />
      <Signature />
      <Counter />
    </>
  );
}