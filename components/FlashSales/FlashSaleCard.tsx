"use client";

import { FlashProducts } from "@/data/FlashProduct";
import Image from "next/image";
import React from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import Rating from "./Rating";

export default function ProductCard({ item }: { item: FlashProducts }) {
  return (
    <div className="group min-w-[250px] shrink-0">
      <div className="relative bg-gray-100 p-4 rounded overflow-hidden">
        <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
          {item.discount}
        </span>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="bg-white p-2 rounded-full shadow cursor-pointer hover:text-[#DB4444] ">
            <FaHeart size={14} />
          </div>
          <div className="bg-white p-2 rounded-full shadow cursor-pointer hover:text-[#DB4444] ">
            <FaEye size={14} />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={item.img}
            alt="item.name"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
          <button className="w-full bg-black text-white py-2">
            Add to Cart
          </button>
        </div>
      </div>
      <h3 className="mt-4 font-medium">{item.name}</h3>
      <div className="flex gap-2">
        <span className="text-[#DB4444]  font-bold">{item.price}</span>
        <span className="line-through text-gray-400">{item.oldPrice}</span>
      </div>

      <div className="flex items-center gap-1">
        <Rating rating={item.rating} />
        <span className="text-xs text-gray-500 ml-2">({item.reviews})</span>
      </div>
    </div>
  );
}
