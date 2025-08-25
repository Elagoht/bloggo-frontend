type ResponseTagCreated = {
  id: number;
};

type TagCard = {
  name: string;
  slug: string;
  blogCount: number;
};

type RequestTagFilters = {
  page?: number;
  take?: number;
  order?: string;
  dir?: string;
  q?: string;
};

type ResponseTag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  blogCount: number;
};
