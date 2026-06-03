"use client";

import Image from "next/image";
import { FaEye, FaHeart } from "react-icons/fa";
import Rating from "@/components/FlashSales/Rating";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductCardss({ item }: any) {
  const router = useRouter();

  // ✅ CART CONTEXT
  const { addToCart, cart } = useCart();

  // ✅ IMAGE FIX
  // const imageSrc = item.image
  //   ? `https://3b1e-39-35-157-120.ngrok-free.app${item.image}`
  //   : "/placeholder.png";
  const imageSrc = item.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
    : "/placeholder.png";

  const isAdded = cart.some((cartItem: any) => cartItem.id === item.id);

  // ✅ ADD TO CART
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    });
  };

  return (
    <div
      className="group min-w-[250px] shrink-0 cursor-pointer"
      onClick={() => router.push(`/product/${item.id}`)}
    >
      <div className="relative bg-gray-100 p-4 rounded overflow-hidden">
        {isAdded && (
          <span className="absolute bottom-14 left-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-md animate-bounce`` z-20">
            Added to Cart
          </span>
        )}
        {/* Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button className="bg-white p-2 rounded-full shadow hover:text-[#DB4444] transition">
            <FaHeart size={14} />
          </button>

          <button className="bg-white p-2 rounded-full shadow hover:text-[#DB4444] transition">
            <FaEye size={14} />
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt={item.name}
            width={160}
            className="object-contain"
          />
        </div>

        {/* Add To Cart */}
        {/* Add To Cart + Buy Now */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
          <div className="flex">
            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className="w-1/2 bg-slate-900 text-white py-2"
            >
              Add To Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={(e) => {
                e.stopPropagation();

                router.push(
                  `/checkout?buyNow=${encodeURIComponent(
                    JSON.stringify({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                    })
                  )}`
                );
              }}
              className="w-1/2 bg-emerald-600 text-white py-2"
            >
              Buy Now
            </button>
          </div>
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
