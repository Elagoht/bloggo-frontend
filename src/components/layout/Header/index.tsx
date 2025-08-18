import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import { useAuthStore } from "../../../stores/auth";

const Header: React.FC = () => {
  const { name } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-smoke-50/90 dark:bg-smoke-950/90 flex items-center justify-between border-b border-smoke-200/50 dark:border-smoke-800/50 p-2.5 backdrop-blur">
      <Logo />

      <Search />

      <ProfileMenu name={name || "User"} />
    </header>
  );
};

export default Header;
