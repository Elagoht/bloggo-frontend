class ApiCall {
  private static apiUrl =
    import.meta.env.VITE_API_URL || "http://localhost:8723";
  private static authToken: string | null = null;
  private static isRefreshing: boolean = false;
  private static refreshPromise: Promise<boolean> | null = null;

  public static setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private static async refreshToken(): Promise<boolean> {
    if (this.isRefreshing) {
      // If already refreshing, wait for the existing promise
      return this.refreshPromise || Promise.resolve(false);
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private static async performRefresh(): Promise<boolean> {
    try {
      const refreshRes = await fetch(`${this.apiUrl}/session/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        return false;
      }

      const refreshData = await refreshRes.json();

      // Update auth store with new tokens
      const { useAuthStore } = await import("../stores/auth");
      useAuthStore.getState().setAuth(refreshData);

      return true;
    } catch {
      return false;
    }
  }

  private static async request<T>(
    path: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: object | FormData,
    isRetry: boolean = false
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {};

    let finalBody: BodyInit | null = null;
    if (body instanceof FormData) {
      finalBody = body;
    } else if (body) {
      headers["Content-Type"] = "application/json";
      finalBody = JSON.stringify(body);
    }

    if (this.authToken) {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }

    const res = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers,
      body: finalBody,
      credentials: "include",
    });

    const contentType = res.headers.get("Content-Type") || "";

    let result = null;
    try {
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text();
      }
    } catch {
      result = null;
    }

    // Handle 401 errors with token refresh and retry
    if (
      !res.ok &&
      res.status === 401 &&
      this.authToken &&
      !isRetry &&
      path !== "/session/refresh"
    ) {
      const refreshSuccess = await this.refreshToken();

      if (refreshSuccess) {
        // Retry the original request with the new token
        return this.request<T>(path, method, body, true);
      } else {
        // Refresh failed, clear auth and redirect to login
        const { useAuthStore } = await import("../stores/auth");
        useAuthStore.getState().clearAuth();

        // Only redirect if we're not already on the login page
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }
      }
    }

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: {
          message: result?.message ?? "Unknown Error",
          details: result?.details,
        },
      };
    }

    return {
      success: true,
      status: res.status,
      data: result as T,
    };
  }

  public static get<T>(path: string) {
    return this.request<T>(path, "GET");
  }

  public static post<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "POST", body);
  }

  public static put<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "PUT", body);
  }

  public static patch<T>(path: string, body?: object | FormData) {
    return this.request<T>(path, "PATCH", body);
  }

  public static delete<T>(path: string) {
    return this.request<T>(path, "DELETE");
  }
}

export default ApiCall;
