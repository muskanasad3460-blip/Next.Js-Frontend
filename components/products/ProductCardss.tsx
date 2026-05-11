"use client";

import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";
import Rating from "@/components/FlashSales/Rating";

export default function ProductCardss({ item }: any) {
  return (
    <div className="group min-w-[250px] shrink-0">
      <div className="relative bg-gray-100 p-4 rounded overflow-hidden">
        {/* Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button className="bg-white p-2 rounded-full shadow hover:text-[#DB4444] transition">
            <FaHeart size={14} />
          </button>

          <button className="bg-white p-2 rounded-full shadow hover:text-[#DB4444] transition">
            <FaEye size={14} />
          </button>
        </div>

        {/* Image (backend image fix) */}
        <div className="flex justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${item.image || item.img}`}
            alt={item.name}
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        {/* Add To Cart */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
          <button className="w-full bg-black text-white py-2">
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="font-medium">{item.name}</h3>

        <div className="flex gap-2 mt-1">
          <span className="text-[#DB4444] font-semibold">${item.price}</span>

          {item.oldPrice && (
            <span className="line-through text-gray-400">${item.oldPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Rating rating={item.rating || 0} />
          <span className="text-xs text-yellow-500 ml-2">
            ({item.reviews || 0})
          </span>
        </div>
      </div>
    </div>
  );
}
