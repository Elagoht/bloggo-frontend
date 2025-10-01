import classNames from "classnames";
import { FC } from "react";

type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type AuditLogTableHeaderProps = {
  columns: TableColumn[];
};

const AuditLogTableHeader: FC<AuditLogTableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-smoke-50 dark:bg-smoke-950 border-b border-smoke-200 dark:border-smoke-800">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={classNames(
              "px-6 py-3 text-left text-xs font-medium text-smoke-700 dark:text-white uppercase tracking-wider",
              column.className
            )}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default AuditLogTableHeader;
