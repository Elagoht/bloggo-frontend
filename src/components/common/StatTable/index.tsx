import { Icon, IconProps } from "@tabler/icons-react";
import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

interface StatTableColumn {
  key: string;
  title: string;
  render?: (value: any, item: any) => ReactNode;
}

interface StatTableProps {
  title: string;
  columns: StatTableColumn[];
  data: any[];
  maxRows?: number;
  icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

const StatTable: FC<StatTableProps> = ({
  title,
  columns,
  data,
  maxRows = 10,
  icon: Icon,
}) => {
  const displayData = data.slice(0, maxRows);

  return (
    <div className="bg-smoke-0 dark:bg-smoke-950 rounded-xl border border-smoke-200 dark:border-smoke-800 p-4">
      <h3 className="text-lg font-semibold text-smoke-900 dark:text-smoke-100 mb-4 flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
            <Icon size={20} />
          </div>
        )}
        {title}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-smoke-200 dark:border-smoke-800">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left py-3 px-2 text-xs font-medium text-smoke-500 dark:text-smoke-400 uppercase tracking-wide"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-smoke-100 dark:border-smoke-900 last:border-b-0 hover:bg-smoke-50 dark:hover:bg-smoke-900/50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-3 px-2 text-sm text-smoke-700 dark:text-smoke-300"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > maxRows && (
        <p className="text-xs text-smoke-500 dark:text-smoke-400 mt-4 text-center">
          Showing {maxRows} of {data.length} items
        </p>
      )}
    </div>
  );
};

export default StatTable;
