"use client";

import React from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import Rating from "./Rating";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getMainImage } from "@/src/lib/image";

type ProductImage = {
  id: string;
  url: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number | string;
  images?: ProductImage[];
  rating?: number;
  reviews?: number;
  quantity: number;
};

export default function ProductCard({ item }: { item: Product }) {
  const router = useRouter();
  const { addToCart, cart, setBuyNowItem, clearCart } = useCart();

  const isAdded = cart.some((cartItem: any) => cartItem.id === item.id);

  // ✅ SAFE IMAGE (backend-proof)
  const imageSrc = getMainImage(item);

  return (
    <div
      className="group min-w-[250px] shrink-0 cursor-pointer"
      onClick={() => router.push(`/product/${item.id}`)}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative bg-gray-100 p-4 rounded overflow-hidden">
        {/* DISCOUNT */}
        {Number(item.discount || 0) > 0 && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}

        {/* CART STATUS */}
        {isAdded && (
          <span className="absolute bottom-14 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Added to Cart
          </span>
        )}

        {/* ICONS */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="bg-white p-2 rounded-full shadow">
            <FaHeart size={14} />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <FaEye size={14} />
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={item.name}
            className="object-contain h-[160px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        </div>

        {/* ACTION BUTTONS */}
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

      {/* NAME */}
      <h3 className="mt-4 font-medium">{item.name}</h3>

      {/* PRICE */}
      <div className="flex gap-2">
        <span className="text-[#DB4444] font-bold">${item.price}</span>

        {item.oldPrice && (
          <span className="line-through text-gray-400">${item.oldPrice}</span>
        )}
      </div>

      {/* RATING */}
      <div className="flex items-center gap-1">
        <Rating rating={item.rating || 0} />
        <span className="text-xs text-gray-500 ml-2">
          ({item.reviews || 0})
        </span>
      </div>
    </div>
  );
}
