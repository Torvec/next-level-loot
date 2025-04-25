import { CardDescription, CardTitle } from "@/components/ui/card";
import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import { type DealsCardProps } from "@/types/deals-types";
import { query } from "@/lib/query";

export function DealsCardHeader(data: DealsCardProps) {
  return (
    <>
      <BannerSection src={data.thumb} alt={data.title} />
      <CardTitle>
        <h2 className="text-lg">{data.title}</h2>
      </CardTitle>
      <CardDescription>
        <span className="block text-sm">
          Store: {getStoreNameFromID(data.storeID)}
        </span>
        <span>Released: {formatReleaseDate(data.releaseDate)}</span>
      </CardDescription>
    </>
  );
}

export function DealsCardContent(data: DealsCardProps) {
  return (
    <>
      <div className="flex gap-4">
        <ScoreBoxButton
          apiLink={data.metacriticLink}
          title={data.title}
          score={data.metacriticScore}
          reviewSourceName="Metacritic"
          reviewSourceBaseURL="https://www.metacritic.com"
          reviewSourceSearch="https://www.metacritic.com/search/"
        />
        <ScoreBoxButton
          apiLink={data.steamAppID}
          title={data.title}
          score={data.steamRatingPercent}
          reviewSourceName="Steam"
          reviewSourceBaseURL="https://store.steampowered.com/app/"
          reviewSourceSearch="https://store.steampowered.com/search/?term="
        />
      </div>
      <div className="mx-auto w-max">
        <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
          <span className="font rounded-xl text-2xl text-highlight">
            -{parseNumber(data.savings)}%
          </span>
          <div>
            <span className="block text-sm text-muted-foreground line-through">
              ${data.normalPrice}
            </span>
            <span className="block">{displaySalePrice(data.salePrice)}</span>
          </div>
        </div>
        <span className="block text-center text-sm text-muted-foreground">
          {parseNumber(data.dealRating)}/10 Deal
        </span>
      </div>
    </>
  );
}

export function DealsCardFooter(data: DealsCardProps) {
  return (
    <>
      <RedirectButton
        url={`https://www.cheapshark.com/redirect?dealID=${data.dealID}`}
        displayText={"Get Deal"}
      />
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <WishlistButton
          item={{
            id: data.dealID,
            title: data.title,
            src: data.thumb,
            path: "/deals/",
            store: getStoreNameFromID(data.storeID),
            price: data.salePrice,
            timestamp: Date.now(),
          }}
        />
        <MoreDetailsButton path={"/deals/"} id={data.dealID} />
      </div>
    </>
  );
}

// UTILITY FUNCTIONS

const getStoreNameFromID = (storeID: string) => {
  const storeOptions = query["deals"].queryParams.filters?.[0].options;
  const storeName = storeOptions?.find((name) => name.value === storeID);
  return storeName && storeName.name;
};

const formatReleaseDate = (releaseDate: number) => {
  return releaseDate > 0
    ? new Date(releaseDate * 1000).toLocaleDateString()
    : "N/A";
};

const displaySalePrice = (salePrice: string) => {
  return salePrice !== "0.00" ? `$${salePrice}` : "FREE";
};

const parseNumber = (num: string) => {
  return parseFloat(num).toFixed(0);
};
