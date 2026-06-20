"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { getOrderById } from "@/src/lib/order";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = String(params?.id || "");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const { ok, data } = await getOrderById(id);

        if (!ok) {
          toast.error(data.message);
          return;
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

        <p className="text-gray-500 mb-8">Order ID: {order.id}</p>

        {/* CUSTOMER */}
        <div className="mb-10 space-y-1">
          <h2 className="font-bold text-xl">Customer</h2>

          <p>{order.firstName}</p>

          <p>{order.email}</p>

          <p>{order.phone}</p>

          <p>{order.city}</p>
        </div>

        {/* PRODUCTS */}

        <div className="space-y-5">
          {order.orderItems?.map((item: any, i: number) => {
            const product = item.product;

            const imageSrc = product?.images?.[0]?.url
              ? product.images[0].url.startsWith("http")
                ? product.images[0].url
                : `${process.env.NEXT_PUBLIC_API_URL}${product.images[0].url}`
              : "/n1.jpg";

            return (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-5"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={product?.name || "product"}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">{product?.name}</h3>

                    <p className="text-gray-500">Qty: {item.quantity}</p>

                    <p className="text-gray-500">${item.unitPrice}</p>
                  </div>
                </div>

                <div className="font-bold">
                  ${item.unitPrice * item.quantity}
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL */}
        {/* 
        <div className="mt-10 border-t pt-5 flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>${order.subtotal}</span>
        </div> */}
      </div>
    </div>
  );
}
