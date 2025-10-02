import { FC } from "react";
import { Parameter } from "../types";

interface ParametersSectionProps {
  parameters: Parameter[];
}

export const ParametersSection: FC<ParametersSectionProps> = ({
  parameters,
}) => {
  return (
    <div>
      <h4 className="text-xs font-bold text-smoke-800 dark:text-smoke-200 mb-2 uppercase tracking-wide">
        Parameters
      </h4>
      <div className="flex flex-wrap gap-1">
        {parameters.map((param, index) => (
          <div
            key={index}
            className="bg-white dark:bg-smoke-900 shadow rounded p-2"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <code className="text-xs font-mono font-semibold text-gopher-600 dark:text-gopher-400">
                {param.name}
              </code>
              <span className="text-xs px-1.5 rounded bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
                {param.in}
              </span>
              <span className="text-xs px-1.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {param.type}
              </span>
              {param.required && (
                <span className="text-xs px-1.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                  required
                </span>
              )}
              {param.default !== undefined && (
                <span className="text-xs px-1.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  default: {JSON.stringify(param.default)}
                </span>
              )}
            </div>
            {param.description && (
              <p className="text-xs text-smoke-600 dark:text-smoke-400 mt-1">
                {param.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
