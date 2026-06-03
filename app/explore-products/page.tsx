"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";

import { getImageUrl } from "@/src/lib/image";
import { getExploreProducts } from "@/src/lib/Product";

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

export default function ExploreProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getExploreProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold mb-10">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <div key={i}>
            <div className="relative bg-[#F5F5F5] rounded-md h-[260px] flex items-center justify-center overflow-hidden group">
              {/* ICONS */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <FaHeart size={14} />
                </button>

                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                  <FaEye size={14} />
                </button>
              </div>

              {/* IMAGE */}
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain"
              />

              {/* ADD TO CART */}
              <button className="absolute bottom-0 left-0 w-full bg-black text-white py-3 opacity-0 group-hover:opacity-100 transition">
                Add To Cart
              </button>
            </div>

            {/* INFO */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>

              <div className="flex items-center gap-3">
                <span className="text-[#DB4444] font-semibold">
                  ${product.price}
                </span>

                <RatingStars rating={product.rating || 0} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
