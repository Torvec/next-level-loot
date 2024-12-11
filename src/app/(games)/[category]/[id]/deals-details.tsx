import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { query } from "@/lib/query";
import { DealsDetailsType } from "@/lib/types";

export default function DealsDetails({
  id,
  ...data
}: { id: string } & DealsDetailsType) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Header
        title={data.gameInfo.name}
        src={data.gameInfo.thumb}
        released={data.gameInfo.releaseDate}
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <MainColumn
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
        <SideBar
          cheaperStores={data.cheaperStores}
          salePrice={data.gameInfo.salePrice}
        />
      </div>
    </div>
  );
}

const Header = ({
  title,
  src,
  released,
}: {
  title: string;
  src: string;
  released: number;
}) => {
  const formattedReleaseDate =
    released > 0 ? new Date(released * 1000).toLocaleDateString() : "N/A";

  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
      <BannerSection src={src} alt={title} />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Released: {formattedReleaseDate}
        </p>
      </div>
    </div>
  );
};

const MainColumn = ({
  src,
  title,
  id,
  metacriticLink,
  metacriticScore,
  steamAppID,
  steamRatingPercent,
  retailPrice,
  salePrice,
}: {
  src: string;
  title: string;
  id: string;
  metacriticLink: string;
  metacriticScore: string;
  steamAppID: string;
  steamRatingPercent: string;
  retailPrice: string;
  salePrice: string;
}) => {
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
      <PriceSection retailPrice={retailPrice} salePrice={salePrice} />
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${id}`}
          text={"Get Deal"}
        />
        <WishlistButton
          item={{
            id: id,
            title: title,
            src: src,
            path: "/deals/",
            price: salePrice,
          }}
        />
      </div>
    </div>
  );
};

const PriceSection = ({
  retailPrice,
  salePrice,
}: {
  retailPrice: string;
  salePrice: string;
}) => {
  const percentSavings = (
    ((parseFloat(retailPrice) - parseFloat(salePrice)) /
      parseFloat(retailPrice)) *
    100
  ).toFixed(0);

  return (
    <div className="mx-auto w-max space-y-4 text-center text-base">
      <div className="flex gap-4">
        <span className="rounded-xl border-4 border-highlight p-4 text-2xl font-black text-highlight">
          -{percentSavings}%
        </span>
        <div className="flex flex-col justify-between">
          <span className="text-muted-foreground line-through">
            ${retailPrice}
          </span>
          <span className="text-2xl font-bold">
            {salePrice !== "0.00" ? `$${salePrice}` : "FREE"}
          </span>
        </div>
      </div>
    </div>
  );
};

const SideBar = ({
  cheaperStores,
  salePrice,
}: {
  cheaperStores: {
    storeID: string;
    dealID: string;
    retailPrice: string;
    salePrice: string;
  }[];
  salePrice: string;
}) => {
  return (
    <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
      <CheaperDealsSection
        cheaperStores={cheaperStores}
        salePrice={salePrice}
      />
    </aside>
  );
};

const CheaperDealsSection = ({
  cheaperStores,
  salePrice,
}: {
  cheaperStores: {
    storeID: string;
    dealID: string;
    retailPrice: string;
    salePrice: string;
  }[];
  salePrice: string;
}) => {
  const storeOptions = query["deals"].queryParams.filters?.[0].options;

  return (
    <>
      <h3 className="mb-4 text-xl font-bold">Cheaper Deals</h3>
      <div className="space-y-6">
        {cheaperStores.length > 0 ? (
          cheaperStores.map((cs, index: number) => {
            const storeName = storeOptions?.find(
              (name) => name.value === cs.storeID,
            );
            return (
              <div
                key={cs.dealID}
                className="flex w-full flex-col justify-between gap-2"
              >
                <h3 className="font-bold opacity-75">{storeName?.name} Deal</h3>
                <div className="flex flex-col gap-2">
                  <div className="space-x-2">
                    <span className="line-through opacity-70">
                      ${cs.retailPrice}
                    </span>
                    <span className="text-xl">
                      {salePrice !== "0.00" ? `$${cs.salePrice}` : "FREE"}
                    </span>
                  </div>
                  <Button
                    asChild
                    className={`w-full bg-muted-foreground hover:bg-foreground ${index === 0 ? "bg-foreground hover:bg-highlight" : ""}`}
                  >
                    <Link
                      prefetch={true}
                      href={`/deals/${cs.dealID}`}
                      className={``}
                    >
                      {index === 0 ? "Best Deal" : "Better Deal"}
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-lg font-bold text-muted-foreground">
            You found the best deal!
          </p>
        )}
      </div>
    </>
  );
};
