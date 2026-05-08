"use client";

import Image from "next/image";

export default function Banner() {
  return (
    <section className="px-4 md:px-8 py-6">
      <div className="bg-black rounded-md overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 py-8 max-w-5xl mx-auto">
        {/* LEFT */}
        <div className="max-w-md">
          <p className="text-green-400 font-semibold mb-3">Categories</p>

          <h2 className="text-white text-2xl md:text-4xl font-semibold leading-tight mb-6">
            Enhance Your <br />
            Music Experience
          </h2>

          {/* TIMER */}
          <div className="flex gap-2 mb-6">
            {[
              { value: "23", label: "Hours" },
              { value: "05", label: "Days" },
              { value: "59", label: "Minutes" },
              { value: "35", label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center"
              >
                <span className="text-base font-bold text-black">
                  {item.value}
                </span>
                <span className="text-[10px] text-black">{item.label}</span>
              </div>
            ))}
          </div>

          <button className="bg-green-400 hover:bg-yellow-500 transition text-white px-6 py-2 rounded-md">
            Buy Now!
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-6 lg:mt-0 w-full max-w-[420px] h-[200px] md:h-[260px]">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75" />

          <Image
            src="/Music.jpg"
            alt="speaker"
            fill
            className="object-contain relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
