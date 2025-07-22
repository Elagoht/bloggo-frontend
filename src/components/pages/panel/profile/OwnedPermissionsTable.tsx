import { Component, For } from "solid-js";
import allPermissions from "./allPermissions";
import { IconCheck, IconCross, IconX } from "@tabler/icons-solidjs";

type OwnedPermissionsTableProps = {
  permissions: string[];
};

const OwnedPermissionsTable: Component<OwnedPermissionsTableProps> = ({
  permissions,
}) => {
  allPermissions;
  return (
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="bg-gopher-300 dark:bg-gopher-800 px-4 py-2 rounded-tl-xl border-r border-gopher-400 dark:border-gopher-900">
            Permission
          </th>

          <th class="bg-gopher-300 dark:bg-gopher-800 px-4 py-2 rounded-tr-xl">
            Have
          </th>
        </tr>
      </thead>

      <tbody>
        <For each={Object.entries(allPermissions)}>
          {(item) => (
            <tr class="even:bg-smoke-50 even:dark:bg-smoke-950 hover:!bg-gopher-200 hover:dark:!bg-gopher-900">
              <td class="px-2 py-1 border-r border-smoke-200 dark:border-smoke-900">
                {item[1]}
              </td>

              <td class="px-2 py-1">
                {permissions.includes(item[0]) ? (
                  <IconCheck class="text-success-500 mx-auto" />
                ) : (
                  <IconX class="text-danger-500 mx-auto" />
                )}
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default OwnedPermissionsTable;
