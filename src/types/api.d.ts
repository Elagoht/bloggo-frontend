type ApiResponse<T> = { status: number } & (
  | { success: true; data: T }
  | { success: false; error: { message: string } }
);

type ResponsePaginated<T> = {
  data: T[];
  page: number;
  take: number;
  total: number;
};
