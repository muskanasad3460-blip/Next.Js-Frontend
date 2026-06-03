"use client";

import ProductCard from "@/components/FlashSales/FlashSaleCard";
import { getFlashSaleProducts } from "@/src/lib/Product";
import React, { useEffect, useState } from "react";

export default function FlashSalesPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      const data = await getFlashSaleProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);
  console.log("Products:", products);
  console.log("Count:", products.length);
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
