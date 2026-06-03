"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./FlashSaleCard";
import { getFlashSaleProducts } from "@/src/lib/Product";

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getFlashSaleProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (loading) {
    return <p className="text-center py-10">Loading Flash Sale Products...</p>;
  }

  console.log("PRODUCTS:", products);
  console.log("FIRST IMAGE:", products?.[0]?.img);
  return (
    <>
      <div className="flex justify-end gap-3 mb-4">
        <button className="btn-circle" onClick={scrollLeft}>
          ←
        </button>
        <button className="btn-circle" onClick={scrollRight}>
          →
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
      >
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}
