import QueryString from "qs";
import ApiCall from "../utilities/apiCaller";

type PostCreatedResponse = {
  id: number;
};

export const getPosts = (filters?: RequestPostFilters) =>
  ApiCall.get<ResponsePaginated<PostCard>>(
    `/posts${QueryString.stringify(filters, {
      skipNulls: true,
      addQueryPrefix: true,
    })}`
  );

export const getPost = (slug: string) =>
  ApiCall.get<PostDetails>(`/posts/${slug}`);

export const getPostVersions = (postId: number) =>
  ApiCall.get<ResponsePostVersions>(`/posts/${postId}/versions`);

export const createPost = (data: FormData) => {
  return ApiCall.post<PostCreatedResponse>("/posts", data);
};

export const updatePost = (
  postId: number,
  data: {
    title?: string;
    content?: string;
    spot?: string;
    description?: string;
    categoryId?: string;
    coverImage?: string;
  }
) => ApiCall.patch<ResponsePostCreated>(`/posts/${postId}`, data);

export const deletePost = (postId: number) =>
  ApiCall.delete(`/posts/${postId}`);

export const changePostStatus = (
  postId: number,
  status: number,
  note?: string
) =>
  ApiCall.patch<ResponsePostCreated>(`/posts/${postId}/status`, {
    status,
    note,
  });

export const getPostVersion = (postId: number, versionId: string) =>
  ApiCall.get<PostVersionDetails>(`/posts/${postId}/versions/${versionId}`);

export const createVersionFromLatest = (postId: number) =>
  ApiCall.post<ResponsePostCreated>(`/posts/${postId}/versions`);

export const createVersionFromSpecificVersion = (versionId: number) =>
  ApiCall.post<ResponsePostCreated>(`/posts/versions/${versionId}/duplicate`);

export const updatePostVersion = (
  postId: number,
  versionId: string,
  data: FormData
) =>
  ApiCall.patch<ResponsePostCreated>(
    `/posts/${postId}/versions/${versionId}`,
    data
  );

export const deletePostVersion = (postId: number, versionId: string) =>
  ApiCall.delete<ResponseVersionDeleted>(`/posts/${postId}/versions/${versionId}`);

export const submitVersionForReview = (postId: number, versionId: string) =>
  ApiCall.post(`/posts/${postId}/versions/${versionId}/submit`);

export const approveVersion = (
  postId: number,
  versionId: string,
  note?: string
) =>
  ApiCall.post(`/posts/${postId}/versions/${versionId}/approve`, {
    versionId: parseInt(versionId),
    note: note || "",
  });

export const rejectVersion = (
  postId: number,
  versionId: string,
  note?: string
) =>
  ApiCall.post(`/posts/${postId}/versions/${versionId}/reject`, {
    versionId: parseInt(versionId),
    note: note || "",
  });

export const publishVersion = (
  postId: number,
  versionId: string,
  publishedAt?: string
) =>
  ApiCall.post(`/posts/${postId}/versions/${versionId}/publish`, {
    publishedAt,
  });

export const getGenerativeFill = (
  postId: number,
  versionId: string,
  categories?: string[]
) => {
  const params = new URLSearchParams();
  if (categories && categories.length > 0) {
    params.set("categories", categories.join(","));
  }

  const queryString = params.toString();
  const url = `/posts/${postId}/versions/${versionId}/generative-fill${
    queryString ? `?${queryString}` : ""
  }`;

  return ApiCall.get<{
    title: string;
    metaDescription: string;
    spot: string;
    suggestedCategory: string;
  }>(url);
};

export const assignTagsToPost = (postId: number, tagIds: number[]) =>
  ApiCall.post(`/posts/${postId}/tags`, { tagIds });

export const updateVersionCategory = (
  postId: number,
  versionId: string,
  categoryId: number
) =>
  ApiCall.patch(`/posts/${postId}/versions/${versionId}/category`, {
    categoryId,
  });
