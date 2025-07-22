import ApiCall from "../utilities/apiCaller";

export const postRefresh = () => ApiCall.post<ResponseSession>("/auth/refresh");

export const postLogin = (email: string, passphrase: string) =>
  ApiCall.post<ResponseSession>("/auth/login", { email, passphrase });

export const postLogout = () => ApiCall.post<ResponseSession>("/auth/logout");
