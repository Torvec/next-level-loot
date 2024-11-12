//* CHEAPSHARK API TYPES

export interface GameDealType {
  // internalName: string;
  title: string;
  // metacriticLink: string | null;
  dealID: string;
  // storeID: string;
  // gameID: string;
  salePrice: string;
  normalPrice: string;
  // isOnSale: string;
  savings: string;
  // metacriticScore: string;
  // steamRatingText: string | null;
  // steamRatingPercent: string;
  // steamRatingCount: string;
  steamAppID: string | null;
  // releaseDate: number;
  // lastChange: number;
  dealRating: string;
  thumb: string;
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

// interface Rating {
//   id: number;
//   title: string;
//   count: number;
//   percent: number;
// }

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
  // ratings: Rating[];
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
