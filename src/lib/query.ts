import { type Category } from "@/lib/types";

export interface OptionType {
  name: string;
  type?: string;
  default?: string;
  options: { name: string; value: string }[];
}

export interface QueryParamType {
  apiKey?: {
    name: string;
    value: string;
  };
  sort?: OptionType;
  order?: OptionType;
  filters?: OptionType[];
  search?: {
    name: string;
    placeholder: string;
  };
  details?: {
    name: string;
  };
}

export interface QueryType {
  baseURL: string;
  endPoints: {
    default: string;
    details?: string;
  };
  headers?: Record<string, Record<string, string>>;
  queryParams: QueryParamType;
}

export const query: Record<Category, QueryType> = {
  deals: {
    baseURL: "https://www.cheapshark.com/api/1.0/",
    endPoints: {
      default: "deals",
      details: "deals?id=",
    },
    queryParams: {
      sort: {
        name: "sortBy",
        type: "Sort",
        default: "Deal Rating",
        options: [
          { name: "Deal Rating", value: "DealRating" },
          { name: "Title", value: "Title" },
          { name: "Savings", value: "Savings" },
          { name: "Price", value: "Price" },
          { name: "Metacritic Score", value: "Metacritic" },
          { name: "Steam Reviews", value: "Reviews" },
          { name: "Release", value: "Release" },
          { name: "Store", value: "Store" },
          { name: "Recent", value: "Recent" },
        ],
      },
      order: {
        name: "desc",
        type: "Order",
        default: "Descending",
        options: [
          { name: "Descending", value: "0" },
          { name: "Ascending", value: "1" },
        ],
      },
      filters: [
        {
          name: "storeID",
          default: "All",
          type: "Store",
          options: [
            { name: "Steam", value: "1" },
            { name: "GamersGate", value: "2" },
            { name: "Green Man Gaming", value: "3" },
            // { name: "Amazon", value: "4" },
            // { name: "GameStop", value: "5" },
            // { name: "Direct2Drive", value: "6" },
            { name: "GoG", value: "7" },
            { name: "Origin", value: "8" },
            // { name: "Get Games", value: "9" },
            // { name: "Shiny Loot", value: "10" },
            { name: "Humble Bundle", value: "11" },
            // { name: "Desura", value: "12" },
            { name: "Uplay", value: "13" },
            // { name: "Indie Game Stand", value: "14" },
            { name: "Fanatical", value: "15" },
            // { name: "Games Rocket", value: "16" },
            // { name: "Games Republic", value: "17" },
            // { name: "Sila Games", value: "18" },
            // { name: "Playfield", value: "19" },
            // { name: "Imperial Games", value: "20" },
            { name: "Win Game Store", value: "21" },
            // { name: "FunStock Digital", value: "22" },
            { name: "GameBillet", value: "23" },
            { name: "Voidu", value: "24" },
            { name: "Epic Games Store", value: "25" },
            // { name: "Razer Game Store", value: "26" },
            { name: "Games Planet", value: "27" },
            { name: "Gamesload", value: "28" },
            { name: "2Game", value: "29" },
            { name: "IndieGala", value: "30" },
            { name: "Blizzard Shop", value: "31" },
            // { name: "All You Play", value: "32" },
            { name: "DLGamer", value: "33" },
            { name: "Noctre", value: "34" },
            { name: "Dreamgame", value: "35" },
          ],
        },
      ],
      search: {
        name: "title",
        placeholder: "Search for deals",
      },
    },
  },
  games: {
    baseURL: "https://api.rawg.io/api/",
    endPoints: {
      default: "games",
      details: "games/",
    },
    queryParams: {
      apiKey: {
        name: "key",
        value: process.env.RAWG_API_KEY || "",
      },
      sort: {
        name: "ordering",
        type: "Sort",
        default: "None",
        options: [
          { name: "Name (Asc)", value: "name" },
          { name: "Released (Asc)", value: "released" },
          { name: "Added (Asc)", value: "added" },
          { name: "Created (Asc)", value: "created" },
          { name: "Updated (Asc)", value: "updated" },
          { name: "Rating (Asc)", value: "rating" },
          { name: "Metacritic (Asc)", value: "metacritic" },
          { name: "Name (Dsc)", value: "-name" },
          { name: "Released (Dsc)", value: "-released" },
          { name: "Added (Dsc)", value: "-added" },
          { name: "Created (Dsc)", value: "-created" },
          { name: "Updated (Dsc)", value: "-updated" },
          { name: "Rating (Dsc)", value: "-rating" },
          { name: "Metacritic (Dsc)", value: "-metacritic" },
        ],
      },
      filters: [
        {
          name: "platforms",
          type: "Platform",
          default: "All",
          options: [
            { name: "Xbox One", value: "1" },
            { name: "iOS", value: "3" },
            { name: "PC", value: "4" },
            { name: "Mac OS", value: "5" },
            { name: "Linux", value: "6" },
            { name: "Nintendo Switch", value: "7" },
            { name: "Nintendo 3DS", value: "8" },
            { name: "Nintendo DS", value: "9" },
            { name: "Wii U", value: "10" },
            { name: "Wii", value: "11" },
            { name: "Neo Geo", value: "12" },
            { name: "Nintendo DSi", value: "13" },
            { name: "Xbox 360", value: "14" },
            { name: "Playstation 2", value: "15" },
            { name: "Playstation 3", value: "16" },
            { name: "PSP", value: "17" },
            { name: "Playstation 4", value: "18" },
            { name: "PS Vita", value: "19" },
            { name: "Android", value: "21" },
            { name: "Atari Flashback", value: "22" },
            { name: "Atari 2600", value: "23" },
            { name: "Gameboy Advance", value: "24" },
            { name: "Atari 8-bit", value: "25" },
            { name: "Gameboy", value: "26" },
            { name: "Playstation", value: "27" },
            { name: "Atari 7800", value: "28" },
            { name: "Atari 5200", value: "31" },
            { name: "Atarist", value: "34" },
            { name: "Apple II", value: "41" },
            { name: "Gameboy Color", value: "43" },
            { name: "Atari Lynx", value: "46" },
            { name: "NES", value: "49" },
            { name: "Atari xegs", value: "50" },
            { name: "Classic Macintosh", value: "55" },
            { name: "Sega Master System", value: "74" },
            { name: "Gamegear", value: "77" },
            { name: "SNES", value: "79" },
            { name: "Xbox", value: "80" },
            { name: "Nintendo 64", value: "83" },
            { name: "Gamecube", value: "105" },
            { name: "Dreamcast", value: "106" },
            { name: "Sega Saturn", value: "107" },
            { name: "3do", value: "111" },
            { name: "Jaguar", value: "112" },
            { name: "Sega 32x", value: "117" },
            { name: "Sega CD", value: "119" },
            { name: "Commodore Amiga", value: "166" },
            { name: "Genesis", value: "167" },
            { name: "Web", value: "171" },
            { name: "Xbox Series S/X", value: "186" },
            { name: "Playstation 5", value: "187" },
          ],
        },
        {
          name: "stores",
          type: "Store",
          default: "All",
          options: [
            { name: "Steam", value: "1" },
            { name: "PlayStation Store", value: "2" },
            { name: "Xbox Store", value: "3" },
            { name: "App Store", value: "4" },
            { name: "GoG", value: "5" },
            { name: "Nintendo Store", value: "6" },
            { name: "Xbox 360 Store", value: "7" },
            { name: "Google Play", value: "8" },
            { name: "itch.io", value: "9" },
            { name: "Epic Games Store", value: "11" },
          ],
        },
        {
          name: "genres",
          type: "Genre",
          default: "All",
          options: [
            { name: "Racing", value: "1" },
            { name: "Shooter", value: "2" },
            { name: "Adventure", value: "3" },
            { name: "Action", value: "4" },
            { name: "RPG", value: "5" },
            { name: "Fighting", value: "6" },
            { name: "Puzzle", value: "7" },
            { name: "Strategy", value: "10" },
            { name: "Arcade", value: "11" },
            { name: "Simulation", value: "14" },
            { name: "Sports", value: "15" },
            { name: "Card", value: "17" },
            { name: "Family", value: "19" },
            { name: "Board Games", value: "28" },
            { name: "Educational", value: "34" },
            { name: "Casual", value: "40" },
            { name: "Indie", value: "51" },
            { name: "Massively Multiplayer", value: "59" },
            { name: "Platformer", value: "83" },
          ],
        },
      ],
      search: {
        name: "search",
        placeholder: "Search for Games",
      },
    },
  },
  giveaways: {
    baseURL: "https://gamerpower.p.rapidapi.com/api/",
    endPoints: {
      default: "giveaways",
      details: "giveaway?id=",
    },
    queryParams: {
      sort: {
        name: "sort",
        type: "Sort",
        default: "None",
        options: [
          { name: "Start Date", value: "date" },
          { name: "Value", value: "value" },
          { name: "Popularity", value: "popularity" },
        ],
      },
      filters: [
        {
          name: "platform",
          type: "Platform",
          default: "All",
          options: [
            { name: "PC", value: "pc" },
            { name: "Steam", value: "steam" },
            { name: "Epic Games Store", value: "epic-games-store" },
            { name: "itch.io", value: "itchio" },
            { name: "GOG", value: "gog" },
            { name: "Origin", value: "origin" },
            { name: "Ubisoft", value: "ubisoft" },
            { name: "Battle.net", value: "battlenet" },
            { name: "DRM-Free", value: "drm-free" },
            { name: "PlayStation 5", value: "ps5" },
            { name: "PlayStation 4", value: "ps4" },
            { name: "Xbox Series X/S", value: "xbox-series-xs" },
            { name: "Xbox One", value: "xbox-one" },
            { name: "Nintendo Switch", value: "switch" },
            { name: "Android", value: "android" },
            { name: "iOS", value: "ios" },
            { name: "VR", value: "vr" },
          ],
        },
        {
          name: "type",
          type: "Type",
          default: "All",
          options: [
            { name: "Game", value: "game" },
            { name: "DLC", value: "loot" },
            { name: "Early Access", value: "beta" },
          ],
        },
      ],
    },
    headers: {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
        "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
      },
    },
  },
};
