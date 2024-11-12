import { FreeGameType, GameDealType, HighestRatedGameType } from "../types";
import BestDealsCard from "../best-deals-card";
import FreeGamesCard from "../free-games-card";
import HighestRatedGamesCard from "../highest-rated-games-card";

export default async function Page(props: {
  params: Promise<{
    id: string;
    category: string;
  }>;
}) {
  const { id, category } = await props.params;
  const urlDecodedCategory = decodeURIComponent(
    category,
  ) as keyof typeof fetchURL;
  const urlDecodedId = decodeURIComponent(id);

  const rapidAPIKey = process.env.RAPIDAPI_KEY;
  if (!rapidAPIKey) {
    throw new Error("RAPIDAPI_KEY is not defined");
  }
  const rapidApiHeaders = {
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };

  const rawgAPIKey = process.env.RAWG_API_KEY;
  if (!rawgAPIKey) {
    throw new Error("RAWG_API_KEY is not defined");
  }

  const fetchURL = {
    "best-deals": `https://www.cheapshark.com/api/1.0/deals?id=${urlDecodedId}`,
    "free-games": `https://gamerpower.p.rapidapi.com/api/giveaway?id=${urlDecodedId}`,
    "highest-rated": `https://api.rawg.io/api/games/${urlDecodedId}?key=${rawgAPIKey}`,
  };

  let response;
  if (urlDecodedCategory === "free-games") {
    response = await fetch(fetchURL[urlDecodedCategory], rapidApiHeaders);
  } else {
    response = await fetch(fetchURL[urlDecodedCategory]);
  }

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  let content;
  if (urlDecodedCategory === "best-deals") {
    const gameDeal: GameDealType = {
      dealID: id,
      title: data.gameInfo.name,
      salePrice: data.gameInfo.salePrice,
      normalPrice: data.gameInfo.retailPrice,
      savings: (
        (1 - data.gameInfo.salePrice / data.gameInfo.retailPrice) *
        100
      ).toFixed(2),
      dealRating: data.gameInfo.steamRatingPercent,
      steamAppID: data.gameInfo.steamAppID,
      thumb: data.gameInfo.thumb,
    };
    content = <BestDealsCard {...gameDeal} />;
  } else if (urlDecodedCategory === "free-games") {
    const fg: FreeGameType = {
      id: data.id,
      title: data.title,
      type: data.type,
      worth: data.worth,
      image: data.image,
      open_giveaway_url: data.open_giveaway_url,
      published_date: data.published_date,
      platforms: data.platforms,
      end_date: data.end_date,
    };
    content = <FreeGamesCard {...fg} />;
  } else if (urlDecodedCategory === "highest-rated") {
    const hrg: HighestRatedGameType = {
      id: data.id,
      name: data.name,
      platforms: data.platforms || [],
      stores: data.stores || [],
      released: data.released,
      background_image: data.background_image,
      metacritic: data.metacritic,
      esrb_rating: data.esrb_rating,
      short_screenshots: data.short_screenshots || [],
      genres: data.genres || [],
    };
    content = <HighestRatedGamesCard {...hrg} />;
  }

  return <div className="py-32">{content}</div>;
}
