"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import React from "react";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";

export default function CartSidebar() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* OVERLAY */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Shopping Cart
            </h2>

            <p className="text-sm text-gray-500">{cart.length} items</p>
          </div>

          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          >
            <FiX className="text-xl text-gray-700" />
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {cart.length === 0 ? (
            <div
              key="empty-cart"
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-lg font-medium text-gray-700">
                Your cart is empty
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Add products to your cart
              </p>
            </div>
          ) : (
            cart.map((item, index) => {
              const imageSrc = item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `http://localhost:5000${item.image}`
                : "/n1.jpg";

              return (
                <div
                  key={item.id || index}
                  className="bg-gray-50 rounded-2xl p-3 flex gap-3 hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={imageSrc}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-white"
                  />

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        ${item.price}
                      </p>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                        >
                          <FiMinus size={14} />
                        </button>

                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* DELETE */}
                      <button
                        className="text-red-500 hover:text-red-600 transition"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Total</span>

              <span className="text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
