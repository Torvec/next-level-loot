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
          <div className="flex w-1/3 flex-col justify-between gap-1 rounded-xl border-2 border-muted-foreground py-4 text-center">
            <span className="block text-sm font-bold uppercase opacity-80">
              Score
            </span>
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
          <p className="h-full w-full place-content-center bg-muted p-2 text-muted-foreground">
            Metacritic
            <br /> Data Unavailable
          </p>
        )}
        {data.steamAppID ? (
          <div className="flex w-2/3 flex-grow flex-col justify-center gap-1">
            <a
              href={`https://store.steampowered.com/app/${data.steamAppID}`}
              target="_blank"
              rel="noopener external"
            >
              <span className="block text-center text-sm font-bold uppercase opacity-80">
                Steam Rating
              </span>
            </a>
            <div className="flex justify-between rounded py-0.5 text-sm">
              <span>{data.steamRatingPercent}%</span>
              <span className="pr-2">{data.steamRatingText}</span>
            </div>
            <div className="rounded bg-muted">
              <span
                className="block h-4 rounded bg-muted-foreground pl-2"
                style={{ width: `${data.steamRatingPercent}%` }}
              />
            </div>
            <span className="block text-center text-sm text-muted-foreground">
              {data.steamRatingCount} Ratings
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
    const formattedSavings = parseFloat(data.savings).toFixed(0);

    const formattedDealRating = parseFloat(data.dealRating).toFixed(0);
    const ratings: { [key: number]: string } = {
      1: "Abysmal",
      2: "Terrible",
      3: "Poor",
      4: "Bad",
      5: "Mediocre",
      6: "Fair",
      7: "Good",
      8: "Very Good",
      9: "Excellent",
      10: "Perfect",
    };
    const rating = ratings[parseInt(formattedDealRating)];

    return (
      <div className="mx-auto w-max space-y-4 pt-12 text-center text-base">
        <div className="flex gap-4">
          <span className="rounded-xl border-4 border-gold-foreground p-4 text-2xl font-black text-gold-foreground">
            -{formattedSavings}%
          </span>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground line-through">
              ${data.normalPrice}
            </span>
            <span className="text-2xl font-bold">
              {data.salePrice !== "0.00" ? `$${data.salePrice}` : "FREE"}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground">{rating} Deal!</p>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.thumb} alt={data.title} />
        <CardTitle>
          <h2>{data.title}</h2>
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
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <RedirectButton
            url={`https://www.cheapshark.com/redirect?dealID=${data.dealID}&k=1`}
            text={"Get Deal"}
          />
          <WishlistButton title={data.title} />
        </div>
        <MoreDetailsButton path={"/best-deals/"} id={data.dealID} />
      </CardFooter>
    </Card>
  );
}
