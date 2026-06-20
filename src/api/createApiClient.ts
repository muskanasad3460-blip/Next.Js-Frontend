
import { showToast } from "./toast";

interface ApiClientProps {
  path: string;
  method?: string;
  body?: any;
  headers?: HeadersInit;
}

export const createApiClient = async ({
  path,
  method = "GET",
  body,
  headers = {},
}: ApiClientProps) => {
  try {
    const isFormData = body instanceof FormData;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method,

      credentials: "include",

      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...headers,
      },

      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (error: any) {
    showToast("error", error.message || "Something went wrong");

    throw error;
  }
};
