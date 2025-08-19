// Request Types
type RequestUserFilters = {
  q?: string;
  order?: string;
  dir?: string;
  page?: number;
  take?: number;
};

type RequestUserCreate = {
  name: string;
  email: string;
  avatar?: string;
  passphrase?: string;
  roleId: number;
};

type RequestUserUpdate = {
  name?: string;
  email?: string;
};

type RequestUserAssignRole = {
  roleId: number;
};

// Response Types
type ResponseUserCard = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  roleId: number;
  roleName: string;
  writtenPostCount: number;
  publishedPostCount: number;
};

type ResponseUserDetails = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  roleId: number;
  roleName: string;
  writtenPostCount: number;
  publishedPostCount: number;
};

// Role Types
type Role = {
  id: number;
  name: string;
};
