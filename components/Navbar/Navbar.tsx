"use client";

import { useCart } from "@/context/CartContext";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiEdit3,
} from "react-icons/fi";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "@/src/lib/User";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const { cartCount, openCart } = useCart();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch profile on load
  useEffect(() => {
    fetchProfile();
  }, []);

  // Re-fetch profile when updated
  useEffect(() => {
    const handler = () => {
      fetchProfile();
    };

    window.addEventListener("profileUpdated", handler);

    return () => {
      window.removeEventListener("profileUpdated", handler);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      if (data?.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsLoggedIn(false);
      setOpenProfile(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const avatarUrl =
    user?.avatar && API_URL ? `${API_URL}${user.avatar}` : "/c1.jpg";

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[75px] px-6">
        {/* LOGO */}
        <h1
          onClick={() => router.push("/")}
          className="text-[28px] font-bold cursor-pointer tracking-wide"
        >
          Exclusive
        </h1>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium">
          <button onClick={() => router.push("/")}>Home</button>
          <button>Contact</button>
          <button>About</button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-[#F5F5F5] px-4 h-[42px] rounded-lg">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-[220px]"
            />
            <FiSearch />
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-5 text-[22px]">
            <FiHeart className="cursor-pointer" />

            {/* CART */}
            <button className="relative" onClick={openCart}>
              <FiShoppingCart />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* PROFILE */}
            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm"
              >
                <FiUser />
                Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* PROFILE BUTTON */}
                <button
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-[45px] h-[45px] rounded-full object-cover"
                  />

                  <div className="hidden md:flex items-center gap-1">
                    <span className="text-[15px] font-semibold">
                      {user?.name || "User"}
                    </span>

                    <FiChevronDown
                      className={`transition-transform ${
                        openProfile ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* DROPDOWN */}
                {openProfile && (
                  <div className="absolute right-0 top-[65px] w-[280px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* HEADER */}
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatarUrl}
                          alt="Profile"
                          className="w-[48px] h-[48px] rounded-full object-cover"
                        />

                        <div className="min-w-0">
                          <h3 className="font-semibold text-[15px] truncate">
                            {user?.name}
                          </h3>

                          <p className="text-[12px] text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* OPTIONS */}
                    <div className="p-2 space-y-1">
                      {/* EDIT PROFILE */}
                      <button
                        onClick={() => {
                          setOpenProfile(false);
                          router.push("/profile");
                        }}
                        className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-gray-100 transition"
                      >
                        <div className="w-[34px] h-[34px] rounded-lg bg-blue-50 flex items-center justify-center">
                          <FiEdit3 className="text-blue-600 text-[16px]" />
                        </div>

                        <div className="text-left leading-tight">
                          <p className="text-[13px] font-medium text-gray-800">
                            Edit Profile
                          </p>

                          <p className="text-[11px] text-gray-500">
                            Update your info
                          </p>
                        </div>
                      </button>

                      {/* LOGOUT */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-red-50 transition"
                      >
                        <div className="w-[34px] h-[34px] rounded-lg bg-red-50 flex items-center justify-center">
                          <FiLogOut className="text-red-500 text-[16px]" />
                        </div>

                        <div className="text-left leading-tight">
                          <p className="text-[13px] font-medium text-gray-800">
                            Logout
                          </p>

                          <p className="text-[11px] text-gray-500">
                            Sign out account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
