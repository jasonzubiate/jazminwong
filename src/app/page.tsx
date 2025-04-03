import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Footer from "../components/sections/Footer";
import FixedContactButton from "@/components/button/FixedContactButton";
import ContactModal from "@/components/modal/ContactModal";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Footer />
      <ContactModal />
      <FixedContactButton />
    </main>
  );
}
