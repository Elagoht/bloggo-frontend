import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import { useAuthStore } from "../../../stores/auth";

const Header: React.FC = () => {
  const { name } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-smoke-50 dark:bg-smoke-950 flex items-center justify-between border-b border-smoke-200 dark:border-smoke-900 p-2.5">
      <Logo />
      <Search />
      <ProfileMenu name={name || "User"} />
    </header>
  );
};

export default Header;
