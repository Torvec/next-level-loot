export type Category =
  | "best-deals"
  | "highest-rated"
  | "free-games"
  | "wishlist";

export type Label =
  | "Best Deals"
  | "Highest Rated"
  | "Free Games"
  | "My Wishlist";

//* CHEAPSHARK API TYPES

// [
//   {
//     internalName: "DECEIVEINC",
//     title: "Deceive Inc.",
//     metacriticLink: "/game/deceive-inc/",
//     dealID: "Tg7sxMt4bXeuSrflI1uOXan2mPm7E5aD6krFAoaEDFk%3D",
//     storeID: "25",
//     gameID: "256950",
//     salePrice: "0.00",
//     normalPrice: "19.99",
//     isOnSale: "1",
//     savings: "100.000000",
//     metacriticScore: "75",
//     steamRatingText: "Very Positive",
//     steamRatingPercent: "85",
//     steamRatingCount: "4436",
//     steamAppID: "820520",
//     releaseDate: 1679356800,
//     lastChange: 1730997423,
//     dealRating: "10.0",
//     thumb:
//       "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/820520/capsule_sm_120.jpg?t=1709320483",
//   },
// ];

export interface GameDealType {
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

// {
//   "gameInfo": {
//     "storeID": "30",
//     "gameID": "213521",
//     "name": "SWORD ART ONLINE Alicization Lycoris - Deluxe Edition",
//     "steamAppID": null,
//     "salePrice": "19.94",
//     "retailPrice": "104.99",
//     "steamRatingText": null,
//     "steamRatingPercent": "0",
//     "steamRatingCount": "0",
//     "metacriticScore": "0",
//     "metacriticLink": null,
//     "releaseDate": 0,
//     "publisher": "N/A",
//     "steamworks": "1",
//     "thumb": "https://sttc.gamersgate.com/images/product/sword-art-online-alicization-lycoris-deluxe-edition/cover-180-a72c06.jpg"
//   },
//   "cheaperStores": [
//     {
//       "dealID": "kZXTyJQ58Px%2BQHG5W%2BRz5DM8xLlOSE7fNCrx5hZCF%2Fs%3D",
//       "storeID": "15",
//       "salePrice": "18.89",
//       "retailPrice": "104.99"
//     },
//     {
//       "dealID": "kbMsPqTDz5dPEwjBPWgocMc2ZfqRUwIhHXBAtjfv0yU%3D",
//       "storeID": "34",
//       "salePrice": "18.90",
//       "retailPrice": "104.99"
//     }
//   ],
//   "cheapestPrice": {
//     "price": "13.53",
//     "date": 1700586326
//   }
// }

export interface GameDealDetailsType {
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

// [
//   {
//     id: 2983,
//     title: "Spirit of the North Steam Key Giveaway",
//     worth: "$19.99",
//     thumbnail: "https://www.gamerpower.com/offers/1/6732260fe8899.jpg",
//     image: "https://www.gamerpower.com/offers/1b/6732260fe8899.jpg",
//     description:
//       "Fanatical is giving away free Steam keys for Spirit of the North! To claim your Steam key you just to subscribe to their newsletter! Spirit of the North is a indie single-player adventure game inspired by the landscapes of Iceland!",
//     instructions:
//       '1. Login into your Fanatical account and subscribe to their newsletter\r\n2. Link a valid Steam account and unlock your Steam key!\r\n3. Launch the Steam client and click the Games menu option.\r\n4. Choose "activate a Product on Steam" to redeem your Steam key.',
//     open_giveaway_url:
//       "https://www.gamerpower.com/open/spirit-of-the-north-steam-key-giveaway",
//     published_date: "2024-11-11 10:43:12",
//     type: "Game",
//     platforms: "PC, Steam",
//     end_date: "2024-11-15 23:59:00",
//     users: 11360,
//     status: "Active",
//     gamerpower_url:
//       "https://www.gamerpower.com/spirit-of-the-north-steam-key-giveaway",
//     open_giveaway:
//       "https://www.gamerpower.com/open/spirit-of-the-north-steam-key-giveaway",
//   },
// ];

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

// {
//   "id": 2983,
//   "title": "Spirit of the North Steam Key Giveaway",
//   "worth": "$19.99",
//   "thumbnail": "https://www.gamerpower.com/offers/1/6732260fe8899.jpg",
//   "image": "https://www.gamerpower.com/offers/1b/6732260fe8899.jpg",
//   "description": "Fanatical is giving away free Steam keys for Spirit of the North! To claim your Steam key you just to subscribe to their newsletter! Spirit of the North is a indie single-player adventure game inspired by the landscapes of Iceland!",
//   "instructions": "1. Login into your Fanatical account and subscribe to their newsletter\r\n2. Link a valid Steam account and unlock your Steam key!\r\n3. Launch the Steam client and click the Games menu option.\r\n4. Choose \"activate a Product on Steam\" to redeem your Steam key.",
//   "open_giveaway_url": "https://www.gamerpower.com/open/spirit-of-the-north-steam-key-giveaway",
//   "published_date": "2024-11-11 10:43:12",
//   "type": "Game",
//   "platforms": "PC, Steam",
//   "end_date": "2024-11-15 23:59:00",
//   "users": 11360,
//   "status": "Active",
//   "gamerpower_url": "https://www.gamerpower.com/spirit-of-the-north-steam-key-giveaway"
// }

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

// {
//  "count": 537778,
//   "next": "https://api.rawg.io/api/games?key=5a057ad3a7d64a2a885ff92668a9468b&ordering=-metacritic&page=2&page_size=24&platforms=4%2C+187%2C186%2C+7",
//   "previous": null,
//   "results": [
//     {
//       "slug": "the-legend-of-zelda-ocarina-of-time",
//       "name": "The Legend of Zelda: Ocarina of Time",
//       "playtime": 7,
//       "platforms": [
//         {
//           "platform": {
//             "id": 7,
//             "name": "Nintendo Switch",
//             "slug": "nintendo-switch"
//           }
//         },
//         {
//           "platform": {
//             "id": 83,
//             "name": "Nintendo 64",
//             "slug": "nintendo-64"
//           }
//         }
//       ],
//       "stores": [
//         {
//           "store": {
//             "id": 6,
//             "name": "Nintendo Store",
//             "slug": "nintendo"
//           }
//         }
//       ],
//       "released": "1998-11-21",
//       "tba": false,
//       "background_image": "https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg",
//       "rating": 4.39,
//       "rating_top": 5,
//       "ratings": [
//         {
//           "id": 5,
//           "title": "exceptional",
//           "count": 534,
//           "percent": 64.65
//         },
//         {
//           "id": 4,
//           "title": "recommended",
//           "count": 186,
//           "percent": 22.52
//         },
//         {
//           "id": 3,
//           "title": "meh",
//           "count": 54,
//           "percent": 6.54
//         },
//         {
//           "id": 1,
//           "title": "skip",
//           "count": 52,
//           "percent": 6.3
//         }
//       ],
//       "ratings_count": 819,
//       "reviews_text_count": 5,
//       "added": 1749,
//       "added_by_status": {
//         "yet": 115,
//         "owned": 451,
//         "beaten": 753,
//         "toplay": 208,
//         "dropped": 173,
//         "playing": 49
//       },
//       "metacritic": 99,
//       "suggestions_count": 344,
//       "updated": "2024-11-08T16:18:35",
//       "id": 25097,
//       "score": null,
//       "clip": null,
//       "tags": [
//         {
//           "id": 31,
//           "name": "Singleplayer",
//           "slug": "singleplayer",
//           "language": "eng",
//           "games_count": 230678,
//           "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
//         }
//       ],
//       "esrb_rating": {
//         "id": 1,
//         "name": "Everyone",
//         "slug": "everyone",
//         "name_en": "Everyone",
//         "name_ru": "Для всех"
//       },
//       "user_game": null,
//       "reviews_count": 826,
//       "saturated_color": "0f0f0f",
//       "dominant_color": "0f0f0f",
//       "short_screenshots": [
//         {
//           "id": -1,
//           "image": "https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg"
//         },
//         {
//           "id": 248572,
//           "image": "https://media.rawg.io/media/screenshots/aff/aff922f4dfbc562ab31b5b924adbfe93.jpg"
//         },
//         {
//           "id": 248573,
//           "image": "https://media.rawg.io/media/screenshots/40a/40aa860328a2295da73336d4060bd973.jpg"
//         },
//         {
//           "id": 248574,
//           "image": "https://media.rawg.io/media/screenshots/e72/e72b59594b6abdedf8adbfd5a0e53251.jpg"
//         },
//         {
//           "id": 248575,
//           "image": "https://media.rawg.io/media/screenshots/070/070de3718e543e7ac533d09a8758775f.jpg"
//         },
//         {
//           "id": 248576,
//           "image": "https://media.rawg.io/media/screenshots/f75/f75e8f877f1851461aba7579ef604f77.jpg"
//         },
//         {
//           "id": 248577,
//           "image": "https://media.rawg.io/media/screenshots/f26/f26c6649ce30ae53204aa7f76350b2fd.jpg"
//         }
//       ],
//       "parent_platforms": [
//         {
//           "platform": {
//             "id": 7,
//             "name": "Nintendo",
//             "slug": "nintendo"
//           }
//         }
//       ],
//       "genres": [
//         {
//           "id": 3,
//           "name": "Adventure",
//           "slug": "adventure"
//         },
//         {
//           "id": 4,
//           "name": "Action",
//           "slug": "action"
//         },
//         {
//           "id": 5,
//           "name": "RPG",
//           "slug": "role-playing-games-rpg"
//         }
//       ]
//     },
//  {REST OF THE RESULTS},
// }

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

// {
//   "id": 25097,
//   "slug": "the-legend-of-zelda-ocarina-of-time",
//   "name": "The Legend of Zelda: Ocarina of Time",
//   "name_original": "The Legend of Zelda: Ocarina of Time",
//   "description": "<p>As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.</p>",
//   "metacritic": 99,
//   "metacritic_platforms": [
//     {
//       "metascore": 99,
//       "url": "https://www.metacritic.com/game/nintendo-64/the-legend-of-zelda-ocarina-of-time",
//       "platform": {
//         "platform": 83,
//         "name": "Nintendo 64",
//         "slug": "nintendo-64"
//       }
//     }
//   ],
//   "released": "1998-11-21",
//   "tba": false,
//   "updated": "2024-11-08T16:18:35",
//   "background_image": "https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg",
//   "background_image_additional": "https://media.rawg.io/media/screenshots/027/027d98b047ff674113dd77d2d4614276.jpg",
//   "website": "",
//   "rating": 4.39,
//   "rating_top": 5,
//   "ratings": [
//     {
//       "id": 5,
//       "title": "exceptional",
//       "count": 534,
//       "percent": 64.65
//     },
//     {
//       "id": 4,
//       "title": "recommended",
//       "count": 186,
//       "percent": 22.52
//     },
//     {
//       "id": 3,
//       "title": "meh",
//       "count": 54,
//       "percent": 6.54
//     },
//     {
//       "id": 1,
//       "title": "skip",
//       "count": 52,
//       "percent": 6.3
//     }
//   ],
//   "reactions": {
//     "1": 1,
//     "3": 2,
//     "4": 1,
//     "7": 1,
//     "11": 2,
//     "12": 2
//   },
//   "added": 1749,
//   "added_by_status": {
//     "yet": 115,
//     "owned": 451,
//     "beaten": 753,
//     "toplay": 208,
//     "dropped": 173,
//     "playing": 49
//   },
//   "playtime": 7,
//   "screenshots_count": 23,
//   "movies_count": 0,
//   "creators_count": 39,
//   "achievements_count": 0,
//   "parent_achievements_count": 0,
//   "reddit_url": "https://www.reddit.com/r/zelda",
//   "reddit_name": "",
//   "reddit_description": "",
//   "reddit_logo": "",
//   "reddit_count": 4559,
//   "twitch_count": 166,
//   "youtube_count": 1000000,
//   "reviews_text_count": 7,
//   "ratings_count": 819,
//   "suggestions_count": 344,
//   "alternative_names": [
//     "Ocarina of Time",
//     "ocarina of time"
//   ],
//   "metacritic_url": "https://www.metacritic.com/game/nintendo-64/the-legend-of-zelda-ocarina-of-time",
//   "parents_count": 0,
//   "additions_count": 2,
//   "game_series_count": 26,
//   "user_game": null,
//   "reviews_count": 826,
//   "saturated_color": "0f0f0f",
//   "dominant_color": "0f0f0f",
//   "parent_platforms": [
//     {
//       "platform": {
//         "id": 7,
//         "name": "Nintendo",
//         "slug": "nintendo"
//       }
//     }
//   ],
//   "platforms": [
//     {
//       "platform": {
//         "id": 7,
//         "name": "Nintendo Switch",
//         "slug": "nintendo-switch",
//         "image": null,
//         "year_end": null,
//         "year_start": null,
//         "games_count": 5537,
//         "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
//       },
//       "released_at": "1998-11-21",
//       "requirements": {}
//     },
//     {
//       "platform": {
//         "id": 83,
//         "name": "Nintendo 64",
//         "slug": "nintendo-64",
//         "image": null,
//         "year_end": null,
//         "year_start": null,
//         "games_count": 363,
//         "image_background": "https://media.rawg.io/media/screenshots/c1f/c1fd8b15793743563367688b3dd5faa6.jpg"
//       },
//       "released_at": "1998-11-21",
//       "requirements": {}
//     }
//   ],
//   "stores": [
//     {
//       "id": 29484,
//       "url": "",
//       "store": {
//         "id": 6,
//         "name": "Nintendo Store",
//         "slug": "nintendo",
//         "domain": "nintendo.com",
//         "games_count": 9074,
//         "image_background": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg"
//       }
//     }
//   ],
//   "developers": [
//     {
//       "id": 16257,
//       "name": "Nintendo",
//       "slug": "nintendo",
//       "games_count": 425,
//       "image_background": "https://media.rawg.io/media/games/0b7/0b746092287560e4ff5a6ceb5faaed8e.jpg"
//     }
//   ],
//   "genres": [
//     {
//       "id": 4,
//       "name": "Action",
//       "slug": "action",
//       "games_count": 183448,
//       "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
//     },
//     {
//       "id": 3,
//       "name": "Adventure",
//       "slug": "adventure",
//       "games_count": 143227,
//       "image_background": "https://media.rawg.io/media/games/48c/48cb04ca483be865e3a83119c94e6097.jpg"
//     },
//     {
//       "id": 5,
//       "name": "RPG",
//       "slug": "role-playing-games-rpg",
//       "games_count": 57742,
//       "image_background": "https://media.rawg.io/media/games/21c/21cc15d233117c6809ec86870559e105.jpg"
//     }
//   ],
//   "tags": [
//     {
//       "id": 31,
//       "name": "Singleplayer",
//       "slug": "singleplayer",
//       "language": "eng",
//       "games_count": 230678,
//       "image_background": "https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg"
//     }
//   ],
//   "publishers": [
//     {
//       "id": 10681,
//       "name": "Nintendo",
//       "slug": "nintendo",
//       "games_count": 1228,
//       "image_background": "https://media.rawg.io/media/games/3bb/3bb2c8d774c3a83eb2c17d0d3d51f020.jpg"
//     }
//   ],
//   "esrb_rating": {
//     "id": 1,
//     "name": "Everyone",
//     "slug": "everyone"
//   },
//   "clip": null,
//   "description_raw": "As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages."
// }

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
