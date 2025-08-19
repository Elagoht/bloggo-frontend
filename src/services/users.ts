import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

// Self user operations
export const getUserSelf = () => ApiCall.get<ResponseUserDetails>("/users/me");

export const patchUserAvatarSelf = (form: FormData) =>
  ApiCall.patch<void>("/users/me/avatar", form);

// Users management operations
export const getUsers = (filters?: RequestUserFilters) =>
  ApiCall.get<ResponsePaginated<ResponseUserCard>>(
    `/users${QueryString.stringify(filters, {
      skipNulls: true,
      addQueryPrefix: true,
    })}`
  );

export const getUser = (id: number) =>
  ApiCall.get<ResponseUserDetails>(`/users/${id}`);

export const postUserCreate = (userData: RequestUserCreate) =>
  ApiCall.post<ResponseUserCard>("/users", userData);

export const patchUserUpdate = (id: number, userData: RequestUserUpdate) =>
  ApiCall.patch<void>(`/users/${id}`, userData);

export const patchUserAvatar = (id: number, form: FormData) =>
  ApiCall.patch<void>(`/users/${id}/avatar`, form);

export const patchUserAssignRole = (
  id: number,
  roleData: RequestUserAssignRole
) => ApiCall.patch<void>(`/users/${id}/role`, roleData);

export const deleteUser = (id: number) => ApiCall.delete(`/users/${id}`);
