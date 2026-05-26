"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";

const API = "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        toast.success("Login Successful");

        router.push("/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>

          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        {/* EMAIL */}
        <div className="relative mb-4">
          <FiMail className="absolute top-4 left-4 text-gray-400" />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <FiLock className="absolute top-4 left-4 text-gray-400" />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-black transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
