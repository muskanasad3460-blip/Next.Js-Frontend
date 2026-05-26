const BASE_URL = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("token");

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}

export async function updateProfile(data: FormData) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "PUT",
    body: data,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function getAddress() {
  const res = await fetch(`${BASE_URL}/address`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
}

export async function updateAddress(data: any) {
  const res = await fetch(`${BASE_URL}/address`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
