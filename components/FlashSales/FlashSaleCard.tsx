"use client";

import React from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/src/lib/image";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  quantity: number;
};

export default function ProductCard({ item }: { item: Product }) {
  const router = useRouter();
  // const { addToCart, cart } = useCart();
  const { addToCart, cart, setBuyNowItem, clearCart } = useCart();

  const isAdded = cart.some((cartItem: any) => cartItem.id === item.id);

  const imageSrc = getImageUrl(item.image);

  return (
    <div
      className="group min-w-[250px] shrink-0 cursor-pointer"
      onClick={() => router.push(`/product/${item.id}`)}
    >
      <div className="relative bg-gray-100 p-4 rounded overflow-hidden">
        {Number(item.discount || 0) > 0 && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}

        {isAdded && (
          <span className="absolute bottom-14 left-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-bounce`` z-20">
            Added to Cart
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="bg-white p-2 rounded-full shadow">
            <FaHeart size={14} />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <FaEye size={14} />
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={item.name}
            width={140}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
          <div className="flex">
            <button
              className="w-1/2 bg-slate-900 text-white py-2"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
            >
              Add to Cart
            </button>
            {/* <button
              className="w-1/2 bg-emerald-600 text-white py-2"
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/checkout?buyNow=${encodeURIComponent(JSON.stringify(item))}`
                );
              }}
            >
              Buy Now
            </button> */}
            <button
              className="w-1/2 bg-emerald-600 text-white py-2"
              onClick={(e) => {
                e.stopPropagation();

                clearCart();

                setBuyNowItem({
                  ...item,
                  quantity: 1,
                });

                router.push("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <h3 className="mt-4 font-medium">{item.name}</h3>

      <div className="flex gap-2">
        <span className="text-[#DB4444] font-bold">{item.price}</span>
        <span className="line-through text-gray-400">{item.oldPrice}</span>
      </div>

      <div className="flex items-center gap-1">
        <Rating rating={item.rating || 0} />
        <span className="text-xs text-gray-500 ml-2">
          ({item.reviews || 0})
        </span>
      </div>
    </div>
  );
}
