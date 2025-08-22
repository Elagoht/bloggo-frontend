import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

export const getTags = (filters?: RequestTagFilters) =>
  ApiCall.get<ResponsePaginated<TagCard>>(
    `/tags${QueryString.stringify(filters, {
      skipNulls: true,
      addQueryPrefix: true,
    })}`
  );

export const getTag = (slug: string) =>
  ApiCall.get<ResponseTag>(`/tags/${slug}`);

export const postTagCreate = (name: string) =>
  ApiCall.post<ResponseTagCreated>("/tags", {
    name,
  });

export const patchTagUpdate = (slug: string, name: string) =>
  ApiCall.patch<ResponseTagCreated>(`/tags/${slug}`, {
    name,
  });

export const deleteTag = (slug: string) =>
  ApiCall.delete(`/tags/${slug}`);