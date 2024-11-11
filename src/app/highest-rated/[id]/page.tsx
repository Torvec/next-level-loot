import HighestRatedGamesCard from "../highest-rated-games-card";
import { HighestRatedGameType } from "../types";

export default async function HighestRated({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  const rawgAPIKey = process.env.RAWG_API_KEY;

  if (!rawgAPIKey) {
    throw new Error("RAWG_API_KEY is not defined");
  }

  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${rawgAPIKey}`,
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
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

  return (
    <div className="py-32">
      <HighestRatedGamesCard
        key={hrg.id}
        name={hrg.name}
        platforms={hrg.platforms}
        stores={hrg.stores}
        released={hrg.released}
        background_image={hrg.background_image}
        metacritic={hrg.metacritic}
        id={hrg.id}
        esrb_rating={hrg.esrb_rating}
        short_screenshots={hrg.short_screenshots}
        genres={hrg.genres}
      />
    </div>
  );
}
