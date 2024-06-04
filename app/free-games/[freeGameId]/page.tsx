/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";

export default async function FreeGamesDetail({
  params,
}: {
  params: { freeGameId: string };
}) {
  const gamerpowerBaseURL = "https://gamerpower.p.rapidapi.com/api/";
  //@ts-ignore
  const gamerpowerIndividualGiveaway = `giveaway?id=${params.freeGameId}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
      "x-rapidapi-host": "gamerpower.p.rapidapi.com",
    },
  };

  async function fetchFreeGames(url: string) {
    try {
      const response = await fetch(gamerpowerBaseURL + url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  const {
    id,
    title,
    worth,
    thumbnail,
    image,
    description,
    instructions,
    open_giveaway_url,
    published_date,
    type,
    platforms,
    end_date,
    users,
    status,
    gamerpower_url,
    open_giveaway,
  } = await fetchFreeGames(gamerpowerIndividualGiveaway);
  return (
    <main className="container mx-auto bg-slate-600 pb-32">
      <header className="mb-16 bg-blue-950 py-32 text-center">
        <h2 className=" text-4xl font-bold">Free Games and Giveaways</h2>
        <p className="text-sm">
          Powered by{" "}
          <ExternalLink
            href="https://www.gamerpower.com/api-read"
            displayText="Gamerpower Free Games & Giveaways API"
          />
        </p>
      </header>
      <section className="grid place-content-center">
        <div className="rounded-xl bg-white/10 p-8 shadow-xl">
          <h3 className="mb-4 text-pretty text-2xl">{title}</h3>
          <ul>
            {/* <li>
                  <img src={thumbnail} alt={title} className="h-auto w-full" />
                </li> */}
            <li>{description}</li>
            <li>{instructions}</li>
            <li>
              Start: {published_date} - End: {end_date}
            </li>
            <li>Type: {type}</li>
            <li>Platforms: {platforms}</li>
            <li># of Users: {users}</li>
            <li>Status: {status}</li>
            <li>Worth: {worth}</li>
            <li>
              <img src={image} alt={title} width={200} height={200} />
            </li>
            <li>
              <ExternalLink
                href={open_giveaway_url}
                displayText="Open Giveaway"
              />
            </li>
            <li>
              <ExternalLink
                href={gamerpower_url}
                displayText="GamerPower URL"
              />
            </li>
            <li>
              <ExternalLink href={open_giveaway} displayText="Open Giveaway" />
            </li>
            <Link href={"/free-games"}>Back to Free Games List</Link>
          </ul>
        </div>
      </section>
    </main>
  );
}
