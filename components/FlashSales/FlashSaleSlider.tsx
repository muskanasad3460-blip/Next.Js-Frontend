"use client";
import React, { useRef } from "react";
import ProductCard from "./FlashSaleCard";
import { products } from "@/data/FlashProduct";

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex justify-end gap-3 mb-4 ">
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
        {products.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
    </>
  );
}
