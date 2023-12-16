export interface PaginateResponse<T> {
  data: T;
  links: Links;
  meta: Meta;
}
export interface SingleResponse<T> {
  data: T;
}

export interface Links {
  first: string;
  last?: string | null;
  prev?: string | null;
  next?: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
