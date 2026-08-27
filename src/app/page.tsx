import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HamperCategories from "@/components/HamperCategories";
import IndulgenceWellness from "@/components/IndulgenceWellness";
import RedFlourish from "@/components/RedFlourish";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HamperCategories />
        <RedFlourish />
        <IndulgenceWellness />
        <BrandStory />
      </main>
      <Footer />
    </>
  );
}
