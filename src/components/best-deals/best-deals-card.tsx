import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import { BestDealsType } from "@/lib/types";

export default function BestDealsCard(data: BestDealsType) {
  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.releaseDate > 0
        ? new Date(data.releaseDate * 1000).toLocaleDateString()
        : "N/A";

    return <p>Released: {formattedReleaseDate}</p>;
  };

  const ScoreRatingSection = () => {
    return (
      <div className="flex gap-4">
        {data.metacriticLink ? (
          <div className="flex h-full w-full flex-col justify-between gap-1 rounded-xl border-2 border-muted py-4 text-center">
            <span className="block text-3xl font-black">
              {data.metacriticScore !== "0"
                ? data.metacriticScore + "%"
                : "N/A"}
            </span>
            <a
              href={`https://www.metacritic.com${data.metacriticLink}`}
              target="_blank"
              rel="noopener external"
            >
              <span className="text-sm text-muted-foreground">Metacritic</span>
            </a>
          </div>
        ) : (
          <p className="w-full place-content-center bg-muted p-2 text-muted-foreground">
            Metacritic
            <br /> Data Unavailable
          </p>
        )}
        {data.steamAppID ? (
          <div className="flex w-full flex-col justify-between gap-1 rounded-xl border-2 border-muted py-4 text-center">
            <span className="block text-3xl font-black">
              {data.steamRatingPercent !== 0
                ? data.steamRatingPercent + "%"
                : "N/A"}
            </span>
            <a
              href={`https://store.steampowered.com/app/${data.steamAppID}`}
              target="_blank"
              rel="noopener external"
            >
              <span className="text-sm text-muted-foreground">Steam</span>
            </a>
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
    const formattedSavings = parseFloat(data.savings).toFixed(0);

    const formattedDealRating = parseFloat(data.dealRating).toFixed(0);

    return (
      <div className="mx-auto w-max space-y-4 pt-12">
        <div className="flex justify-start gap-4">
          <span className="font rounded-xl text-2xl text-gold-foreground">
            -{formattedSavings}%
          </span>
          <div className="flex flex-col justify-between">
            <span className="text-2xl font-bold">
              {data.salePrice !== "0.00" ? `$${data.salePrice}` : "FREE"}
            </span>
            <span className="text-muted-foreground line-through">
              ${data.normalPrice}
            </span>
          </div>
        </div>
        <p className="text-center text-muted-foreground">
          {formattedDealRating}/10 Deal!
        </p>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.thumb} alt={data.title} />
        <CardTitle>
          <h2 className="text-lg">{data.title}</h2>
        </CardTitle>
        <CardDescription className="flex justify-between">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScoreRatingSection />
        <PriceSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${data.dealID}&k=1`}
          text={"Get Deal"}
        />
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <WishlistButton title={data.title} />
          <MoreDetailsButton path={"/best-deals/"} id={data.dealID} />
        </div>
      </CardFooter>
    </Card>
  );
}
