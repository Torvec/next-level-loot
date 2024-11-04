export default async function FreeGames() {
  interface FreeGame {
    id: number;
    title: string;
    worth: string;
    thumbnail: string;
    image: string;
    description: string;
    instructions: string;
    open_giveaway_url: string;
    published_date: string;
    type: string;
    platforms: string;
    end_date: string;
    users: number;
    status: string;
    gamerpower_url: string;
    open_giveaway: string;
  }

  try {
    const response = await fetch(
      "https://gamerpower.p.rapidapi.com/api/giveaways?sort=value&type=game",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const freeGames: FreeGame[] = data;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Free Games
        </h1>
        <ul>
          {freeGames.map((freeGame) => (
            <li key={freeGame.id}>
              <h2>{freeGame.title}</h2>
              <img src={freeGame.thumbnail} alt={freeGame.title} />
              <p>{freeGame.description}</p>
              <p>
                <strong>Worth:</strong> {freeGame.worth}
              </p>
              <p>
                <strong>Platforms:</strong> {freeGame.platforms}
              </p>
              <p>
                <strong>End Date:</strong> {freeGame.end_date}
              </p>
              <a
                href={freeGame.open_giveaway_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Giveaway
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
