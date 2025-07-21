import { Component } from "solid-js";
import Logo from "./Logo";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";

const Header: Component = () => {
  return (
    <header class="fixed top-0 left-0 right-0 z-20 bg-smoke-50 dark:bg-smoke-950 flex items-center justify-between border-b border-smoke-200 dark:border-smoke-900 p-3">
      <Logo />

      <Search />

      <ProfileMenu name="Furkan Baytekin" />
    </header>
  );
};

export default Header;
