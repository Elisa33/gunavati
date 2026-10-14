import ComingSoon from "@/app/[locale]/components/ComingSoon";
import Navbar from "@/app/[locale]/components/sections/Navbar";
import Hero from "@/app/[locale]/components/sections/Hero";
import Art from "@/app/[locale]/components/sections/Art";
import About from "@/app/[locale]/components/sections/About";
import Shop from "@/app/[locale]/components/sections/Shop";
import Support from "@/app/[locale]/components/sections/Support";
import Contact from "@/app/[locale]/components/sections/Contact";

export default function Home() {
  const showComingSoon = false;

  if (showComingSoon) return <ComingSoon />;

  return (
    <main className="bg-background-100">
      <Navbar />
      <Hero />
      <Art />
      <About />
      <Shop />
      <Support />
      <Contact />
    </main>
  );
}