"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";

import { getMainImage, getProductImages, apiUrl } from "@/src/lib/image";
import { getProductById } from "@/src/lib/Product";

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["bg-blue-500", "bg-red-500"];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);

  const { setBuyNowItem, clearCart } = useCart();

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const data = await getProductById(String(id));

      if (!data) return;

      setProduct(data);
      setMainImage(getMainImage(data));
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const images = getProductImages(product);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div className="flex gap-4">
          {/* THUMBNAILS */}
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden ${
                  mainImage === img ? "border border-black scale-105" : ""
                }`}
              >
                <Image src={img} alt="thumb" width={80} height={80} />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
            <Image
              src={mainImage}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain h-[450px]"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="text-3xl font-bold">${product.price}</div>

          <p className="text-gray-600">{product.description}</p>

          {/* COLORS */}
          <div>
            <h3 className="font-semibold mb-2">Colors</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} ${
                    selectedColor === color ? "border-2 border-black" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QTY */}
          <div className="flex items-center gap-4">
            <div className="flex border">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>
                <Minus size={16} />
              </button>

              <div className="px-4">{qty}</div>

              <button onClick={() => setQty(qty + 1)}>
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => {
                clearCart();
                setBuyNowItem({ ...product, quantity: qty });
                router.push("/checkout");
              }}
              className="bg-red-500 text-white px-8 py-3 rounded"
            >
              Buy Now
            </button>

            <Heart size={18} />
          </div>

          {/* DELIVERY */}
          <div className="border p-4 space-y-4">
            <div className="flex gap-3">
              <Truck />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-500">Enter postal code</p>
              </div>
            </div>

            <div className="flex gap-3">
              <RotateCcw />
              <div>
                <p className="font-semibold">Return Policy</p>
                <p className="text-sm text-gray-500">30 days return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
