import { IconCheck, IconX } from "@tabler/icons-react";
import { FC } from "react";
import allPermissions from "./allPermissions";

type OwnedPermissionsTableProps = {
  permissions: string[];
};

const OwnedPermissionsTable: FC<OwnedPermissionsTableProps> = ({
  permissions,
}) => {
  allPermissions;
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="rounded-l-full bg-smoke-200 dark:bg-smoke-1000 text-right px-2 py-1">
            Permission
          </th>

          <th className="rounded-r-full bg-smoke-200 dark:bg-smoke-1000 text-left px-2 py-1">
            Is Owned
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(allPermissions).map(([key, value], index) => (
          <tr
            key={index}
            className="hover:bg-smoke-100 hover:dark:!bg-smoke-900 *:px-2 *:py-1"
          >
            <td className="text-right">{value}</td>

            <td>
              {permissions.includes(key) ? (
                <IconCheck className="text-success-500" />
              ) : (
                <IconX className="text-danger-500" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnedPermissionsTable;
