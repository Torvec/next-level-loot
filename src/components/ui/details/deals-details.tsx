import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import { Button } from "@/components/ui/buttons/button";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { DealsDetailsType } from "@/lib/types";
import { query } from "@/lib/query";
import { ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react";

export default function BestDealsDetails({
  id,
  ...data
}: { id: string } & DealsDetailsType) {
  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.gameInfo.releaseDate > 0
        ? new Date(data.gameInfo.releaseDate * 1000).toLocaleDateString()
        : "N/A";

    return <p>Released: {formattedReleaseDate}</p>;
  };

  const ScoreRatingSection = () => {
    return (
      <div className="space-y-4">
        {data.gameInfo.metacriticLink ? (
          <div className="flex flex-col justify-between gap-1 rounded-xl border-2 border-muted py-4 text-center">
            <span className="block text-sm font-bold uppercase opacity-80">
              Score
            </span>
            <span className="block text-3xl font-black">
              {data.gameInfo.metacriticScore !== "0"
                ? data.gameInfo.metacriticScore + "%"
                : "N/A"}
            </span>
            <a
              href={`https://www.metacritic.com${data.gameInfo.metacriticLink}`}
              target="_blank"
              rel="noopener external"
            >
              <span className="text-sm text-muted-foreground">Metacritic</span>
            </a>
          </div>
        ) : (
          <p className="h-full w-full place-content-center bg-muted p-2 text-muted-foreground">
            Metacritic
            <br /> Data Unavailable
          </p>
        )}
        {data.gameInfo.steamAppID ? (
          <div className="flex flex-grow flex-col justify-center gap-1">
            <a
              href={`https://store.steampowered.com/app/${data.gameInfo.steamAppID}`}
              target="_blank"
              rel="noopener external"
            >
              <span className="block text-center text-sm font-bold uppercase opacity-80">
                Steam Rating
              </span>
            </a>
            <div className="flex justify-between rounded py-0.5 text-sm">
              <div className="flex items-start gap-1">
                <span>{data.gameInfo.steamRatingPercent}%</span>
                <ThumbsUp size={16} />
              </div>
              <div className="flex items-end gap-1">
                <span>{100 - Number(data.gameInfo.steamRatingPercent)}%</span>
                <ThumbsDown size={16} />
              </div>
            </div>
            <div className="rounded-xl border border-foreground/50 bg-muted">
              <span
                className="block h-4 rounded bg-muted-foreground pl-2"
                style={{ width: `${data.gameInfo.steamRatingPercent}%` }}
              />
            </div>
            <span className="block text-center">
              {data.gameInfo.steamRatingText}
            </span>
            <span className="block text-center text-sm text-muted-foreground">
              {data.gameInfo.steamRatingCount} Ratings
            </span>
          </div>
        ) : (
          <p className="h-full w-full place-content-center bg-muted p-2 text-muted-foreground">
            Steam
            <br /> Data Unavailable
          </p>
        )}
      </div>
    );
  };

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
          <span className="rounded-xl border-4 border-highlight p-4 text-2xl font-black text-highlight">
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
    const storeOptions = query["deals"].queryParams.filters?.[0].options;

    return (
      <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
        <h3 className="mb-4 text-xl font-bold">Cheaper Deals</h3>
        <div className="flex flex-col gap-12 sm:flex-row sm:flex-wrap">
          {data.cheaperStores.length > 0 ? (
            data.cheaperStores.map((cs, index) => {
              const storeName = storeOptions?.find(
                (name) => name.value === cs.storeID,
              );
              return (
                <div
                  key={cs.dealID}
                  className="flex w-full flex-col justify-between gap-2 lg:w-1/6"
                >
                  <h3 className="font-bold opacity-75">
                    {storeName?.name} Deal
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
                      className={`w-full bg-muted-foreground hover:bg-foreground ${index === 0 ? "bg-foreground hover:bg-highlight" : ""}`}
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
      <Card className="mx-auto mb-8 flex max-w-4xl flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
        <CardHeader>
          <BannerSection src={data.gameInfo.thumb} alt={data.gameInfo.name} />
          <CardTitle>
            <h2>{data.gameInfo.name}</h2>
          </CardTitle>
          <CardDescription className="flex justify-between">
            <DescriptionSection />
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-8 space-y-1">
          <ScoreRatingSection />
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
      <CheaperDealsSection />
    </>
  );
}
