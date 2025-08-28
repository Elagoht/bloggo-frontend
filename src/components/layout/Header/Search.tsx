import { IconSearch } from "@tabler/icons-react";
import { FC, useEffect, useRef } from "react";

const Search: FC = () => {
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
      className="flex items-center max-w-sm min-w-0 group grow shrink"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="relative flex items-center grow bg-smoke-100 dark:bg-smoke-900 rounded-full shadow-sm border border-smoke-200/50 dark:border-smoke-700/50 group-focus-within:border-gopher-300 dark:group-focus-within:border-gopher-600 group-focus-within:shadow-md transition-all min-w-0">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search posts, categories..."
          className="flex-1 bg-transparent min-w-0 placeholder:text-smoke-400 dark:placeholder:text-smoke-500 h-8 rounded-l-full py-2 px-3 text-sm focus:outline-none"
        />

        <button
          type="submit"
          className="bg-gopher-600 hover:bg-gopher-700 dark:bg-gopher-500 dark:hover:bg-gopher-400 text-white h-6 w-6 rounded-full mr-1 flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          <IconSearch size={16} />
        </button>
      </div>
    </form>
  );
};

export default Search;
