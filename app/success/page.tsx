"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-lg p-10 text-center border border-gray-100">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>
        </div>

        {/* TEXT */}
        <h1 className="text-4xl font-bold text-gray-900 mt-8">
          Order Successful!
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Thank you for your purchase.
          <br />
          Your order has been placed successfully and is now being processed.
        </p>

        {/* ORDER BOX */}
        <div className="mt-8 bg-[#F5F5F5] rounded-2xl p-6 text-left">
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-gray-500">Order Status</span>

            <span className="bg-green-100 text-green-700 text-sm px-4 py-1 rounded-full font-medium">
              Confirmed
            </span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-gray-500">Estimated Delivery</span>

            <span className="font-semibold text-gray-800">
              3 - 5 Business Days
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/"
            className="flex-1 h-12 rounded-xl bg-[#DB4444] hover:bg-red-600 transition text-white font-medium flex items-center justify-center"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="flex-1 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-gray-800 font-medium flex items-center justify-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
