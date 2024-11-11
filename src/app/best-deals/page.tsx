import ResultsList from "@/components/ui/results-list";
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
      <ResultsList>
        {gameDeals.map((gd) => (
          <BestDealsCard
            key={gd.dealID}
            dealID={gd.dealID}
            title={gd.title}
            salePrice={gd.salePrice}
            normalPrice={gd.normalPrice}
            savings={gd.savings}
            dealRating={gd.dealRating}
            steamAppID={gd.steamAppID}
            thumb={gd.thumb}
          />
        ))}
      </ResultsList>
    </>
  );
}
