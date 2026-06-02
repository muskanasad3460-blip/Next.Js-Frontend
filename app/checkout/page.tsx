"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, buyNowItem } = useCart();

  // const productsToShow = buyNowItem ? [buyNowItem] : cart;
  const router = useRouter();

  const productsToShow = buyNowItem ? [buyNowItem] : cart;
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // =========================
  // FORM STATE
  // =========================
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  // =========================
  // LOAD SAVED DATA
  // =========================
  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // TOTAL
  // =========================
  const subtotal = productsToShow.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async () => {
    try {
      if (!formData.firstName.trim()) {
        return toast.error("First name is required");
      }
      if (!formData.streetAddress.trim()) {
        return toast.error("Street address is required");
      }
      if (!formData.city.trim()) {
        return toast.error("City is required");
      }
      if (!formData.phone.trim()) {
        return toast.error("Phone number is required");
      }

      if (!formData.email.trim()) {
        return toast.error("Email is required");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        return toast.error("Invalid email address");
      }

      // SAVE FOR NEXT TIME
      localStorage.setItem("checkoutData", JSON.stringify(formData));

      const orderData = {
        customer: formData,
        paymentMethod,
        products: productsToShow,
        subtotal,
      };

      const res = await fetch(
        "https://3b1e-39-35-157-120.ngrok-free.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Order placed successfully");

      router.push("/success");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-sm text-gray-400 mb-12">
          View Cart /<span className="text-black font-medium">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl font-semibold mb-10">Billing Details</h1>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  First Name*
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Street Address*
                </label>

                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Apartment, floor, etc.
                </label>

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Town/City*
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Email Address*
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="accent-red-500 w-4 h-4"
                />

                <p className="text-sm text-gray-600">
                  Save this information for faster check-out next time
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-20">
            <div className="space-y-5">
              {productsToShow.map((item, index) => {
                const imageSrc = item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `https://3b1e-39-35-157-120.ngrok-free.app${item.image}`
                  : "/n1.jpg";

                return (
                  <div
                    key={item.id || index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />

                      <h3 className="text-sm">{item.name}</h3>
                    </div>

                    <p className="text-sm font-medium">
                      ${item.price * (item.quantity || 1)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 border-b pb-4 flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>

            <div className="py-4 border-b flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="py-4 flex justify-between">
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>

            {/* PAYMENT */}
            <div className="mt-8 space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                  />

                  <span>Bank</span>
                </div>

                <div className="flex items-center gap-6">
                  <img src="/images.jpeg" className="w-10" />
                  <img src="/images.png" className="w-10 h-6" />
                  <img src="/m1.png" className="w-10" />
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />

                <span>Cash on delivery</span>
              </label>
            </div>

            {/* COUPON */}
            <div className="flex gap-4 mt-8">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border h-12 px-4 rounded outline-none"
              />

              <button className="bg-[#DB4444] hover:bg-red-600 text-white px-8 rounded transition">
                Apply Coupon
              </button>
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={handlePlaceOrder}
              className="mt-8 bg-[#DB4444] hover:bg-red-600 text-white px-10 h-12 rounded transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
