type ResponsePostCreated = {
  id: number;
};

type PostCard = {
  postId: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  title?: string;
  slug?: string;
  coverImage?: string;
  spot?: string;
  status: number;
  readCount: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id?: number;
    name?: string;
    slug?: string;
  };
};

type PostDetails = {
  postId: number;
  versionId: number;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  title: string;
  slug?: string;
  content?: string;
  coverImage?: string;
  description?: string;
  spot?: string;
  status: number;
  readCount: number;
  createdAt?: string;
  updatedAt?: string;
  category: {
    id?: number;
    name?: string;
    slug?: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
};

type RequestPostFilters = {
  page?: number;
  take?: number;
  order?: string;
  dir?: string;
  q?: string;
  status?: number;
  categoryId?: number;
  authorId?: number;
};

enum PostStatus {
  DRAFT = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
  SCHEDULED = 4,
  PUBLISHED = 5,
}

type PostVersionCard = {
  id: string;
  versionAuthor: {
    id: number;
    name: string;
    avatar?: string;
  };
  title?: string;
  status: number;
  updatedAt: string;
  coverImage?: string;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  };
};

type ResponsePostVersions = {
  currentVersionId: number;
  createdAt: string;
  originalAuthor: {
    id: number;
    name: string;
    avatar?: string;
  };
  versions: PostVersionCard[];
};

type PostVersionDetails = {
  versionId: number;
  duplicatedFrom: null | number;
  versionAuthor: {
    id: number;
    name: string;
    avatar: string;
  };
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  description: string;
  spot: string;
  status: number;
  statusChangedAt: string | null;
  statusChangedBy: {
    id: number;
    name: string;
    avatar?: string;
  } | null;
  statusChangeNote: string | null;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
};
