const API_URL = process.env.NEXT_PUBLIC_API_URL;

// =========================
// TOKEN HELPER
// =========================
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

// =========================
// AUTH HEADERS
// =========================
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// =========================
// GET PROFILE
// =========================
export async function getProfile() {
  try {
    const res = await fetch(`${API_URL}/api/user/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch profile",
    };
  }
}

// =========================
// UPDATE PROFILE
// =========================
export async function updateProfile(formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}

// =========================
// GET ADDRESS
// =========================
export async function getAddress() {
  try {
    const res = await fetch(`${API_URL}/api/address`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch address",
    };
  }
}

// =========================
// UPDATE ADDRESS
// =========================
export async function updateAddress(data: {
  country: string;
  city: string;
  postalCode: string;
  taxId?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/api/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update address",
    };
  }
}
