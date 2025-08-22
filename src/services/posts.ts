import ApiCall from "../utilities/apiCaller";

export interface PostCreateData {
  title: string;
  content?: string;
  cover?: File;
  description?: string;
  spot?: string;
  categoryId?: number;
}

export interface PostCreatedResponse {
  id: number;
}

export const createPost = (data: FormData) => {
  return ApiCall.post<PostCreatedResponse>("/posts", data);
};
