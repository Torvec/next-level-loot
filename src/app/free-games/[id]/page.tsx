import { FreeGameType } from "../types";
import FreeGamesCard from "../free-games-card";

export default async function FreeGamePage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const rapidAPIKey = process.env.RAPIDAPI_KEY;

  if (!rapidAPIKey) {
    throw new Error("RAPIDAPI_KEY is not defined");
  }

  const response = await fetch(
    `https://gamerpower.p.rapidapi.com/api/giveaway?id=${id}`,
    {
      headers: {
        "X-RapidAPI-Key": rapidAPIKey,
        "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const fg: FreeGameType = {
    id: id,
    title: data.title,
    type: data.type,
    worth: data.worth,
    image: data.image,
    open_giveaway_url: data.open_giveaway_url,
    published_date: data.published_date,
    platforms: data.platforms,
    end_date: data.end_date,
  };

  return (
    <div className="py-32">
      <FreeGamesCard
        id={id}
        title={fg.title}
        type={fg.type}
        worth={fg.worth}
        image={fg.image}
        open_giveaway_url={fg.open_giveaway_url}
        published_date={fg.published_date}
        platforms={fg.platforms}
        end_date={fg.end_date}
      />
    </div>
  );
}
