const API_URL = process.env.NEXT_PUBLIC_API_URL;

// LOGIN
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return {
    ok: res.ok,
    data: await res.json(),
  };
};

// SEND OTP
export const sendOtp = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_URL}/api/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return {
    ok: res.ok,
    data: await res.json(),
  };
};

// VERIFY OTP
export const verifyOtp = async (email: string, otp: string) => {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  return {
    ok: res.ok,
    data: await res.json(),
  };
};
