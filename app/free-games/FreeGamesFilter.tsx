"use client";

const queryParams = {
  platform: [
    { label: "All", value: "all" },
    { label: "PC", value: "pc" },
    { label: "Steam", value: "steam" },
    { label: "Epic Games Store", value: "epic-games-store" },
    { label: "Itch.io", value: "itchio" },
    { label: "GOG", value: "gog" },
    { label: "Ubisoft", value: "ubisoft" },
    { label: "VR", value: "vr" },
    { label: "Origin", value: "origin" },
    { label: "Battle.net", value: "battlenet" },
    { label: "Xbox 360", value: "xbox-360" },
    { label: "Xbox One", value: "xbox-one" },
    { label: "Xbox Series X/S", value: "xbox-series-xs" },
    { label: "PS4", value: "ps4" },
    { label: "PS5", value: "ps5" },
    { label: "Switch", value: "switch" },
    { label: "Android", value: "android" },
    { label: "iOS", value: "ios" },
    { label: "DRM Free Games", value: "drm-free" },
  ],
  type: [
    { label: "All", value: "all" },
    { label: "Game", value: "game" },
    { label: "Loot", value: "loot" },
    { label: "Beta", value: "beta" },
  ],
  sort: [
    { label: "Value", value: "value" },
    { label: "Popularity", value: "popularity" },
  ],
};

export default function FreeGamesFilter() {
  return (
    <form className="mb-8 flex items-end gap-4">
      <div className="flex flex-col">
        <label htmlFor="platform" className="mb-2 text-sm ">
          Platform
        </label>
        <select
          name="platform"
          id="platform"
          className="rounded-md px-2 py-1 text-sm text-black"
        >
          {queryParams.platform.map((platform, index) => (
            <option key={index} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="type" className="mb-2 text-sm">
          Type
        </label>
        <select
          name="type"
          id="type"
          className="rounded-md px-2 py-1 text-sm text-black"
        >
          {queryParams.type.map((type, index) => (
            <option key={index} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="sort" className="mb-2 text-sm">
          Sort
        </label>
        <select
          name="sort"
          id="sort"
          className="rounded-md px-2 py-1 text-sm text-black"
        >
          {queryParams.sort.map((sort, index) => (
            <option key={index} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-yellow-400 px-6 py-1 text-sm font-medium uppercase text-black"
      >
        Submit
      </button>
    </form>
  );
}
