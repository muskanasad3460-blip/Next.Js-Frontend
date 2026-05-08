"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { heroSlides } from "@/data/heroSlides";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    // ✅ OUTER WRAPPER (controls side spacing)
    <div className="w-full px-4 md:px-6 flex justify-center">
      {/* ✅ CENTERED CONTAINER (THIS FIXES WIDTH ISSUE) */}
      <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-lg relative">
        {" "}
        {/* SLIDER */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full bg-black relative flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-8"
            >
              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

              {/* TEXT */}
              <div className="relative z-10 text-white max-w-md text-center md:text-left space-y-3">
                <p className="text-xs text-gray-400">{slide.title}</p>

                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  {slide.heading}
                </h2>

                <p className="text-gray-300 text-sm">{slide.sub}</p>

                <button className="group inline-flex items-center gap-2 mt-3 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md text-sm shadow hover:opacity-90 transition">
                  Shop Now
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* IMAGE */}
              <div className="relative z-10 w-[160px] sm:w-[200px] md:w-[260px] h-[120px] sm:h-[150px] md:h-[180px] mt-6 md:mt-0">
                <Image
                  src={slide.img}
                  alt="product"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          ))}
        </div>
        {/* LEFT ARROW */}
        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? heroSlides.length - 1 : prev - 1
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow hidden md:flex"
        >
          <FiChevronLeft />
        </button>
        {/* RIGHT ARROW */}
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow hidden md:flex"
        >
          <FiChevronRight />
        </button>
        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
