export type Category = "best-deals" | "highest-rated" | "free-games";

export type Routes = Category | "wishlist";

export type Label =
  | "Best Deals"
  | "Highest Rated"
  | "Free Games"
  | "My Wishlist";

export type ResultsListType =
  | BestDealsType[]
  | FreeGameType[]
  | HighestRatedGameType[];

//* CHEAPSHARK API TYPES

export interface BestDealsType {
  // internalName: string;
  title: string;
  metacriticLink: string | null;
  dealID: string;
  // storeID: string;
  // gameID: string;
  salePrice: string;
  normalPrice: string;
  // isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string | null;
  steamRatingPercent: number;
  steamRatingCount: number;
  steamAppID: string | null;
  releaseDate: number;
  // lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface BestDealsDetailsType {
  gameInfo: {
    // storeID: string;
    // gameID: string;
    name: string;
    steamAppID: string | null;
    salePrice: string;
    retailPrice: string;
    steamRatingText: string | null;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string | null;
    releaseDate: number;
    // publisher: string;
    // steamworks: string;
    thumb: string;
  };
  cheaperStores: {
    dealID: string;
    storeID: string;
    salePrice: string;
    retailPrice: string;
  }[];
  cheapestPrice: {
    price: string;
    date: number;
  };
}

//* GAMERPOWER API TYPES

export interface FreeGameType {
  id: number;
  title: string;
  worth: string;
  // thumbnail: string;
  image: string;
  // description: string;
  // instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  // users: number;
  // status: string;
  // gamerpower_url: string;
  // open_giveaway: string;
}

export interface FreeGameDetailsType {
  id: number;
  title: string;
  worth: string;
  // thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  // users: number;
  // status: string;
  // gamerpower_url: string;
}

//* RAWG API TYPES

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

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

// interface AddedByStatus {
//   yet: number;
//   owned: number;
//   beaten: number;
//   toplay: number;
//   dropped: number;
//   playing: number;
// }

// interface Tag {
//   id: number;
//   name: string;
//   slug: string;
//   language: string;
//   games_count: number;
//   image_background: string;
// }

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

export interface HighestRatedGameType {
  // slug: string;
  name: string;
  // playtime: number;
  platforms: { platform: Platform }[];
  stores: { store: Store }[];
  released: string;
  // tba: boolean;
  background_image: string;
  // rating: number;
  // rating_top: number;
  ratings: Rating[];
  // ratings_count: number;
  // reviews_text_count: number;
  // added: number;
  // added_by_status: AddedByStatus;
  metacritic: number;
  // suggestions_count: number;
  // updated: string;
  id: number;
  // score: null | number;
  // clip: null | string;
  // tags: Tag[];
  esrb_rating: EsrbRating;
  // user_game: null | string;
  // reviews_count: number;
  // saturated_color: string;
  // dominant_color: string;
  short_screenshots: Screenshot[];
  // parent_platforms: { platform: Platform }[];
  genres: Genre[];
}

export interface MetacriticPlatformType {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export interface RatingType {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatusType {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface ParentPlatformType {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface PlatformType {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements: Record<string, string | null>;
}

export interface StoreType {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface DeveloperType {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface GenreType {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface TagType {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface PublisherType {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRatingType {
  id: number;
  name: string;
  slug: string;
}

export interface HighestRatedGameDetailsType {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatformType[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: RatingType[];
  reactions: Record<string, number>;
  added: number;
  added_by_status: AddedByStatusType;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: string | null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: ParentPlatformType[];
  platforms: PlatformType[];
  stores: StoreType[];
  developers: DeveloperType[];
  genres: GenreType[];
  tags: TagType[];
  publishers: PublisherType[];
  esrb_rating: EsrbRatingType;
  clip: string | null;
  description_raw: string;
}
