"use client";

import Image from "next/image";

export default function NewArrival() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-9 bg-[#DB4444] rounded-sm" />
        <p className="text-[#DB4444]  font-semibold">Featured</p>
      </div>

      <h2 className="text-3xl font-bold mb-10">New Arrival</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Big Card */}
        <div className="relative bg-black rounded-md overflow-hidden min-h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop"
            alt="ps5"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-8 left-8 text-white z-10">
            <h3 className="text-3xl font-semibold mb-2">PlayStation 5</h3>
            <p className="text-sm text-gray-300 mb-4 max-w-xs">
              Black and White version of the PS5 coming out on sale.
            </p>

            <button className="border-b border-white text-lg font-medium">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          {/* Women Card */}
          <div className="relative bg-black rounded-md overflow-hidden h-[290px]">
            <Image
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
              alt="women"
              fill
              className="object-cover"
            />

            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="text-3xl font-semibold mb-2">
                Women’s Collections
              </h3>

              <p className="text-sm text-gray-300 mb-4 max-w-xs">
                Featured woman collections that give you another vibe.
              </p>

              <button className="border-b border-white text-lg font-medium">
                Shop Now
              </button>
            </div>
          </div>

          {/* Bottom Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Speakers */}
            <div className="relative bg-black rounded-md overflow-hidden h-[280px]">
              <Image
                src="https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1200&auto=format&fit=crop"
                alt="speaker"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-2xl font-semibold mb-1">Speakers</h3>

                <p className="text-sm text-gray-300 mb-3">
                  Amazon wireless speakers
                </p>

                <button className="border-b border-white text-lg font-medium">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Perfume */}
            <div className="relative bg-black rounded-md overflow-hidden h-[280px]">
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
                alt="perfume"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-2xl font-semibold mb-1">Perfume</h3>

                <p className="text-sm text-gray-300 mb-3">
                  GUCCI INTENSE OUD EDP
                </p>

                <button className="border-b border-white text-lg font-medium">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
