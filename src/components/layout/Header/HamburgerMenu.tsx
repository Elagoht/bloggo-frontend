import { IconMenu2, IconX } from "@tabler/icons-react";
import { FC } from "react";
import { useMobileStore } from "../../../stores/mobile";

const HamburgerMenu: FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileStore();

  return (
    <button
      className="md:hidden shrink-0 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-smoke-100 dark:hover:bg-smoke-900 transition-colors focus:outline-none border border-transparent hover:border-smoke-200 dark:hover:border-smoke-700"
      onClick={toggleMobileMenu}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? (
        <IconX size={20} className="text-smoke-700 dark:text-smoke-300" />
      ) : (
        <IconMenu2 size={20} className="text-smoke-700 dark:text-smoke-300" />
      )}
    </button>
  );
};

export default HamburgerMenu;
