"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageCheck, Truck, Clock3, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { deleteOrder, getOrders } from "@/src/lib/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { ok, data } = await getOrders();

      if (!ok) return toast.error(data.message);

      setOrders(data.orders);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { ok, data } = await deleteOrder(id);

      if (!ok) return toast.error(data.message);

      toast.success("Order deleted");

      setOrders((prev) => prev.filter((item) => item.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // =========================
  // STATUS BADGE UI
  // =========================
  const statusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "Packed":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <PackageCheck className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock3 className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Orders</h1>
            <p className="text-gray-500 mt-2">Track your orders easily</p>
          </div>

          <Link
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white px-6 h-12 rounded-xl flex items-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl text-center">
            <PackageCheck className="w-12 h-12 mx-auto text-gray-400" />
            <h2 className="text-3xl font-bold mt-6">No Orders Yet</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const firstProduct = order.orderItems?.[0]?.product;

              const imageSrc = firstProduct?.images?.[0]?.url
                ? firstProduct.images[0].url.startsWith("http")
                  ? firstProduct.images[0].url
                  : `${process.env.NEXT_PUBLIC_API_URL}${firstProduct.images[0].url}`
                : "/n1.jpg";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl  p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                      <Image
                        src={imageSrc}
                        alt="product"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">Order #{order.id}</h2>

                      <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      {/* STATUS BADGE */}
                      <div
                        className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${statusBadge(
                          order.status
                        )}`}
                      >
                        {statusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Total</p>
                      <h3 className="text-xl font-bold">${order.subtotal}</h3>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="px-5 h-11 rounded-xl border flex items-center hover:bg-gray-100"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(order.id)}
                      className="px-4 h-11 bg-red-500 text-white rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
