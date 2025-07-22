import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

export const getCategories = (filters?: {
  page?: number;
  take?: number;
  q?: string;
}) =>
  ApiCall.get(
    `/categories${QueryString.stringify(filters, { skipNulls: true })}`
  );
