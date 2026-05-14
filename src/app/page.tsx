import ComingSoon from "../app/components/ComingSoon";
import Hero from "../app/components/sections/Hero";
import Art from "../app/components/sections/Art";
import About from "../app/components/sections/About";
import Shop from "../app/components/sections/Shop";
import Contact from "../app/components/sections/Contact";

export default function Home() {
  const showComingSoon = false;

  if (showComingSoon) return <ComingSoon />;

  return (
    <main className="bg-background-100">
      <Hero />
      <Art />
      <About />
      <Shop />
      <Contact />
    </main>
  );
}