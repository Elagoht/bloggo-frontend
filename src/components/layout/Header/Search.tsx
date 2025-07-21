import { IconSearch } from "@tabler/icons-solidjs";
import { Component, createEffect } from "solid-js";
import { createSignal } from "solid-js";

const Search: Component = () => {
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isK = event.key.toLowerCase() === "k";
      const isCmdK = isMac && event.metaKey && isK;
      const isCtrlK = !isMac && event.ctrlKey && isK;
      if (isCmdK || isCtrlK) {
        event.preventDefault();
        inputRef?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <form
      class="flex items-center"
      onsubmit={(event) => event.preventDefault()}
    >
      <input
        ref={(element) => (inputRef = element)}
        type="search"
        placeholder="Search  ⌘+K"
        class="bg-smoke-900 h-9 rounded-l-full py-2 px-4 text-sm focus:outline-smoke-800 outline-none"
      />

      <button
        type="submit"
        class="bg-smoke-900 hover:bg-smoke-800 focus:outline-smoke-800 h-9 rounded-r-full py-2 px-4 outline-none"
      >
        <IconSearch size={16} />
      </button>
    </form>
  );
};

export default Search;
