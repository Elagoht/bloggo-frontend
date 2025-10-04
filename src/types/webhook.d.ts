export interface WebhookConfig {
  url: string;
  updatedAt: string;
}

export interface WebhookHeader {
  id: number;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookRequest {
  id: number;
  event: string;
  entity: string;
  entityId: number | null;
  slug: string | null;
  requestBody: string;
  responseStatus: number | null;
  responseBody: string | null;
  attemptCount: number;
  errorMessage: string | null;
  createdAt: string;
}

export interface WebhookRequestsResponse {
  data: WebhookRequest[];
  total: number;
  limit: number;
  offset: number;
}
