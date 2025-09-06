import ApiCall from "../utilities/apiCaller";

export const getDashboardStats = async () => {
  return ApiCall.get<DashboardStats>("/dashboard/stats");
};
