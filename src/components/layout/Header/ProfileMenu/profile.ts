import { IconLogout, IconUser } from "@tabler/icons-solidjs";

const profileMenu = [
  {
    name: "Profile",
    icon: IconUser,
    href: "/profile",
    type: 0,
  },
  {
    name: "Logout",
    icon: IconLogout,
    href: "/logout",
    type: 1,
  },
];

export default profileMenu;
