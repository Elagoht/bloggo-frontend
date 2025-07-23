import { A } from "@solidjs/router";
import { Component } from "solid-js";

const CategoryCard: Component<CategoryCard> = ({
  name,
  slug,
  spot,
  blogCount,
}) => {
  return (
    <A
      href={`/categories/edit/${slug}`}
      class="flex flex-col bg-smoke-0 dark:bg-smoke-950 rounded-lg p-2 gap-2"
    >
      <hgroup class="flex gap-2 items-center">
        <strong class="w-full">{name}</strong>

        <span class="shrink-0 invert bg-smoke-100 dark:bg-smoke-950 px-2 rounded">
          {blogCount} Post{blogCount > 1 && "s"}
        </span>
      </hgroup>

      <p class="bg-smoke-100 dark:bg-smoke-900 px-1 rounded h-full line-clamp-2">
        {spot}
      </p>
    </A>
  );
};

export default CategoryCard;
