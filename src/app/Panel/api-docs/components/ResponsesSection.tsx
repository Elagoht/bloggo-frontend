import { IconCode, IconSchema } from "@tabler/icons-react";
import { FC, useState } from "react";
import Button from "../../../../components/form/Button";
import { Response } from "../types";
import { generateJsonExample } from "../utils/jsonGenerator";
import { SchemaDisplay } from "./SchemaDisplay";

interface ResponsesSectionProps {
  responses: Record<string, Response>;
}

const statusCodeColors: Record<string, string> = {
  "2": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "4": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  "5": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

export const ResponsesSection: FC<ResponsesSectionProps> = ({ responses }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    Object.keys(responses)[0]
  );
  const [showJson, setShowJson] = useState(false);

  const getStatusColor = (status: string) => {
    const firstDigit = status.charAt(0);
    return statusCodeColors[firstDigit] || statusCodeColors["4"];
  };

  return (
    <div>
      <h4 className="text-xs font-bold text-smoke-800 dark:text-smoke-200 mb-2 uppercase tracking-wide">
        Responses
      </h4>

      {/* Status Code Tabs */}
      <div className="flex flex-wrap gap-2 mb-3">
        {Object.keys(responses).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shadow ${
              selectedStatus === status
                ? getStatusColor(status) + " shadow"
                : "bg-smoke-200 dark:bg-smoke-800 text-smoke-800 dark:text-smoke-200 hover:bg-smoke-300 dark:hover:bg-smoke-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Selected Response */}
      {selectedStatus && responses[selectedStatus] && (
        <div className="bg-white dark:bg-smoke-900 rounded p-3 shadow">
          <div className="mb-2">
            <div
              className={`inline-block px-2 py-0.5 rounded text-xs font-bold shadow ${getStatusColor(
                selectedStatus
              )}`}
            >
              {selectedStatus}
            </div>
            <p className="text-xs text-smoke-600 dark:text-smoke-400 mt-1">
              {responses[selectedStatus].description}
            </p>
          </div>

          {responses[selectedStatus].schema && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[10px] font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide">
                  Response Schema
                </h5>

                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowJson(!showJson);
                  }}
                  color={showJson ? "warning" : "success"}
                  iconRight={showJson ? IconSchema : IconCode}
                >
                  {showJson ? "Schema" : "JSON"}
                </Button>
              </div>
              {showJson ? (
                <pre className="bg-smoke-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(
                    generateJsonExample(responses[selectedStatus].schema!),
                    null,
                    2
                  )}
                </pre>
              ) : (
                <SchemaDisplay schema={responses[selectedStatus].schema!} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
