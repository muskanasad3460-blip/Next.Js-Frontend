// const BASE_URL = "https://3b1e-39-35-157-120.ngrok-free.app/api";
// const getToken = () => localStorage.getItem("token");

// export async function getProfile() {
//   const res = await fetch(`${BASE_URL}/user/me`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });
//   return res.json();
// }

// export async function updateProfile(data: FormData) {
//   const res = await fetch(`${BASE_URL}/user/profile`, {
//     method: "PUT",
//     body: data,
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   return res.json();
// }

// export async function getAddress() {
//   const res = await fetch(`${BASE_URL}/address`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });

//   return res.json();
// }

// export async function updateAddress(data: any) {
//   const res = await fetch(`${BASE_URL}/address`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`,
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

const BASE_URL = "https://3b1e-39-35-157-120.ngrok-free.app/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

// =========================
// GET PROFILE
// =========================
export async function getProfile() {
  try {
    const res = await fetch(`${BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch profile",
    };
  }
}

// =========================
// UPDATE PROFILE
// =========================
export async function updateProfile(data: FormData) {
  try {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      body: data,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await res.json();

    return result;
  } catch (error) {
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
    const res = await fetch(`${BASE_URL}/address`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
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
    const res = await fetch(`${BASE_URL}/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update address",
    };
  }
}
