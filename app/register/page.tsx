"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const API = "https://3b1e-39-35-157-120.ngrok-free.app";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================
  const handleSendOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully");

        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* HEADING */}
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-gray-500 text-center mb-8">
          Register to continue shopping
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* OTP INPUT */}
        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {/* BUTTON */}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        )}

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
