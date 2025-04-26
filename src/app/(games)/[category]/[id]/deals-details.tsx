import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { query } from "@/lib/query";
import { type DealsDetailsProps } from "@/types/deals-types";

export function DealsDetailsHeader(data: DealsDetailsProps) {
  return (
    <>
      <BannerSection src={data.gameInfo.thumb} alt={data.gameInfo.name} />
      <div>
        <h2 className="text-2xl font-bold">{data.gameInfo.name}</h2>
        <span className="block text-sm text-muted-foreground">
          Store: {getStoreNameFromID(data.gameInfo.storeID)}
        </span>
        <span className="block text-sm text-muted-foreground">
          Released: {formatReleaseDate(data.gameInfo.releaseDate)}
        </span>
      </div>
    </>
  );
}

export function DealsDetailsMainColumn({ id, ...data }: { id: string } & DealsDetailsProps) {
  return (
    <>
      <div className="flex gap-4">
        <ScoreBoxButton
          apiLink={data.gameInfo.metacriticLink}
          title={data.gameInfo.name}
          score={data.gameInfo.metacriticScore}
          reviewSourceName="Metacritic"
          reviewSourceBaseURL="https://www.metacritic.com"
          reviewSourceSearch="https://www.metacritic.com/search/"
        />
        <ScoreBoxButton
          apiLink={data.gameInfo.steamAppID}
          title={data.gameInfo.name}
          score={data.gameInfo.steamRatingPercent}
          reviewSourceName="Steam"
          reviewSourceBaseURL="https://store.steampowered.com/app/"
          reviewSourceSearch="https://store.steampowered.com/search/?term="
        />
      </div>
      <div className="mx-auto w-max">
        <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
          <span className="font rounded-xl text-2xl text-highlight">
            -{calculateSavings(data.gameInfo.retailPrice, data.gameInfo.salePrice)}%
          </span>
          <div>
            <span className="block text-sm text-muted-foreground line-through">
              ${data.gameInfo.retailPrice}
            </span>
            <span className="block">{displaySalePrice(data.gameInfo.salePrice)}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${id}`}
          displayText={"Get Deal"}
        />
        <WishlistButton
          item={{
            id: id,
            title: data.gameInfo.name,
            src: data.gameInfo.thumb,
            path: "/deals/",
            price: data.gameInfo.salePrice,
            timestamp: Date.now(),
          }}
        />
      </div>
    </>
  );
}

export function DealsDetailsSideBar(data: DealsDetailsProps) {
  return (
    <>
      <h3 className="mb-4 text-center text-xl font-bold">Cheaper Deals</h3>
      <div className="space-y-6">
        {data.cheaperStores.length > 0 ? (
          data.cheaperStores.map((cs, index: number) => {
            return (
              <div key={cs.dealID} className="space-y-1">
                <span className="block text-sm">{getStoreNameFromID(cs.storeID)} Deal</span>
                <Button
                  asChild
                  className={`w-full rounded-xl border border-muted-foreground bg-transparent hover:border-foreground ${index === 0 ? "border-2 border-foreground hover:border-highlight" : ""}`}
                  variant="outline"
                >
                  <Link prefetch={true} href={`/deals/${cs.dealID}`}>
                    <span className="block font-bold text-highlight">
                      -{calculateSavings(cs.retailPrice, cs.salePrice)}%
                    </span>
                    <span className="block text-muted-foreground line-through">
                      ${cs.retailPrice}
                    </span>
                    <span className="block">{displaySalePrice(cs.salePrice)}</span>
                    <ChevronRight />
                  </Link>
                </Button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-lg italic text-muted-foreground">Cheapest Deal Found!</p>
        )}
      </div>
    </>
  );
}

// Utility Functions

const calculateSavings = (retailPrice: string, salePrice: string) => {
  return (
    ((parseFloat(retailPrice) - parseFloat(salePrice)) / parseFloat(retailPrice)) *
    100
  ).toFixed(0);
};

const displaySalePrice = (salePrice: string) => {
  return salePrice !== "0.00" ? `$${salePrice}` : "FREE";
};

const formatReleaseDate = (releaseDate: number) => {
  return releaseDate > 0 ? new Date(releaseDate * 1000).toLocaleDateString() : "N/A";
};

const getStoreNameFromID = (storeID: string) => {
  const storeOptions = query["deals"].queryParams.filters?.[0].options;
  const storeName = storeOptions?.find((name) => name.value === storeID);
  return storeName && storeName.name;
};
