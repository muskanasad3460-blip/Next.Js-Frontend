// src/lib/orderApi.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// =========================
// FETCH OPTIONS
// =========================
const options = {
  credentials: "include" as RequestCredentials,
};

// =========================
// PLACE ORDER
// =========================
export const placeOrder = async (orderData: any) => {
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    return {
      ok: res.ok,
      data: await res.json(),
    };
  } catch (error) {
    console.error("Order API Error:", error);

    return {
      ok: false,
      data: { message: "Order request failed" },
    };
  }
};

// =========================
// GET ALL ORDERS
// =========================
export const getOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      ...options,
    });

    const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      data: { message: "Failed to fetch orders" },
    };
  }
};

// =========================
// GET SINGLE ORDER
// =========================
export const getOrderById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      ...options,
    });

    const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      data: { message: "Failed to fetch order" },
    };
  }
};

// =========================
// DELETE ORDER
// =========================
export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "DELETE",
      ...options,
    });

    const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      data: { message: "Failed to delete order" },
    };
  }
};
