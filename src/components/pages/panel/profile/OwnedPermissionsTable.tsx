import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import allPermissions from "./allPermissions";

type OwnedPermissionsTableProps = {
  permissions: string[];
};

const OwnedPermissionsTable: React.FC<OwnedPermissionsTableProps> = ({
  permissions,
}) => {
  allPermissions;
  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th className="bg-gopher-300 dark:bg-gopher-800 px-4 py-2 rounded-tl-xl border-r border-gopher-400 dark:border-gopher-900">
            Permission
          </th>

          <th className="bg-gopher-300 dark:bg-gopher-800 px-4 py-2 rounded-tr-xl">
            Have
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(allPermissions).map(([key, value], index) => (
          <tr
            key={index}
            className="even:bg-smoke-50 even:dark:bg-smoke-950 hover:!bg-gopher-200 hover:dark:!bg-gopher-900"
          >
            <td className="px-2 py-1 border-r border-smoke-200 dark:border-smoke-900">
              {value}
            </td>

            <td className="px-2 py-1">
              {permissions.includes(key) ? (
                <IconCheck className="text-success-500 mx-auto" />
              ) : (
                <IconX className="text-danger-500 mx-auto" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnedPermissionsTable;
