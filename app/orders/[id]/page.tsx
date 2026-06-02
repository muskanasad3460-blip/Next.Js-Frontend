"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function OrderDetailsPage() {
  const params = useParams();

  // ✅ FIXED
  const id = String(params?.id || "");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://3b1e-39-35-157-120.ngrok-free.app/api/orders/${id}`
        );

        const data = await res.json();

        if (!res.ok) {
          return toast.error(data.message);
        }

        setOrder(data.order);
      } catch (error) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-14 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-2">Order Details</h1>

        {/* ✅ FIXED: id */}
        <p className="text-gray-500 mb-6">Order ID: {order.id}</p>

        <div className="mb-10">
          <p>{order.firstName}</p>
          <p>{order.email}</p>
          <p>{order.phone}</p>
          <p>{order.city}</p>
        </div>

        <div className="space-y-5">
          {order.products.map((product: any, i: number) => {
            const imageSrc = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `https://3b1e-39-35-157-120.ngrok-free.app${product.image}`
              : "/n1.jpg";

            return (
              <div key={i} className="flex justify-between">
                <div className="flex gap-4">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    width={60}
                    height={60}
                  />
                  <div>
                    <h3>{product.name}</h3>
                    <p>Qty: {product.quantity}</p>
                  </div>
                </div>

                <div>${product.price * product.quantity}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
