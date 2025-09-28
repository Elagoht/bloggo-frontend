type SearchResultType = 'tag' | 'category' | 'post' | 'user';

type SearchResult = {
  id: number;
  type: SearchResultType;
  title: string;
  slug?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
};

type SearchResponse = {
  results: SearchResult[];
  total: number;
};