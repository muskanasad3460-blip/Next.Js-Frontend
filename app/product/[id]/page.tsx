"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

const sizes = ["XS", "S", "M", "L", "XL"];

const colors = ["bg-blue-500", "bg-red-500"];

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  const [mainImage, setMainImage] = useState("");

  const [selectedSize, setSelectedSize] = useState("M");

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const [qty, setQty] = useState(1);
  const router = useRouter();
  const { setBuyNowItem, clearCart } = useCart();

  // FETCH PRODUCT
  //
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://3b1e-39-35-157-120.ngrok-free.app/api/products/${id}`
        );

        const data = await res.json();

        setProduct(data);

        // ✅ MAIN IMAGE FROM MULTIPLE IMAGES
        if (data.images && data.images.length > 0) {
          setMainImage(
            `https://3b1e-39-35-157-120.ngrok-free.app${data.images[0].url}`
          );
        } else if (data.image) {
          setMainImage(
            `https://3b1e-39-35-157-120.ngrok-free.app${data.image}`
          );
        } else {
          setMainImage("/n1.jpg");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  //
  // LOADING
  //
  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  //
  // MULTIPLE THUMBNAILS
  //
  const images =
    product?.images?.length > 0
      ? product.images.map(
          (img: any) => `https://3b1e-39-35-157-120.ngrok-free.app${img.url}`
        )
      : product?.image
      ? [`https://3b1e-39-35-157-120.ngrok-free.app${product.image}`]
      : ["/n1.jpg"];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ================= LEFT ================= */}
        <div className="flex gap-4">
          {/* THUMBNAILS */}
          <div className="flex flex-col gap-4">
            {images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden  transition ${
                  mainImage === img ? " scale-105" : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={product?.name || "thumbnail"}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
            <Image
              src={mainImage}
              alt={product?.name || "product-image"}
              width={500}
              height={500}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain h-[450px]"
            />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span className="text-yellow-500">⭐⭐⭐⭐☆</span>

              <span>({product.reviews || 0} Reviews)</span>

              <span className="w-1 h-1 rounded-full bg-gray-400"></span>

              <span className="text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-3xl font-bold text-gray-900">
            ${product.price}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-7">{product.description}</p>

          {/* COLORS */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Colours</h3>

            <div className="flex gap-3">
              {colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-4 ${color} ${
                    selectedColor === color ? "border-black" : "border-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Size</h3>

            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* QTY */}
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-4 py-3 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>

              <div className="px-5 font-semibold">{qty}</div>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-3 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* BUY */}
            {/* BUY */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-medium"
              onClick={(e) => {
                e.stopPropagation();

                clearCart();

                setBuyNowItem({
                  ...product,
                  quantity: qty,
                });

                router.push("/checkout");
              }}
            >
              Buy Now
            </button>

            {/* WISHLIST */}
            <button className="border p-3 rounded-xl hover:bg-gray-100">
              <Heart size={20} />
            </button>
          </div>

          {/* DELIVERY */}
          <div className="border rounded-2xl overflow-hidden mt-8">
            <div className="flex gap-4 p-5 border-b">
              <Truck className="w-6 h-6 text-gray-700" />

              <div>
                <h4 className="font-semibold text-gray-900">Free Delivery</h4>

                <p className="text-sm text-gray-500 mt-1">
                  Enter your postal code for delivery availability.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5">
              <RotateCcw className="w-6 h-6 text-gray-700" />

              <div>
                <h4 className="font-semibold text-gray-900">Return Delivery</h4>

                <p className="text-sm text-gray-500 mt-1">
                  Free 30 days delivery returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
