import { For, ParentComponent } from "solid-js";
import { asideMenu } from "./aside";
import { A, useLocation } from "@solidjs/router";
import classNames from "classnames";

const Aside: ParentComponent = () => {
  const location = useLocation();

  return (
    <aside class="flex flex-col w-64 p-4 bg-smoke-50 dark:bg-smoke-950 h-[calc(100dvh-4rem)] overflow-auto sticky top-16">
      <nav class="flex flex-col gap-2">
        <For each={asideMenu}>
          {(item) => (
            <A
              href={item.href}
              class={classNames(
                "flex items-center whitespace-nowrap gap-3.5 rounded-lg py-1 px-4",
                {
                  "bg-gopher-200 text-gopher-800": location.pathname.startsWith(
                    item.href
                  ),
                  "text-gopher-900 dark:text-gopher-100 hover:bg-smoke-100 dark:hover:bg-smoke-900":
                    !location.pathname.startsWith(item.href),
                }
              )}
            >
              <item.icon size={20} stroke-width={2} /> {item.name}
            </A>
          )}
        </For>
      </nav>
    </aside>
  );
};

export default Aside;
