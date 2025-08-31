import ApiCall from "../utilities/apiCaller";

// Get all statistics (requires statistics:view-total permission)
export const getAllStatistics = () =>
  ApiCall.get<ResponseAllStatistics>("/statistics");

// Get user's own statistics (requires statistics:view-self permission)  
export const getUserOwnStatistics = () =>
  ApiCall.get<ResponseAuthorStatistics>("/statistics/me");

// Get statistics for a specific author (requires statistics:view-others permission)
export const getAuthorStatistics = (authorId: string) =>
  ApiCall.get<ResponseAuthorStatistics>(`/statistics/author/${authorId}`);