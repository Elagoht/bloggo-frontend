import { FC } from "react";
import { useAuthStore } from "../../../stores/auth";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import Search from "./Search";

const Header: FC = () => {
  const { name } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-smoke-50/90 dark:bg-smoke-950/90 flex items-center justify-between border-b border-smoke-200/50 dark:border-smoke-800/50 p-2.5 backdrop-blur gap-2.5">
      <div className="flex items-center shrink-0">
        <HamburgerMenu />
        <Logo />
      </div>

      <Search />

      <ProfileMenu name={name || "User"} />
    </header>
  );
};

export default Header;
