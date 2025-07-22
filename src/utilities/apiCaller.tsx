import { useStore } from "@nanostores/solid";
import { $auth } from "../stores/auth";

class ApiCall {
  static apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8723";

  static async request<T>(
    path: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: object | FormData
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {};

    let finalBody: BodyInit | null = null;
    if (body instanceof FormData) {
      finalBody = body;
    } else if (body) {
      headers["Content-Type"] = "application/json";
      finalBody = JSON.stringify(body);
    }

    const auth = useStore($auth);

    if (auth().accessToken) {
      headers["Authorization"] = `Bearer ${auth().accessToken}`;
    }

    const res = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers,
      body: finalBody,
      credentials: "include",
    });

    const contentType = res.headers.get("Content-Type") || "";

    let result: any = null;
    try {
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text();
      }
    } catch {
      result = null;
    }

    if (!res.ok) {
      return {
        success: false,
        error: { message: result?.message ?? "Unknown Error" },
      };
    }

    return {
      success: true,
      data: result as T,
    };
  }

  static get<T>(path: string) {
    return this.request<T>(path, "GET");
  }

  static post<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "POST", body);
  }

  static put<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "PUT", body);
  }

  static patch<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "PATCH", body);
  }

  static delete<T>(path: string) {
    return this.request<T>(path, "DELETE");
  }
}

export default ApiCall;
