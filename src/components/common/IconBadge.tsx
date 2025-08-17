import { Component, ParentComponent } from "solid-js";

type IconBadgeProps = ParentComponent<{
  icon: Component;
}>;

const IconBadge: IconBadgeProps = ({ icon }) => {
  return (
    <figure class="p-2 bg-gopher-300 dark:bg-gopher-900 rounded-lg border border-gopher-400 dark:border-gopher-700">
      {icon({})}
    </figure>
  );
};

export default IconBadge;
