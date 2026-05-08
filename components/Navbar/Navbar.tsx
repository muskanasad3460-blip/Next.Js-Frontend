"use client";

import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-6">
        {/* Logo */}
        <h1 className="text-[24px] font-bold">Exclusive</h1>

        {/* Menu */}
        <div className="flex items-center gap-10 text-[14px]">
          <a className="font-medium border-b-2 border-black pb-1">Home</a>
          <a className="hover:text-gray-600">Contact</a>
          <a className="hover:text-gray-600">About</a>
          <a className="hover:text-gray-600">Sign Up</a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="flex items-center bg-[#F5F5F5] px-4 h-[38px] rounded-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-[220px]"
            />
            <FiSearch />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 text-[20px]">
            <FiHeart />
            <FiShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
}
