"use client";
import ProductCardss from "@/components/products/ProductCardss";
import React, { useEffect, useState } from "react";

export default function BestSellingPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/best-selling-products`
        );
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-10 py-10">
      <h1 className="text-3xl font-bold mb-8">All Best Selling Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item, i) => (
          <ProductCardss key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
