import BestDealsCard from "./best-deals-card";
import { GameDealType } from "./types";

export default async function BestDeals() {
  const response = await fetch("https://www.cheapshark.com/api/1.0/deals");

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const gameDeals: GameDealType[] = data;

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        Best Deals
      </h1>
      <div className="mb-32 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
}
