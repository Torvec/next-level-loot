import { GameDealType } from "../types";
import BestDealsCard from "../best-deals-card";

export default async function DealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?id=${id}`,
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
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

  return (
    <div className="py-32">
      <BestDealsCard
        key={gameDeal.dealID}
        dealID={gameDeal.dealID}
        title={gameDeal.title}
        salePrice={gameDeal.salePrice}
        normalPrice={gameDeal.normalPrice}
        savings={gameDeal.savings}
        dealRating={gameDeal.dealRating}
        steamAppID={gameDeal.steamAppID}
        thumb={gameDeal.thumb}
      />
    </div>
  );
}
