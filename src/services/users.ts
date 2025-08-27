import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

// Self user operations
export const getUserSelf = () => ApiCall.get<UserDetails>("/users/me");

export const patchUserAvatarSelf = (form: FormData) =>
  ApiCall.patch<{ avatar: string }>("/users/me/avatar", form);

export const deleteUserAvatarSelf = () =>
  ApiCall.delete<void>("/users/me/avatar");

// Users management operations
export const getUsers = (filters?: RequestUserFilters) =>
  ApiCall.get<ResponsePaginated<UserCard>>(
    `/users${QueryString.stringify(filters, {
      skipNulls: true,
      addQueryPrefix: true,
    })}`
  );

export const getUser = (id: number) => ApiCall.get<UserDetails>(`/users/${id}`);

export const postUserCreate = (userData: RequestUserCreate) =>
  ApiCall.post<UserCard>("/users", userData);

export const patchUserUpdate = (id: number, userData: RequestUserUpdate) =>
  ApiCall.patch<void>(`/users/${id}`, userData);

export const patchUserAvatar = (id: number, form: FormData) =>
  ApiCall.patch<void>(`/users/${id}/avatar`, form);

export const patchUserAssignRole = (
  id: number,
  roleData: RequestUserAssignRole
) => ApiCall.patch<void>(`/users/${id}/role`, roleData);

export const patchUserChangePassword = (
  id: number,
  passwordData: { newPassword: string }
) => ApiCall.patch<void>(`/users/${id}/password`, passwordData);

export const deleteUserAvatar = (id: number) =>
  ApiCall.delete<void>(`/users/${id}/avatar`);

export const deleteUser = (id: number) => ApiCall.delete(`/users/${id}`);
