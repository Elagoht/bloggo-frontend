import ApiCall from "../utilities/apiCaller";

export const REMOVAL_REQUEST_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
} as const;

export const createRemovalRequest = (data: CreateRemovalRequestRequest) =>
  ApiCall.post<number>("/removal-requests", data);

export const getRemovalRequests = (params?: {
  page?: number;
  take?: number;
  order?: string;
  dir?: "asc" | "desc";
  q?: string;
  status?: number;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.take) searchParams.set("take", params.take.toString());
  if (params?.order) searchParams.set("order", params.order);
  if (params?.dir) searchParams.set("dir", params.dir);
  if (params?.q) searchParams.set("q", params.q);
  if (params?.status !== undefined) searchParams.set("status", params.status.toString());

  const queryString = searchParams.toString();
  const url = queryString ? `/removal-requests?${queryString}` : "/removal-requests";

  return ApiCall.get<{
    data: RemovalRequestCard[];
    total: number;
    page: number;
    take: number;
  }>(url);
};

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
