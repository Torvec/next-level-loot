import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { query } from "@/lib/query";
import {
  type DealsDetailsProps,
  type DealsDetailsHeaderProps,
  type DealsDetailsMainColumnProps,
  type DealsDetailsPriceSectionProps,
  type DealsDetailsSideBarProps,
} from "@/types/deals-types";

// Main Component

export default function DealsDetails({
  id,
  ...data
}: { id: string } & DealsDetailsProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <DealsDetailsHeader
        title={data.gameInfo.name}
        src={data.gameInfo.thumb}
        storeID={data.gameInfo.storeID}
        released={data.gameInfo.releaseDate}
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <DealsDetailsMainColumn
          src={data.gameInfo.thumb}
          title={data.gameInfo.name}
          id={id}
          metacriticLink={data.gameInfo.metacriticLink}
          metacriticScore={data.gameInfo.metacriticScore}
          steamAppID={data.gameInfo.steamAppID}
          steamRatingPercent={data.gameInfo.steamRatingPercent}
          retailPrice={data.gameInfo.retailPrice}
          salePrice={data.gameInfo.salePrice}
        />
        <DealsDetailsSideBar cheaperStores={data.cheaperStores} />
      </div>
    </div>
  );
}

// Sub-Components

const DealsDetailsHeader = ({
  title,
  src,
  released,
  storeID,
}: DealsDetailsHeaderProps) => {
  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
      <BannerSection src={src} alt={title} />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="block text-sm text-muted-foreground">
          Store: {getStoreNameFromID(storeID)}
        </span>
        <span className="block text-sm text-muted-foreground">
          Released: {formatReleaseDate(released)}
        </span>
      </div>
    </div>
  );
};

const DealsDetailsMainColumn = ({
  src,
  title,
  id,
  metacriticLink,
  metacriticScore,
  steamAppID,
  steamRatingPercent,
  retailPrice,
  salePrice,
}: DealsDetailsMainColumnProps) => {
  return (
    <div className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
      <div className="flex gap-4">
        <ScoreBoxButton
          apiLink={metacriticLink}
          title={title}
          score={metacriticScore}
          reviewSourceName="Metacritic"
          reviewSourceBaseURL="https://www.metacritic.com"
          reviewSourceSearch="https://www.metacritic.com/search/"
        />
        <ScoreBoxButton
          apiLink={steamAppID}
          title={title}
          score={steamRatingPercent}
          reviewSourceName="Steam"
          reviewSourceBaseURL="https://store.steampowered.com/app/"
          reviewSourceSearch="https://store.steampowered.com/search/?term="
        />
      </div>
      <DealsDetailsPriceSection
        retailPrice={retailPrice}
        salePrice={salePrice}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${id}`}
          displayText={"Get Deal"}
        />
        <WishlistButton
          item={{
            id: id,
            title: title,
            src: src,
            path: "/deals/",
            price: salePrice,
            timestamp: Date.now(),
          }}
        />
      </div>
    </div>
  );
};

const DealsDetailsPriceSection = ({
  salePrice,
  retailPrice,
}: DealsDetailsPriceSectionProps) => {
  return (
    <div className="mx-auto w-max">
      <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
        <span className="font rounded-xl text-2xl text-highlight">
          -{calculateSavings(retailPrice, salePrice)}%
        </span>
        <div>
          <span className="block text-sm text-muted-foreground line-through">
            ${retailPrice}
          </span>
          <span className="block">{displaySalePrice(salePrice)}</span>
        </div>
      </div>
    </div>
  );
};

const DealsDetailsSideBar = ({ cheaperStores }: DealsDetailsSideBarProps) => {
  return (
    <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
      <>
        <h3 className="mb-4 text-center text-xl font-bold">Cheaper Deals</h3>
        <div className="space-y-6">
          {cheaperStores.length > 0 ? (
            cheaperStores.map((cs, index: number) => {
              return (
                <div key={cs.dealID} className="space-y-1">
                  <span className="block text-sm">
                    {getStoreNameFromID(cs.storeID)} Deal
                  </span>
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
                      <span className="block">
                        {displaySalePrice(cs.salePrice)}
                      </span>
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-lg text-muted-foreground">N/A</p>
          )}
        </div>
      </>
    </aside>
  );
};

// Helper Functions

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

const calculateSavings = (retailPrice: string, salePrice: string) => {
  return (
    ((parseFloat(retailPrice) - parseFloat(salePrice)) /
      parseFloat(retailPrice)) *
    100
  ).toFixed(0);
};

const displaySalePrice = (salePrice: string) => {
  return salePrice !== "0.00" ? `$${salePrice}` : "FREE";
};
