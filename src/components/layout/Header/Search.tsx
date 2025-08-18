import React, { useRef, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isK = event.key.toLowerCase() === "k";
      const isCmdK = isMac && event.metaKey && isK;
      const isCtrlK = !isMac && event.ctrlKey && isK;
      if (isCmdK || isCtrlK) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <form
      className="flex items-center"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        ref={inputRef}
        type="search"
        placeholder="Search  ⌘+K"
        className="bg-smoke-100 dark:bg-smoke-900 placeholder:text-smoke-200 dark:placeholder:text-smoke-400 h-8 rounded-l-full py-2 px-4 text-sm focus:outline-smoke-800 outline-none"
      />

      <button
        type="submit"
        className="bg-smoke-100 dark:bg-smoke-900 hover:bg-smoke-800 focus:outline-smoke-800 h-8 rounded-r-full py-2 px-4 outline-none"
      >
        <IconSearch size={18} />
      </button>
    </form>
  );
};

export default Search;
