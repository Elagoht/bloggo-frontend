import { useNavigate } from "@solidjs/router";
import { setAuth } from "../stores/auth";

export async function useAuthGuard() {
  const navigate = useNavigate();

  const res = await fetch("http://localhost:8723/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    setAuth({
      accessToken: data.accessToken,
      profile: data.profile,
      permissions: data.permissions,
    });
  } else {
    navigate("/auth/login", { replace: true });
  }
}
