import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import ApiCall from "../utilities/apiCaller";
import { $auth } from "../stores/auth";
import { postRefresh } from "../services/auth";

export function useAuthGuard(setReady: (value: boolean) => void) {
  const navigate = useNavigate();

  postRefresh().then((response) => {
    if (!response.success) {
      $auth.set({
        accessToken: null,
        name: null,
        role: null,
        permissions: null,
      });
      navigate("/auth/login", { replace: true });
      return;
    }

    $auth.set(response.data);

    setReady(true); // Guard tamamlandı
  });
}
