const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProfile() {
  try {
    const res = await fetch(`${API_URL}/api/user/me`, {
      method: "GET",
      credentials: "include",
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

export async function updateProfile(formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "PUT",
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
