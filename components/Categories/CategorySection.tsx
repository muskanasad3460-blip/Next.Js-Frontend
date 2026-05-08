"use client";

import CategoryCard from "./CategoryCard";
import { useRef } from "react";
import SectionHeader from "@/components/products/SectionHeader";
import { categories } from "@/data/categories";

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -220 : 220,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-10 py-10">
      {/* HEADER ROW FIXED */}
      <div className="flex items-center justify-between mb-8">
        <SectionHeader subtitle="Categories" title="Browse By Category" />

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            →
          </button>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <div key={index} className="shrink-0">
                <CategoryCard
                  title={cat.title}
                  icon={<Icon />}
                  active={cat.title === "Camera"}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full border-t border-gray-200 mt-10" />
    </div>
  );
}
