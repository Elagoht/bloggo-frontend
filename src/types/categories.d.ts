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
  q?: string;
};

type ResponseCategories = CategoryCard[];
