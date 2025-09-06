import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

export const getAuditLogs = async (params: {
  page?: number;
  take?: number;
  order?: string;
  dir?: string;
}) => {
  return ApiCall.get<AuditLogsResponse>(
    `/audit/logs${QueryString.stringify({
      params,
    })}`
  );
};
