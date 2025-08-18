type ResponseCategoryCreated = {
  id: number;
};

type CategoryCard = {
  name: string;
  slug: string;
  spot: string;
  blogCount: number;
};

type RequestCategoryFilters = {
  page?: number;
  take?: number;
  order?: string;
  dir?: string;
  q?: string;
};

type ResponseCategory = {
  id: string;
  name: string;
  slug: string;
  spot: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  blogCount: number;
};
