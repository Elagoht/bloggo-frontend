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
      <h4 className="text-sm font-bold text-smoke-800 dark:text-smoke-200 mb-3 uppercase tracking-wide">
        Parameters
      </h4>
      <div className="space-y-3">
        {parameters.map((param, index) => (
          <div
            key={index}
            className="bg-white dark:bg-smoke-900 border border-smoke-400 dark:border-smoke-600 rounded-lg p-4 shadow-md"
          >
            <div className="flex items-start gap-3 flex-wrap">
              <code className="text-sm font-mono font-semibold text-gopher-600 dark:text-gopher-400">
                {param.name}
              </code>
              <span className="text-xs px-2 py-0.5 rounded bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
                {param.in}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {param.type}
              </span>
              {param.required && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                  required
                </span>
              )}
              {param.default !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  default: {JSON.stringify(param.default)}
                </span>
              )}
            </div>
            {param.description && (
              <p className="text-sm text-smoke-600 dark:text-smoke-400 mt-2">
                {param.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
