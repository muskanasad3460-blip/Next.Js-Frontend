import Timer from "./Timer";
import ProductSlider from "./FlashSaleSlider";
import SectionHeader from "@/components/products/SectionHeader";

export default function FlashSales() {
  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-end gap-10">
          <SectionHeader subtitle="Today’s" title="Flash Sales" />

          <Timer />
        </div>
      </div>

      <ProductSlider />

      <div className="flex justify-center mt-10">
        <button className="bg-[#DB4444] text-white px-8 py-3 rounded-md hover:bg-[#DB4444] transition">
          View All Products
        </button>
      </div>
    </div>
  );
}
