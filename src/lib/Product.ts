const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { apiUrl } from "./image";

export const getFlashSaleProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/flash-sale`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch false sale products");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data?.products || [];
  } catch (error) {
    console.error("Flash sale api error:", error);
    return [];
  }
};

export const getBestSellingProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/best-selling`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failead to fetch best selling products");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data?.products || [];
  } catch (error) {
    console.error("Api error", error);
    return [];
  }
};

export const getExploreProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products/explore`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data?.products || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// =========================
// GET SINGLE PRODUCT
// =========================
export async function getProductById(id: string) {
  try {
    const res = await fetch(apiUrl(`/api/products/${id}`));

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return data;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}
