"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const API = "https://3b1e-39-35-157-120.ngrok-free.app";

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

  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/api/products/explore`);

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
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Explore Products</h2>

          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <IoArrowBack />
            </button>

            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <IoArrowForward />
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {products.map((product) => {
            const image =
              product.images?.[0]?.url || product.image || "/placeholder.png";

            const imageSrc = image.startsWith("http")
              ? image
              : `${API}${image}`;

            const isAdded = cart.some((item: any) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="min-w-[250px] shrink-0 cursor-pointer group"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                {/* CARD */}
                <div className="bg-gray-100 rounded-xl p-4 relative overflow-hidden">
                  {/* IMAGE */}
                  <div className="flex justify-center">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>

                  {/* ICONS */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-500 transition">
                      <FaHeart size={14} />
                    </button>

                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-500 transition">
                      <FaEye size={14} />
                    </button>
                  </div>

                  {/* ADDED BADGE */}
                  {isAdded && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow z-20">
                      Added
                    </span>
                  )}

                  {/* BUTTONS */}
                  <div className="absolute bottom-0 left-0 w-full flex translate-y-full group-hover:translate-y-0 transition duration-300">
                    {/* ADD TO CART */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!isAdded) {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                          });
                        }
                      }}
                      className={`w-1/2 py-3 text-white font-medium transition ${
                        isAdded ? "bg-green-600" : "bg-black"
                      }`}
                    >
                      Add to Cart
                    </button>

                    {/* BUY NOW */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        router.push(
                          `/checkout?buyNow=${encodeURIComponent(
                            JSON.stringify({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              quantity: 1,
                            })
                          )}`
                        );
                      }}
                      className="w-1/2 py-3 bg-[#DB4444] text-white font-medium hover:bg-red-600 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#DB4444] font-bold">
                      ${product.price}
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-2 mt-2">
                    <RatingStars rating={product.rating || 0} />

                    <span className="text-sm text-gray-500">
                      ({product.reviews || 0})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
