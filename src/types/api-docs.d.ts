type APIDocumentation = {
  info: {
    title: string;
    version: string;
    description: string;
  };
  baseUrl: string;
  authentication: {
    type: string;
    header: string;
    description: string;
  };
  endpoints: APIEndpoint[];
};

type APIEndpoint = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  tag: string;
  summary: string;
  description: string;
  parameters?: APIParameter[];
  requestBody?: APIRequestBody;
  responses: Record<string, APIResponse>;
};

type APIParameter = {
  name: string;
  in: "query" | "path" | "header";
  type: string;
  required: boolean;
  default?: unknown;
  description: string;
};

type APIRequestBody = {
  required: boolean;
  schema: APISchema;
};

type APIResponse = {
  description: string;
  schema?: APISchema;
};

type APISchema = {
  type: string;
  properties?: Record<string, APISchemaProperty>;
  items?: APISchema;
  required?: boolean;
  nullable?: boolean;
  example?: unknown;
  maxLength?: number;
  format?: string;
  description?: string;
};

type APISchemaProperty = {
  type: string;
  nullable?: boolean;
  example?: unknown;
  items?: APISchema;
  properties?: Record<string, APISchemaProperty>;
  required?: boolean;
  maxLength?: number;
  format?: string;
  description?: string;
};
