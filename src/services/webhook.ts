import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";
import {
  WebhookConfig,
  WebhookHeader,
  WebhookRequest,
  WebhookRequestsResponse,
} from "../types/webhook";

export const getConfig = () => ApiCall.get<WebhookConfig>("/webhook/config");

export const updateConfig = (url: string) =>
  ApiCall.put<{ message: string }>("/webhook/config", { url });

export const getHeaders = () => ApiCall.get<WebhookHeader[]>("/webhook/headers");

export const bulkUpsertHeaders = (items: { key: string; value: string }[]) =>
  ApiCall.put<{ message: string }>("/webhook/headers", { items });

export const fireWebhook = () =>
  ApiCall.post<{ message: string }>("/webhook/fire");

export const getRequests = (
  limit: number = 20,
  offset: number = 0,
  search?: string
) => {
  const queryString = QueryString.stringify(
    { limit, offset, search },
    { addQueryPrefix: true, skipNulls: true }
  );
  return ApiCall.get<WebhookRequestsResponse>(`/webhook/requests${queryString}`);
};

export const getRequestById = (id: number) =>
  ApiCall.get<WebhookRequest>(`/webhook/requests/${id}`);
