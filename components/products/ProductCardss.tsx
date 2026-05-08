"use client";

import Image from "next/image";
import { FlashProducts } from "@/data/FlashProduct";
import { FaEye, FaHeart } from "react-icons/fa";

export default function ProductCardss({ item }: { item: FlashProducts }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative group">
      {/* Icons */}
      <div className="absolute right-2 top-2 flex flex-col gap-2">
        <button className="bg-gray-100 p-2 rounded-full hover:text-[#DB4444] ">
          <FaEye size={14} />
        </button>
        <button className="bg-gray-100 p-2 rounded-full hover:text-[#DB4444] ">
          <FaHeart size={14} />
        </button>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src={item.img}
          alt={item.name}
          width={160}
          height={160}
          className="object-contain mb-4"
        />
      </div>

      {/* Title */}
      <p className="text-sm mb-2 font-medium">{item.name}</p>

      {/* Price */}
      <div className="flex gap-2 items-center">
        <span className="text-[#DB4444]  font-semibold">{item.price}</span>

        <span className="line-through text-gray-400 text-sm">
          {item.oldPrice}
        </span>
      </div>
    </div>
  );
}
