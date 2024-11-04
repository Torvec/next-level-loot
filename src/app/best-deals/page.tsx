export default async function BestDeals() {
  interface GameDeal {
    internalName: string;
    title: string;
    metacriticLink: string;
    dealID: string;
    storeID: string;
    gameID: string;
    salePrice: string;
    normalPrice: string;
    isOnSale: string;
    savings: string;
    metacriticScore: string;
    steamRatingText: string;
    steamRatingPercent: string;
    steamRatingCount: string;
    steamAppID: string;
    releaseDate: number;
    lastChange: number;
    dealRating: string;
    thumb: string;
  }

  try {
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const gameDeals: GameDeal[] = data;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Best Deals
        </h1>
        <ul>
          {gameDeals.map((gameDeal) => (
            <li key={gameDeal.dealID}>
              <h2>{gameDeal.title}</h2>
              <img src={gameDeal.thumb} alt={gameDeal.title} />
              <p>{gameDeal.metacriticLink}</p>
              <p>
                <strong>Sale Price:</strong> {gameDeal.salePrice}
              </p>
              <p>
                <strong>Normal Price:</strong> {gameDeal.normalPrice}
              </p>
              <p>
                <strong>Savings:</strong> {gameDeal.savings}%
              </p>
              <p>
                <strong>Steam Rating:</strong> {gameDeal.steamRatingText} (
                {gameDeal.steamRatingPercent}%)
              </p>
              <p>
                <strong>Release Date:</strong>{" "}
                {new Date(gameDeal.releaseDate * 1000).toLocaleDateString()}
              </p>
              <a
                href={`https://store.steampowered.com/app/${gameDeal.steamAppID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Steam
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
