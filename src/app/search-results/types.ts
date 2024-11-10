interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Store {
  id: number;
  name: string;
  slug: string;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
  name_en: string;
  name_ru: string;
}

interface Screenshot {
  id: number;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface SearchResultType {
  // slug: string;
  name: string;
  platforms: { platform: Platform }[];
  stores: { store: Store }[];
  released: string;
  background_image: string;
  metacritic: number;
  // suggestions_count: number;
  id: number;
  esrb_rating: EsrbRating;
  short_screenshots: Screenshot[];
  genres: Genre[];
}
