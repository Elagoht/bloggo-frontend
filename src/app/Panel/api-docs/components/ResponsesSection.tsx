import { FC, useState } from "react";
import { Response } from "../types";
import { SchemaDisplay } from "./SchemaDisplay";

interface ResponsesSectionProps {
  responses: Record<string, Response>;
}

const statusCodeColors: Record<string, string> = {
  "2": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
  "4": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700",
  "5": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
};

export const ResponsesSection: FC<ResponsesSectionProps> = ({ responses }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    Object.keys(responses)[0]
  );

  const getStatusColor = (status: string) => {
    const firstDigit = status.charAt(0);
    return statusCodeColors[firstDigit] || statusCodeColors["4"];
  };

  return (
    <div>
      <h4 className="text-sm font-bold text-smoke-800 dark:text-smoke-200 mb-3 uppercase tracking-wide">
        Responses
      </h4>

      {/* Status Code Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(responses).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all shadow-md ${
              selectedStatus === status
                ? getStatusColor(status) + " shadow-lg"
                : "bg-smoke-200 dark:bg-smoke-800 text-smoke-800 dark:text-smoke-200 border-smoke-400 dark:border-smoke-600 hover:bg-smoke-300 dark:hover:bg-smoke-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Selected Response */}
      {selectedStatus && responses[selectedStatus] && (
        <div className="bg-white dark:bg-smoke-900 border border-smoke-400 dark:border-smoke-600 rounded-lg p-4 shadow-md">
          <div className="mb-3">
            <div
              className={`inline-block px-3 py-1 rounded-md text-sm font-bold border shadow-md ${getStatusColor(
                selectedStatus
              )}`}
            >
              {selectedStatus}
            </div>
            <p className="text-sm text-smoke-600 dark:text-smoke-400 mt-2">
              {responses[selectedStatus].description}
            </p>
          </div>

          {responses[selectedStatus].schema && (
            <div>
              <h5 className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 mb-2 uppercase tracking-wide">
                Response Schema
              </h5>
              <SchemaDisplay schema={responses[selectedStatus].schema!} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
