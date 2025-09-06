import { IconLogout, IconUser } from "@tabler/icons-react";
import { postLogout } from "../../../../services/session";
import { useAuthStore } from "../../../../stores/auth";

const profileMenu = [
  {
    name: "Profile",
    icon: IconUser,
    href: "/profile",
    role: "anchor",
    type: "default",
  },
  {
    name: "Logout",
    icon: IconLogout,
    work: () =>
      postLogout().then((response) => {
        if (!response.success) return;
        useAuthStore.getState().clearAuth();
        window.location.href = "/auth/login";
      }),
    role: "button",
    type: "danger",
  },
];

export default profileMenu;
