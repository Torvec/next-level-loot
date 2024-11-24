import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { GameDealDetailsType } from "../../types";
import { fetchOptions } from "@/lib/fetch";
import { ChevronRight } from "lucide-react";

export default function BestDealsDetails({
  id,
  ...data
}: { id: string } & GameDealDetailsType) {
  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.gameInfo.releaseDate > 0
        ? new Date(data.gameInfo.releaseDate * 1000).toLocaleDateString()
        : "N/A";

    return <p>Released: {formattedReleaseDate}</p>;
  };

  const MetacriticSection = () => (
    <div className="w-full bg-muted">
      {data.gameInfo.metacriticLink ? (
        <a
          href={`https://www.metacritic.com${data.gameInfo.metacriticLink}`}
          target="_blank"
          rel="noopener external"
          className="flex h-full flex-col items-center justify-between px-4 py-2 hover:opacity-80"
        >
          <h3 className="font-bold">Metacritic</h3>
          <span className="text-xl font-bold">
            {data.gameInfo.metacriticScore !== "0"
              ? data.gameInfo.metacriticScore
              : "N/A"}
          </span>
        </a>
      ) : (
        <p className="bg-muted px-4 py-2 text-center text-muted-foreground">
          Metacritic
          <br /> Data Unavailable
        </p>
      )}
    </div>
  );

  const SteamSection = () => (
    <div className="w-full">
      {data.gameInfo.steamAppID ? (
        <a
          href={`https://store.steampowered.com/app/${data.gameInfo.steamAppID}`}
          target="_blank"
          rel="noopener external"
          className="flex flex-col justify-between bg-muted px-4 py-2 text-center hover:opacity-80"
        >
          <h3 className="font-bold">Steam</h3>
          <div className="flex flex-col">
            <span className="font-bold sm:text-lg">
              {data.gameInfo.steamRatingPercent}%{" "}
              {data.gameInfo.steamRatingText}
            </span>
            <span className="text-muted-foreground">
              {data.gameInfo.steamRatingCount} Reviews
            </span>
          </div>
        </a>
      ) : (
        <p className="bg-muted px-4 py-2 text-center text-muted-foreground">
          Steam
          <br /> Data Unavailable
        </p>
      )}
    </div>
  );

  const RatingSection = () => (
    <div className="flex gap-4">
      <MetacriticSection />
      <SteamSection />
    </div>
  );

  const PriceSection = () => {
    const percentSavings = (
      ((parseFloat(data.gameInfo.retailPrice) -
        parseFloat(data.gameInfo.salePrice)) /
        parseFloat(data.gameInfo.retailPrice)) *
      100
    ).toFixed(0);

    return (
      <div className="mx-auto w-max space-y-4 pt-12 text-center text-base">
        <div className="flex gap-4">
          <span className="rounded-xl border-4 border-gold-foreground p-4 text-2xl font-black text-gold-foreground">
            -{percentSavings}%
          </span>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground line-through">
              ${data.gameInfo.retailPrice}
            </span>
            <span className="text-2xl font-bold">
              {data.gameInfo.salePrice !== "0.00"
                ? `$${data.gameInfo.salePrice}`
                : "FREE"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const CheaperDealsSection = () => {
    const fetchStores = fetchOptions["best-deals"].filter.store;
    const storeNames = fetchStores && fetchStores.map((store) => store.name);

    return (
      <div className="rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
        <h3 className="mb-4 text-xl font-bold">Cheaper Deals</h3>
        <div className="flex flex-col gap-12 sm:flex-row">
          {data.cheaperStores.length > 0 ? (
            data.cheaperStores.map((cs, index) => {
              const storeID = Number(cs.storeID);
              return (
                <div
                  key={cs.dealID}
                  className="flex w-full flex-col justify-between gap-2 lg:w-1/6"
                >
                  <h3 className="font-bold opacity-75">
                    {storeNames && storeNames[storeID - 1]} Deal
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="space-x-2">
                      <span className="line-through opacity-70">
                        ${cs.retailPrice}
                      </span>
                      <span className="text-xl">
                        {data.gameInfo.salePrice !== "0.00"
                          ? `$${cs.salePrice}`
                          : "FREE"}
                      </span>
                    </div>
                    <Button
                      asChild
                      className={`w-full bg-muted-foreground hover:bg-foreground ${index === 0 ? "bg-gold-foreground" : ""}`}
                    >
                      <Link
                        prefetch={true}
                        href={`/best-deals/${cs.dealID}`}
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
            <p className="flex-grow p-16 text-center text-lg font-bold text-muted-foreground">
              You found the best deal!
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <BannerSection src={data.gameInfo.thumb} alt={data.gameInfo.name} />
        </div>
        <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20 lg:w-2/3">
          <CardHeader>
            <CardTitle>
              <h2>{data.gameInfo.name}</h2>
            </CardTitle>
            <CardDescription className="flex justify-between">
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-8 space-y-1">
            <RatingSection />
            <PriceSection />
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
              <RedirectButton
                url={`https://www.cheapshark.com/redirect?dealID=${id}&k=1`}
                text={"Get Deal"}
              />
              <WishlistButton title={data.gameInfo.name} />
            </div>
          </CardFooter>
        </Card>
      </div>
      <CheaperDealsSection />
    </>
  );
}
