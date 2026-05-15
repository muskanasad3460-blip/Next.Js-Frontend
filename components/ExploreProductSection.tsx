"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const API = "http://localhost:5000";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2px] text-[#FFAD33] text-sm">
      {[1, 2, 3, 4, 5].map((star) =>
        rating >= star ? (
          <FaStar key={star} />
        ) : (
          <FaRegStar key={star} className="text-gray-300" />
        )
      )}
    </div>
  );
}

export default function ExploreProductSection() {
  const [products, setProducts] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API}/api/products/explore`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Explore Products</h2>

          <div className="flex gap-3">
            <button onClick={scrollLeft}>
              <IoArrowBack />
            </button>
            <button onClick={scrollRight}>
              <IoArrowForward />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth"
        >
          {products.map((product) => {
            const image =
              product.images?.[0]?.url || product.image || "/placeholder.png";

            const imageSrc = image.startsWith("http")
              ? image
              : `${API}${image}`;

            return (
              <div
                key={product.id}
                className="w-[260px] shrink-0 cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <div className="bg-gray-100 rounded p-4 relative group">
                  {/* IMAGE */}
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-contain mx-auto"
                  />
                  {/* ICONS */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 transition">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-500">
                      <FaHeart size={14} />
                    </button>

                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-500">
                      <FaEye size={14} />
                    </button>
                  </div>

                  {/* HOVER */}
                  <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100">
                    Add To Cart
                  </button>
                </div>

                <h3 className="mt-3 font-medium">{product.name}</h3>

                <div className="flex gap-2 items-center">
                  <span className="text-red-500 font-bold">
                    ${product.price}
                  </span>
                  <RatingStars rating={product.rating || 0} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
