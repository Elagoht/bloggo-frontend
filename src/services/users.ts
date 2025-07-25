import ApiCall from "../utilities/apiCaller";

export const getUserSelf = () => ApiCall.get<ResponseUser>("/users/me");

export const patchUserAvatarSelf = (form: FormData) =>
  ApiCall.patch<void>("/users/me/avatar", form);
