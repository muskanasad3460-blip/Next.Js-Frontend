"use client";
import SectionHeader from "@/components/products/SectionHeader";
import ProductCardss from "@/components/products/ProductCardss";
import { BestSellingProducts } from "@/data/BestSellingProduct";
import { useEffect, useRef, useState } from "react";

export default function ProductSection() {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-selling`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <main className="px-6 py-8 max-w-[1150]">
      <SectionHeader
        subtitle="This Month"
        title="Best Selling Products"
        button
        link="/best-selling"
      />
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={scrollLeft}
          className="w-10 h-10 rounded-full bg-gray-100"
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className="w-10 h-10 rounded-full bg-gray-100"
        >
          →
        </button>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {products.map((item, i) => (
          <div key={i} className="min-w-[250]">
            <ProductCardss item={item} />
          </div>
        ))}
      </div>
    </main>
  );
}
