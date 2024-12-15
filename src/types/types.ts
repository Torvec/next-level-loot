//* CATEGORY TYPES

export type Category = "deals" | "games" | "giveaways";

export type Routes = Category | "wishlist";

//* CUSTOM BUTTON PROP TYPES

export interface ScoreBoxButtonProps {
  title: string;
  apiLink?: string;
  score: string | number | null;
  reviewSourceName: string;
  reviewSourceBaseURL: string;
  reviewSourceSearch: string;
}

export interface RedirectButtonProps {
  url: string;
  displayText: string;
}

export interface DetailsButtonProps {
  path: string;
  id: string | number;
}

//* WISHLIST TYPES

export interface WishlistItemType {
  id: string | number;
  title: string;
  src: string;
  path: string;
  store?: string;
  type?: string;
  price?: string | number;
  timestamp: number;
}

export interface WishlistAction {
  type: string;
  item?: WishlistItemType;
  index?: number;
  payload?: WishlistItemType[];
}

//* THEME TYPES

export type Themes = "" | "light" | "dark";

export interface ThemeAction {
  type: string;
  theme: Themes;
}

//* FETCH DATA TYPES

export interface FetchDataProps {
  category: Category;
  searchTerm?: string;
  selectedSort?: string;
  selectedOrder?: string;
  selectedFilters?: Record<string, string[]>;
  id?: string;
}

//* QUERY TYPES

export interface QueryOption {
  name: string;
  type?: string;
  default?: string;
  options: { name: string; value: string }[];
}

export interface QueryParam {
  apiKey?: {
    name: string;
    value: string;
  };
  sort?: QueryOption;
  order?: QueryOption;
  filters?: QueryOption[];
  search?: {
    name: string;
    placeholder: string;
  };
  details?: {
    name: string;
  };
}

export interface Query {
  baseURL: string;
  endPoints: {
    default: string;
    details?: string;
  };
  headers?: Record<string, Record<string, string>>;
  queryParams: QueryParam;
}

//* QUERY OPTIONS FORM TYPES

export interface QueryOptionsFormProps {
  category: Category;
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface QueryOptionProps {
  params: URLSearchParams;
  filter: QueryOption;
}

export interface QueryOptionButtonProps {
  params: URLSearchParams;
  filter: QueryOption;
  typeText: string;
}

export interface QueryOptionListProps {
  params: URLSearchParams;
  filter: QueryOption;
}

export interface FilterResetButtonProps {
  category: Category;
  params: URLSearchParams;
}

export interface GetCurrentValueProps {
  params: URLSearchParams;
  key: string;
  options: { name: string; value: string }[];
}

export interface GetUpdatedQueryProps {
  params: URLSearchParams;
  key: string;
  value: string;
}

export interface IsSelectedProps {
  params: URLSearchParams;
  key: string;
  value: string;
}
