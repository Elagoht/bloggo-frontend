import { NavigateFunction } from "react-router-dom";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { postLogout } from "../../../../services/session";
import { useAuthStore } from "../../../../stores/auth";

const profileMenu = [
  {
    name: "Profile",
    icon: IconUser,
    href: "/profile",
    role: "anchor" as const,
    type: "default" as const,
  },
  {
    name: "Logout",
    icon: IconLogout,
    work: (navigate: NavigateFunction) =>
      postLogout().then((response) => {
        if (!response.success) return;
        useAuthStore.getState().clearAuth();
        navigate("/auth/login", { replace: true });
      }),
    role: "button" as const,
    type: "danger" as const,
  },
];

export default profileMenu;
