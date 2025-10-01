import { FC } from "react";
import { RequestBody } from "../types";
import { SchemaDisplay } from "./SchemaDisplay";

interface RequestBodySectionProps {
  requestBody: RequestBody;
}

export const RequestBodySection: FC<RequestBodySectionProps> = ({
  requestBody,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-bold text-smoke-800 dark:text-smoke-200 uppercase tracking-wide">
          Request Body
        </h4>
        {requestBody.required && (
          <span className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            required
          </span>
        )}
      </div>
      <SchemaDisplay schema={requestBody.schema} />
    </div>
  );
};
