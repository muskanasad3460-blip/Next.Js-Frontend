"use client";

import ProductCard from "@/components/FlashSales/FlashSaleCard";
import React, { useEffect, useState } from "react";

export default function FlashSalesPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/flash-sale`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-bold mb-8"> All Flash Sale Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item: any, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
