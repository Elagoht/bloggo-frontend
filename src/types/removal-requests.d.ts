interface RemovalRequestCard {
  id: number;
  postVersionId: number;
  postTitle: string;
  requestedBy: UserInfo;
  note?: string;
  status: number;
  decidedBy?: UserInfo;
  decisionNote?: string;
  decidedAt?: string;
  createdAt: string;
}

interface RemovalRequestDetails {
  id: number;
  postVersionId: number;
  postTitle: string;
  postWriter: UserInfo;
  postCoverUrl?: string;
  postCategory?: string;
  requestedBy: UserInfo;
  note?: string;
  status: number;
  decidedBy?: UserInfo;
  decisionNote?: string;
  decidedAt?: string;
  createdAt: string;
}

interface UserInfo {
  id: number;
  name: string;
  avatar?: string;
}

interface CreateRemovalRequestRequest {
  postVersionId: number;
  note: string;
}

interface DecideRemovalRequestRequest {
  decisionNote?: string;
}

// Constants for removal request status
declare const REMOVAL_REQUEST_STATUS: {
  readonly PENDING: 0;
  readonly APPROVED: 1;
  readonly REJECTED: 2;
};

type RemovalRequestStatus = typeof REMOVAL_REQUEST_STATUS[keyof typeof REMOVAL_REQUEST_STATUS];