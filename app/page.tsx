import FlashSales from "@/components/FlashSales";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import BestSelling from "@/components/products/ProductSection";
import CategorySection from "@/components/Categories/CategorySection";
import MusicBanner from "@/components/MusicBanner/MusicBanner";
import ExploreProductSection from "@/components/ExploreProductSection";
import NewArrival from "@/components/Arrival/NewArrival";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto flex items-start border-t border-gray-300">
        {/* SIDEBAR */}
        <div className="w-[250px] border-r border-gray-300 h-fit">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 pl-6 pt-6 space-y-10 min-w-0">
          <Hero />
          <FlashSales />
          <CategorySection />
          <BestSelling />
          <MusicBanner />
          <ExploreProductSection />
          <NewArrival />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
