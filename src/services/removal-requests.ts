import ApiCall from "../utilities/apiCaller";

export const REMOVAL_REQUEST_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
} as const;

export const createRemovalRequest = (data: CreateRemovalRequestRequest) =>
  ApiCall.post<number>("/removal-requests", data);

export const getRemovalRequests = () =>
  ApiCall.get<RemovalRequestCard[]>("/removal-requests");

export const getUserRemovalRequests = () =>
  ApiCall.get<RemovalRequestCard[]>("/removal-requests/mine");

export const getRemovalRequestById = (id: number) =>
  ApiCall.get<RemovalRequestDetails>(`/removal-requests/${id}`);

export const approveRemovalRequest = (
  id: number,
  data?: DecideRemovalRequestRequest
) => ApiCall.post<void>(`/removal-requests/${id}/approve`, data);

export const rejectRemovalRequest = (
  id: number,
  data?: DecideRemovalRequestRequest
) => ApiCall.post<void>(`/removal-requests/${id}/reject`, data);
