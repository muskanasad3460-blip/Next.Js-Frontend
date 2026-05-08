import SectionHeader from "@/components/products/SectionHeader";
import ProductCardss from "@/components/products/ProductCardss";
import { BestSellingProducts } from "@/data/BestSellingProduct";

export default function ProductSection() {
  return (
    <main className="px-6 py-8 max-w-[1150px]">
      <SectionHeader
        subtitle="This Month"
        title="Best Selling Products"
        button
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {BestSellingProducts.map((item: any) => (
          <div key={item.id} className="max-w-[240px]">
            <ProductCardss item={item} />
          </div>
        ))}
      </div>
    </main>
  );
}
