import ApiCall from "../utilities/apiCaller";

export const postRefresh = () =>
  ApiCall.post<ResponseSession>("/session/refresh");

export const postLogin = (email: string, passphrase: string) =>
  ApiCall.post<ResponseSession>("/session", { email, passphrase });

export const postLogout = () => ApiCall.delete<ResponseSession>("/session");
