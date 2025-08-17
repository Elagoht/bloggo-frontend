import { A } from "@solidjs/router";
import { Component } from "solid-js";

const NoCategoriesYet: Component = () => {
  return (
    <p class="bg-smoke-100 dark:bg-smoke-900 rounded-lg p-8 text-center text-smoke-800 dark:text-smoke-200 my-12">
      There's no category yet.{" "}
      <A
        class="text-gopher-500 hover:text-gopher-400 underline underline-offset-2 hover:underline-offset-4 transition-all"
        href="/categories/create"
      >
        Let's create one!
      </A>
    </p>
  );
};

export default NoCategoriesYet;
