import apiCaller from "../utilities/apiCaller";

export const REMOVAL_REQUEST_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
} as const;

export const getRemovalRequestStatusText = (status: number): string => {
  switch (status) {
    case REMOVAL_REQUEST_STATUS.PENDING:
      return "Pending";
    case REMOVAL_REQUEST_STATUS.APPROVED:
      return "Approved";
    case REMOVAL_REQUEST_STATUS.REJECTED:
      return "Rejected";
    default:
      return "Unknown";
  }
};

export const getRemovalRequestStatusColor = (status: number): string => {
  switch (status) {
    case REMOVAL_REQUEST_STATUS.PENDING:
      return "warning";
    case REMOVAL_REQUEST_STATUS.APPROVED:
      return "success";
    case REMOVAL_REQUEST_STATUS.REJECTED:
      return "danger";
    default:
      return "primary";
  }
};

export const createRemovalRequest = async (
  data: CreateRemovalRequestRequest
): Promise<APIResponse<number>> => {
  return await apiCaller<number>("/removal-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getRemovalRequests = async (): Promise<
  APIResponse<RemovalRequestCard[]>
> => {
  return await apiCaller<RemovalRequestCard[]>("/removal-requests");
};

export const getUserRemovalRequests = async (): Promise<
  APIResponse<RemovalRequestCard[]>
> => {
  return await apiCaller<RemovalRequestCard[]>("/removal-requests/mine");
};

export const getRemovalRequestById = async (
  id: number
): Promise<APIResponse<RemovalRequestDetails>> => {
  return await apiCaller<RemovalRequestDetails>(`/removal-requests/${id}`);
};

export const approveRemovalRequest = async (
  id: number,
  data?: DecideRemovalRequestRequest
): Promise<APIResponse<void>> => {
  return await apiCaller<void>(`/removal-requests/${id}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
};

export const rejectRemovalRequest = async (
  id: number,
  data?: DecideRemovalRequestRequest
): Promise<APIResponse<void>> => {
  return await apiCaller<void>(`/removal-requests/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
};