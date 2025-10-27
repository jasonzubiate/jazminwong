import Hero from "../components/sections/Hero";
import Work from "../components/sections/Work";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <About />
      <Services />
      <Footer />
    </main>
  );
}
