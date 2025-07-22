import { Component, createMemo } from "solid-js";
import Logo from "./Logo";
import Search from "./Search";
import ProfileMenu from "./ProfileMenu";
import { useStore } from "@nanostores/solid";
import { $auth } from "../../../stores/auth";

const Header: Component = () => {
  const auth = useStore($auth);

  return (
    <header class="fixed top-0 left-0 right-0 z-20 bg-smoke-50 dark:bg-smoke-950 flex items-center justify-between border-b border-smoke-200 dark:border-smoke-900 p-2.5">
      <Logo />
      <Search />
      <ProfileMenu name={auth().name} />
    </header>
  );
};

export default Header;
