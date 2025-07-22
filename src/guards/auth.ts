import { type useNavigate } from "@solidjs/router";
import { postRefresh } from "../services/auth";
import { $auth } from "../stores/auth";

export async function useAuthGuard(
  navigate: ReturnType<typeof useNavigate>
): Promise<boolean> {
  const response = await postRefresh();

  if (!response.success) {
    $auth.set({
      accessToken: null,
      name: null,
      role: null,
      permissions: null,
    });
    navigate("/auth/login", { replace: true });
    return false;
  }

  $auth.set(response.data);
  return true;
}
