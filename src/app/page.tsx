import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HamperCategories from "@/components/HamperCategories";
import IndulgenceWellness from "@/components/IndulgenceWellness";
import BrandStory from "@/components/BrandStory";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HamperCategories />
        <IndulgenceWellness />
        <BrandStory />
      </main>
    </>
  );
}
