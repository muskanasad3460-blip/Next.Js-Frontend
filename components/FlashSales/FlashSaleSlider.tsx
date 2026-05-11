// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import ProductCard from "./FlashSaleCard";

// export default function ProductSlider() {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/flash-sale/flash-sale-products`
//         );
//         const data = await res.json();

//         setProducts(data);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
//   };

//   if (loading) {
//     return <p className="text-center py-10">Loading Flash Sale Products...</p>;
//   }

//   return (
//     <>
//       <div className="flex justify-end gap-3 mb-4">
//         <button className="btn-circle" onClick={scrollLeft}>
//           ←
//         </button>
//         <button className="btn-circle" onClick={scrollRight}>
//           →
//         </button>
//       </div>

//       <div
//         ref={scrollRef}
//         className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
//       >
//         {products.length > 0 ? (
//           products.map((item, i) => <ProductCard key={i} item={item} />)
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>
//     </>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./FlashSaleCard";

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/flash-sale`
        );

        const data = await res.json();

        // ensure array
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  if (loading) {
    return <p className="text-center py-10">Loading Flash Sale Products...</p>;
  }

  return (
    <>
      <div className="flex justify-end gap-3 mb-4">
        <button className="btn-circle" onClick={scrollLeft}>
          ←
        </button>
        <button className="btn-circle" onClick={scrollRight}>
          →
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2"
      >
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
}
