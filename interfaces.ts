export interface ResponseAPI<T = any> {
  data: T;
  message?: string;
  meta?: Meta;
}

export interface Meta {
  total: number;
  currentPage: number;
  nextPageUrl: string | null;
}

export interface Source {
  id: number;
  name: string;
  url: string;
  image: string | null;
}

export interface Article {
  id: string;
  title: string;
  image: string | null;
  date: string;
  tags: string[];
  source: Source;
  sourceUrl: string;
  articleCategory: ArticleCategory;
}

export interface ArticleCategory {
  id: number;
  slug: string;
  name: string;
}

export interface BaseParams {
  search?: string;
  page: number;
  perPage: number;
}

export interface ArticleParams extends BaseParams {
  category?: string;
}
