export interface APIDocumentation {
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
  endpoints: Endpoint[];
}

export interface Endpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  tag: string;
  summary: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
}

export interface Parameter {
  name: string;
  in: "query" | "path" | "header";
  type: string;
  required: boolean;
  default?: any;
  description: string;
}

export interface RequestBody {
  required: boolean;
  schema: Schema;
}

export interface Response {
  description: string;
  schema?: Schema;
}

export interface Schema {
  type: string;
  properties?: Record<string, SchemaProperty>;
  items?: Schema;
  required?: boolean;
  nullable?: boolean;
  example?: any;
  maxLength?: number;
  format?: string;
  description?: string;
}

export interface SchemaProperty {
  type: string;
  nullable?: boolean;
  example?: any;
  items?: Schema;
  properties?: Record<string, SchemaProperty>;
  required?: boolean;
  maxLength?: number;
  format?: string;
  description?: string;
}
