"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-[2] text-[#FFAD33] text-sm">
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
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/explore/explore-products`
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
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-9 rounded bg-[#DB4444]" />

          <span className="text-[#DB4444] font-semibold text-sm md:text-base">
            Our Products
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Explore our Products
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <IoArrowBack className="text-2xl" />
            </button>

            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <IoArrowForward className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {products.map((product, i) => (
            <div key={i} className="w-[270px] shrink-0">
              <div className="relative bg-[#F5F5F5] rounded-md h-[260px] flex items-center justify-center overflow-hidden group">
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#00FF66] text-white text-xs px-3 py-1 rounded">
                    {product.badge}
                  </span>
                )}

                {/* Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-red-500">
                    <FaHeart size={14} />
                  </button>

                  <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-red-500">
                    <FaEye size={14} />
                  </button>
                </div>

                {/* Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />

                {/* Add To Cart */}
                <button className="absolute bottom-0 left-0 w-full bg-black text-white py-3 font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                  Add To Cart
                </button>
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="font-semibold text-lg text-black mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#DB4444] font-semibold text-lg">
                    ${product.price}
                  </span>

                  <RatingStars rating={product.rating} />
                </div>

                {/* Colors */}
                {product.colors && (
                  <div className="flex items-center gap-2 mt-3">
                    {product.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => router.push("/explore-products")}
            className="bg-[#DB4444] text-white px-8 py-3 rounded-md hover:bg-[#c93a3a] transition"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
