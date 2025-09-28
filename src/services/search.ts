import ApiCall from "../utilities/apiCaller";

export const searchGlobal = async (
  query: string,
  limit: number = 10
): Promise<ApiResponse<SearchResponse>> => {
  const params = new URLSearchParams();
  params.append("q", query);
  params.append("limit", limit.toString());

  return ApiCall.get<SearchResponse>(`/search?${params.toString()}`);
};
