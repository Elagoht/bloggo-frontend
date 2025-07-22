import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ApiCall from "../utilities/apiCaller";
import { $auth } from "../stores/auth";

export function useAuthGuard(setReady: (value: boolean) => void) {
  const navigate = useNavigate();

  ApiCall.post<ResponseAccessToken>("/auth/refresh").then((response) => {
    if (!response.success) {
      navigate("/auth/login", { replace: true });
      return;
    }

    $auth.set({
      accessToken: response.data.accessToken,
      name: "Furkan",
      role: "Admin",
      permissions: [],
    });

    setReady(true); // Guard tamamlandı
  });
}
