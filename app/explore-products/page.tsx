"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";

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
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/explore`
        );

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ SAFE IMAGE FUNCTION (BEST PRACTICE)
  const getImageSrc = (image?: string) => {
    if (!image) return "/placeholder.png";

    return image.startsWith("http") ? image : `http://localhost:5000${image}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h1 className="text-3xl font-bold mb-10">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product, i) => (
          <div key={i}>
            <div className="relative bg-[#F5F5F5] rounded-md h-[260px] flex items-center justify-center overflow-hidden group">
              {/* ICONS */}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-red-500">
                  <FaHeart size={14} />
                </button>

                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-red-500">
                  <FaEye size={14} />
                </button>
              </div>

              {/* IMAGE (FIXED) */}
              <Image
                src={getImageSrc(product.image)}
                alt={product.name}
                width={180}
                height={180}
                className="object-contain"
              />

              {/* ADD TO CART */}
              <button className="absolute bottom-0 left-0 w-full bg-black text-white py-3 font-medium opacity-0 group-hover:opacity-100 transition duration-300">
                Add To Cart
              </button>
            </div>

            {/* INFO */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-black mb-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#DB4444] font-semibold text-lg">
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
