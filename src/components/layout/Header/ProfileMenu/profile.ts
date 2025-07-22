import { type Navigator } from "@solidjs/router";
import { IconLogout, IconUser } from "@tabler/icons-solidjs";
import ApiCall from "../../../../utilities/apiCaller";
import { PreinitializedWritableAtom } from "nanostores";

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
    work: (
      navigate: Navigator,
      authStore: PreinitializedWritableAtom<unknown>
    ) =>
      ApiCall.post<void>("/auth/logout").then((response) => {
        if (!response.success) return;
        navigate("/auth/login", { replace: true });
        authStore.set({});
      }),
    role: "button",
    type: "danger",
  },
];

export default profileMenu;
