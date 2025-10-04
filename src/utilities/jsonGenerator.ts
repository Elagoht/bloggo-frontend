export function generateJsonExample(schema: APISchema): unknown {
  if (schema.example !== undefined) {
    return schema.example;
  }

  if (schema.type === "object" && schema.properties) {
    const result: Record<PropertyKey, unknown> = {};
    Object.entries(schema.properties).forEach(([key, prop]) => {
      result[key] = generatePropertyExample(prop);
    });
    return result;
  }

  if (schema.type === "array" && schema.items) {
    return [generateJsonExample(schema.items)];
  }

  return getDefaultValue(schema.type);
}

function generatePropertyExample(prop: APISchemaProperty): unknown {
  if (prop.example !== undefined) {
    return prop.example;
  }

  if (prop.type === "object" && prop.properties) {
    const result: Record<PropertyKey, unknown> = {};
    Object.entries(prop.properties).forEach(([key, nestedProp]) => {
      result[key] = generatePropertyExample(nestedProp);
    });
    return result;
  }

  if (prop.type === "array" && prop.items) {
    if (prop.items.properties) {
      const itemResult: Record<PropertyKey, unknown> = {};
      Object.entries(prop.items.properties).forEach(([key, itemProp]) => {
        itemResult[key] = generatePropertyExample(itemProp);
      });
      return [itemResult];
    }
    return [generateJsonExample(prop.items)];
  }

  if (prop.nullable) {
    return null;
  }

  return getDefaultValue(prop.type, prop.format);
}

function getDefaultValue(type: string, format?: string): unknown {
  switch (type) {
    case "string":
      if (format === "date-time") {
        return "2024-01-15T10:00:00Z";
      }
      return "string";
    case "integer":
      return 0;
    case "number":
      return 0.0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return null;
  }
}
