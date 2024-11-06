import BestDealsCard from "./best-deals-card";

export interface GameDealType {
  // internalName: string;
  title: string;
  // metacriticLink: string | null;
  dealID: string;
  // storeID: string;
  // gameID: string;
  salePrice: string;
  normalPrice: string;
  // isOnSale: string;
  savings: string;
  // metacriticScore: string;
  // steamRatingText: string | null;
  // steamRatingPercent: string;
  // steamRatingCount: string;
  steamAppID: string | null;
  // releaseDate: number;
  // lastChange: number;
  dealRating: string;
  thumb: string;
}

export default async function BestDeals() {
  try {
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const gameDeals: GameDealType[] = data;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Best Deals
        </h1>
        <div className="mb-32 grid grid-cols-4 gap-8">
          {gameDeals.map(
            ({
              // internalName,
              title,
              // metacriticLink,
              dealID,
              // storeID,
              // gameID,
              salePrice,
              normalPrice,
              // isOnSale,
              savings,
              // metacriticScore,
              // steamRatingText,
              // steamRatingPercent,
              // steamRatingCount,
              steamAppID,
              // releaseDate,
              // lastChange,
              dealRating,
              thumb,
            }) => {
              return (
                <BestDealsCard
                  key={dealID}
                  dealID={dealID}
                  title={title}
                  salePrice={salePrice}
                  normalPrice={normalPrice}
                  savings={savings}
                  dealRating={dealRating}
                  steamAppID={steamAppID}
                  thumb={thumb}
                />
              );
            },
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
