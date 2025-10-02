import { IconCode, IconSchema } from "@tabler/icons-react";
import { FC, useState } from "react";
import Button from "../../../../components/form/Button";
import { RequestBody } from "../types";
import { generateJsonExample } from "../utils/jsonGenerator";
import { SchemaDisplay } from "./SchemaDisplay";

interface RequestBodySectionProps {
  requestBody: RequestBody;
}

export const RequestBodySection: FC<RequestBodySectionProps> = ({
  requestBody,
}) => {
  const [showJson, setShowJson] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-bold text-smoke-800 dark:text-smoke-200 uppercase tracking-wide">
            Request Body
          </h4>

          {requestBody.required && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              required
            </span>
          )}
        </div>

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
          {JSON.stringify(generateJsonExample(requestBody.schema), null, 2)}
        </pre>
      ) : (
        <SchemaDisplay schema={requestBody.schema} />
      )}
    </>
  );
};
