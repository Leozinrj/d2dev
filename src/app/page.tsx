import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Capabilities from "@/components/Capabilities";
import BlockchainSection from "@/components/BlockchainSection";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <Capabilities />
        <BlockchainSection />
        <Process />
        <Stack />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
