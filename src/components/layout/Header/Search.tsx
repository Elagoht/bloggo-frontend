import { FC, useEffect, useRef } from "react";
import SearchDropdown from "../../common/SearchDropdown";

const Search: FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isK = event.key.toLowerCase() === "k";
      const isCmdK = isMac && event.metaKey && isK;
      const isCtrlK = !isMac && event.ctrlKey && isK;
      if (isCmdK || isCtrlK) {
        event.preventDefault();
        // Focus the search input inside SearchDropdown
        const input = searchRef.current?.querySelector('input');
        input?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div
      ref={searchRef}
      className="flex items-center max-w-sm min-w-0 group grow shrink"
    >
      <SearchDropdown
        placeholder="Search posts, categories, tags, users..."
        className="w-full"
      />
    </div>
  );
};

export default Search;
