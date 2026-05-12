import ComingSoon from "../app/components/ComingSoon";
import Hero from "../app/components/sections/Hero";
import About from "../app/components/sections/About";
import Art from "../app/components/sections/Art";
import Contact from "../app/components/sections/Contact";

export default function Home() {
  const showComingSoon = false;

  if (showComingSoon) return <ComingSoon />;

  return (
    <main>
      <Hero />
      <Art />
      <About />
      <Contact />
    </main>
  );
}