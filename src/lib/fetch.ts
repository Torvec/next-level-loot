import {
  type Category,
  type FetchDataType,
} from "@/app/(games)/[category]/types";

export const fetchOptions: Record<Category, FetchDataType> = {
  "best-deals": {
    baseURL: "https://www.cheapshark.com/api/1.0/",
    apiKey: null,
    headers: null,
    fetchEndPoints: {
      default: "deals?sortBy=DealRating",
      details: "deals?id=",
    },
    sort: [
      { name: "Deal Rating", value: "DealRating" },
      { name: "Title", value: "Title" },
      { name: "Savings", value: "Savings" },
      { name: "Price", value: "Price" },
      { name: "Metacritic", value: "Metacritic" },
      { name: "Reviews", value: "Reviews" },
      { name: "Release", value: "Release" },
      { name: "Store", value: "Store" },
      { name: "Recent", value: "Recent" },
    ],
    filter: {
      platform: null,
      store: [
        { id: 1, name: "Steam" },
        { id: 2, name: "GamersGate" },
        { id: 3, name: "Green Man Gaming" },
        { id: 4, name: "Amazon" },
        { id: 5, name: "GameStop" },
        { id: 6, name: "Direct2Drive" },
        { id: 7, name: "GoG" },
        { id: 8, name: "Origin" },
        { id: 9, name: "Get Games" },
        { id: 10, name: "Shiny Loot" },
        { id: 11, name: "Humble Bundle" },
        { id: 12, name: "Desura" },
        { id: 13, name: "Uplay" },
        { id: 14, name: "Indie Game Stand" },
        { id: 15, name: "Fanatical" },
        { id: 16, name: "Games Rocket" },
        { id: 17, name: "Games Republic" },
        { id: 18, name: "Sila Games" },
        { id: 19, name: "Playfield" },
        { id: 20, name: "Imperial Games" },
        { id: 21, name: "Win Game Store" },
        { id: 22, name: "FunStock Digital" },
        { id: 23, name: "GameBillet" },
        { id: 24, name: "Voidu" },
        { id: 25, name: "Epic Games Store" },
        { id: 26, name: "Razer Game Store" },
        { id: 27, name: "Games Planet" },
        { id: 28, name: "Gamesload" },
        { id: 29, name: "2Game" },
        { id: 30, name: "IndieGala" },
        { id: 31, name: "Blizzard Shop" },
        { id: 32, name: "All You Play" },
        { id: 33, name: "DLGamer" },
        { id: 34, name: "Noctre" },
        { id: 35, name: "Dreamgame" },
      ],
      genre: null,
      type: null,
    },
  },
  "highest-rated": {
    baseURL: "https://api.rawg.io/api/",
    apiKey: `key=${process.env.RAWG_API_KEY}`,
    headers: null,
    fetchEndPoints: {
      default: "games?page_size=24&platforms=7,4,187,186&ordering=-metacritic",
      details: "games/",
    },
    sort: [
      { name: "Name", value: "name" },
      { name: "Released", value: "released" },
      { name: "Added", value: "added" },
      { name: "Created", value: "created" },
      { name: "Updated", value: "updated" },
      { name: "Rating", value: "rating" },
      { name: "Metacritic", value: "metacritic" },
      { name: "Name Reverse", value: "-name" },
      { name: "Released Reverse", value: "-released" },
      { name: "Added Reverse", value: "-added" },
      { name: "Created Reverse", value: "-created" },
      { name: "Updated Reverse", value: "-updated" },
      { name: "Rating Reverse", value: "-rating" },
      { name: "Metacritic Reverse", value: "-metacritic" },
    ],
    filter: {
      platform: [
        { id: 1, name: "Xbox One" },
        { id: 3, name: "iOS" },
        { id: 4, name: "PC" },
        { id: 5, name: "Mac OS" },
        { id: 6, name: "Linux" },
        { id: 7, name: "Nintendo Switch" },
        { id: 8, name: "Nintendo 3DS" },
        { id: 9, name: "Nintendo DS" },
        { id: 10, name: "Wii U" },
        { id: 11, name: "Wii" },
        { id: 12, name: "Neo Geo" },
        { id: 13, name: "Nintendo DSi" },
        { id: 14, name: "Xbox 360" },
        { id: 15, name: "Playstation 2" },
        { id: 16, name: "Playstation 3" },
        { id: 17, name: "PSP" },
        { id: 18, name: "Playstation 4" },
        { id: 19, name: "PS Vita" },
        { id: 21, name: "Android" },
        { id: 22, name: "Atari Flashback" },
        { id: 23, name: "Atari 2600" },
        { id: 24, name: "Gameboy Advance" },
        { id: 25, name: "Atari 8-bit" },
        { id: 26, name: "Gameboy" },
        { id: 27, name: "Playstation" },
        { id: 28, name: "Atari 7800" },
        { id: 31, name: "Atari 5200" },
        { id: 34, name: "Atarist" },
        { id: 41, name: "Apple II" },
        { id: 43, name: "Gameboy Color" },
        { id: 46, name: "Atari Lynx" },
        { id: 49, name: "NES" },
        { id: 50, name: "Atari xegs" },
        { id: 55, name: "Classic Macintosh" },
        { id: 74, name: "Sega Master System" },
        { id: 77, name: "Gamegear" },
        { id: 79, name: "SNES" },
        { id: 80, name: "Xbox" },
        { id: 83, name: "Nintendo 64" },
        { id: 105, name: "Gamecube" },
        { id: 106, name: "Dreamcast" },
        { id: 107, name: "Sega Saturn" },
        { id: 111, name: "3do" },
        { id: 112, name: "Jaguar" },
        { id: 117, name: "Sega 32x" },
        { id: 119, name: "Sega CD" },
        { id: 166, name: "Commodore Amiga" },
        { id: 167, name: "Genesis" },
        { id: 171, name: "Web" },
        { id: 186, name: "Xbox Series S/X" },
        { id: 187, name: "Playstation 5" },
      ],
      store: [
        { id: 1, name: "Steam" },
        { id: 2, name: "PlayStation Store" },
        { id: 3, name: "Xbox Store" },
        { id: 4, name: "App Store" },
        { id: 5, name: "GoG" },
        { id: 6, name: "Nintendo Store" },
        { id: 7, name: "Xbox 360 Store" },
        { id: 8, name: "Google Play" },
        { id: 9, name: "itch.io" },
        { id: 11, name: "Epic Games Store" },
      ],
      genre: [
        { id: 1, name: "Racing" },
        { id: 2, name: "Shooter" },
        { id: 3, name: "Adventure" },
        { id: 4, name: "Action" },
        { id: 5, name: "RPG" },
        { id: 6, name: "Fighting" },
        { id: 7, name: "Puzzle" },
        { id: 10, name: "Strategy" },
        { id: 11, name: "Arcade" },
        { id: 14, name: "Simulation" },
        { id: 15, name: "Sports" },
        { id: 17, name: "Card" },
        { id: 19, name: "Family" },
        { id: 28, name: "Board Games" },
        { id: 34, name: "Educational" },
        { id: 40, name: "Casual" },
        { id: 51, name: "Indie" },
        { id: 59, name: "Massively Multiplayer" },
        { id: 83, name: "Platformer" },
      ],
      type: null,
    },
  },
  "free-games": {
    baseURL: "https://gamerpower.p.rapidapi.com/api/",
    apiKey: null,
    headers: {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY ?? "",
        "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
      },
    },
    fetchEndPoints: {
      default: "giveaways?sort=value&type=game",
      details: "giveaway?id=",
    },
    sort: [
      { name: "Date", value: "date" },
      { name: "Value", value: "value" },
      { name: "Popularity", value: "popularity" },
    ],
    filter: {
      platform: [
        { name: "PC", slug: "pc" },
        { name: "Steam", slug: "steam" },
        { name: "Epic Games Store", slug: "epic-games-store" },
        { name: "itch.io", slug: "itchio" },
        { name: "GOG", slug: "gog" },
        { name: "Origin", slug: "origin" },
        { name: "Ubisoft", slug: "ubisoft" },
        { name: "Battle.net", slug: "battlenet" },
        { name: "DRM-Free", slug: "drm-free" },
        { name: "PlayStation 5", slug: "ps5" },
        { name: "PlayStation 4", slug: "ps4" },
        { name: "Xbox Series X/S", slug: "xbox-series-xs" },
        { name: "Xbox One", slug: "xbox-one" },
        { name: "Nintendo Switch", slug: "switch" },
        { name: "Android", slug: "android" },
        { name: "iOS", slug: "ios" },
        { name: "VR", slug: "vr" },
      ],
      store: null,
      genre: null,
      type: [
        { name: "Game", value: "game" },
        { name: "Loot/DLC", value: "loot" },
        { name: "Beta/Early Access", value: "beta" },
      ],
    },
  },
};

export async function fetchList(category: Category) {
  const { baseURL, apiKey, headers, fetchEndPoints } = fetchOptions[category];
  const endpoint = fetchEndPoints.default;
  const url = `${baseURL}${endpoint}${apiKey ? `&${apiKey}` : ""}`;
  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function fetchDetails(category: Category, id: string | number) {
  const { baseURL, apiKey, headers, fetchEndPoints } = fetchOptions[category];
  const endpoint = fetchEndPoints.details;
  const url = `${baseURL}${endpoint}${id}${apiKey ? `?${apiKey}` : ""}`;
  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
