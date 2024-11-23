import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/wishlist-button";
import { GameDealDetailsType } from "../../types";
import { fetchOptions } from "@/lib/fetch";

export default function BestDealsDetails(data: GameDealDetailsType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{data.gameInfo.name}</h2>
      <div className="text-base sm:text-right">
        <div className="space-x-2">
          <span className="line-through opacity-70">
            ${data.gameInfo.retailPrice}
          </span>
          <span className="text-xl">
            {data.gameInfo.salePrice !== "0.00"
              ? `$${data.gameInfo.salePrice}`
              : "FREE!"}
          </span>
        </div>
      </div>
    </>
  );

  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.gameInfo.releaseDate > 0
        ? new Date(data.gameInfo.releaseDate * 1000).toLocaleDateString()
        : "N/A";
    return <p>Released: {formattedReleaseDate}</p>;
  };

  const MetacriticSection = () => (
    <div>
      {data.gameInfo.metacriticLink ? (
        <a
          href={`https://www.metacritic.com${data.gameInfo.metacriticLink}`}
          target="_blank"
          rel="noopener external"
          className="flex w-full items-center justify-between bg-muted px-4 py-2 hover:opacity-80"
        >
          <h3 className="font-bold">Metacritic</h3>
          <span className="text-lg font-bold">
            {data.gameInfo.metacriticScore !== "0"
              ? data.gameInfo.metacriticScore
              : "N/A"}
          </span>
        </a>
      ) : (
        <div className="bg-muted px-4 py-2 text-center text-muted-foreground">
          Metacritic Data Unavailable
        </div>
      )}
    </div>
  );

  const SteamSection = () => (
    <div>
      {data.gameInfo.steamAppID ? (
        <a
          href={`https://store.steampowered.com/app/${data.gameInfo.steamAppID}`}
          target="_blank"
          rel="noopener external"
          className="flex w-full justify-between bg-muted px-4 py-2 hover:opacity-80"
        >
          <h3 className="font-bold">Steam</h3>
          <div className="flex flex-col text-right">
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
        <div className="bg-muted px-4 py-2 text-center text-muted-foreground">
          Steam Data Unavailable
        </div>
      )}
    </div>
  );

  const CheaperDealsSection = () => {
    const fetchStores = fetchOptions["best-deals"].filter.store;
    const storeNames = fetchStores && fetchStores.map((store) => store.name);

    return (
      <div className="rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
        <h3 className="text-xl font-bold">Cheaper Deals</h3>
        <div className="flex flex-col gap-8 sm:flex-row">
          {data.cheaperStores.length > 0 ? (
            data.cheaperStores.map((cs) => {
              const storeID = Number(cs.storeID);
              return (
                <div key={cs.dealID} className="space-y-2 p-4">
                  <h3 className="font-bold">
                    {storeNames && storeNames[storeID - 1]} Deal
                  </h3>
                  <div className="space-x-2">
                    <span className="line-through opacity-70">
                      ${data.gameInfo.retailPrice}
                    </span>
                    <span className="text-xl">
                      {data.gameInfo.salePrice !== "0.00"
                        ? `$${data.gameInfo.salePrice}`
                        : "FREE"}
                    </span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-muted-foreground hover:bg-foreground"
                  >
                    <Link prefetch={true} href={`/best-deals/${cs.dealID}`}>
                      View Deal
                    </Link>
                  </Button>
                </div>
              );
            })
          ) : (
            <p className="flex-grow p-8 text-center text-muted-foreground">
              No cheaper deals found :/
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
            <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
              <TitleSection />
            </CardTitle>
            <CardDescription className="flex justify-between">
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-8 space-y-1">
            <MetacriticSection />
            <SteamSection />
          </CardContent>
          <CardFooter>
            <WishlistButton title={data.gameInfo.name} />
          </CardFooter>
        </Card>
      </div>
      <CheaperDealsSection />
    </>
  );
}
