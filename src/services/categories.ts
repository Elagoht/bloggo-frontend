import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

export const getCategories = (filters?: RequestCategoryFilters) =>
  ApiCall.get<ResponseCategories>(
    `/categories${QueryString.stringify(filters, { skipNulls: true })}`
  );

export const getCategory = (slug: string) =>
  ApiCall.get<ResponseCategory>(`/categories/${slug}`);

export const postCategoryCreate = (
  name: string,
  spot: string,
  description: string
) =>
  ApiCall.post<ResponseCategoryCreated>("/categories", {
    name,
    spot,
    description,
  });
