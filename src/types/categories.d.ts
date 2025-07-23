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

type ResponseCategories = CategoryCard[];

type ResponseCategory = {
  name: string;
  slug: string;
  spot: string;
  description: string;
  blogCount: number;
};
