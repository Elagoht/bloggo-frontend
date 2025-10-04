import { FC } from "react";

interface SchemaDisplayProps {
  schema: APISchema;
  level?: number;
}

export const SchemaDisplay: FC<SchemaDisplayProps> = ({
  schema,
  level = 0,
}) => {
  const renderProperty = (
    key: string,
    prop: APISchemaProperty,
    currentLevel: number
  ) => {
    const indent = currentLevel;

    return (
      <div key={key} style={{ marginLeft: `${indent}rem` }}>
        <div className="flex items-start gap-1.5 flex-wrap">
          <code className="text-xs font-mono font-semibold text-gopher-600 dark:text-gopher-400">
            {key}
          </code>
          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {prop.type}
            {prop.format && ` (${prop.format})`}
          </span>
          {prop.nullable && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-smoke-100 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400">
              nullable
            </span>
          )}
          {prop.required && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              required
            </span>
          )}
          {prop.maxLength && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              max: {prop.maxLength}
            </span>
          )}
        </div>

        {prop.description && (
          <p
            className="text-xs text-smoke-500 dark:text-smoke-400"
            style={{ marginLeft: `${indent}rem` }}
          >
            {prop.description}
          </p>
        )}

        {prop.example !== undefined && (
          <code className="text-xs bg-smoke-100 dark:bg-smoke-800 px-1.5 py-0.5 rounded text-smoke-700 dark:text-smoke-300 inline-block ml-4">
            Ex: {JSON.stringify(prop.example)}
          </code>
        )}

        {/* Nested object properties */}
        {prop.type === "object" && prop.properties && (
          <div className="flex flex-col gap-1.5 mt-2">
            {Object.entries(prop.properties).map(([nestedKey, nestedProp]) =>
              renderProperty(nestedKey, nestedProp, currentLevel + 1)
            )}
          </div>
        )}

        {/* Array items */}
        {prop.type === "array" && prop.items && (
          <div className="flex flex-col gap-1.5 mt-2 ml-4">
            <div className="text-xs text-smoke-500 dark:text-smoke-400">
              Array items:
            </div>
            {prop.items.properties &&
              Object.entries(prop.items.properties).map(([itemKey, itemProp]) =>
                renderProperty(itemKey, itemProp, currentLevel + 1)
              )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-smoke-100 dark:bg-smoke-950 rounded p-2 font-mono text-xs shadow-inner flex flex-col gap-1">
      {schema.type === "object" && schema.properties ? (
        <div className="flex flex-col gap-1.5">
          {Object.entries(schema.properties).map(([key, prop]) =>
            renderProperty(key, prop, level)
          )}
        </div>
      ) : schema.type === "array" && schema.items ? (
        <div className="flex flex-col gap-1.5">
          <div className="text-xs text-smoke-500 dark:text-smoke-400">
            Array of:
          </div>
          {schema.items.properties &&
            Object.entries(schema.items.properties).map(([key, prop]) =>
              renderProperty(key, prop, level)
            )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {schema.type}
          </span>

          {schema.example !== undefined && (
            <code className="text-xs ml-4">
              Ex: {JSON.stringify(schema.example)}
            </code>
          )}
        </div>
      )}
    </div>
  );
};
