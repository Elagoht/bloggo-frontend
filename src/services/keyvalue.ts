import ApiCall from "../utilities/apiCaller";

export interface KeyValue {
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface KeyValueUpsert {
  key: string;
  value: string;
}

export const getKeyValues = () => ApiCall.get<KeyValue[]>("/key-values");

export const bulkUpsertKeyValues = (items: KeyValueUpsert[]) =>
  ApiCall.post<{ message: string }>("/key-values/bulk", { items });
