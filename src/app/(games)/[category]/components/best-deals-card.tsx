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
import { GameDealType } from "../types";

export default function BestDealsCard(data: GameDealType) {
  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.releaseDate > 0
        ? new Date(data.releaseDate * 1000).toLocaleDateString()
        : "N/A";

    return <p>Released: {formattedReleaseDate}</p>;
  };

  const MetacriticSection = () => (
    <div className="w-full text-center">
      {data.metacriticLink ? (
        <a
          href={`https://www.metacritic.com${data.metacriticLink}`}
          target="_blank"
          rel="noopener external"
          className="block h-full bg-muted py-2 hover:bg-background"
        >
          <span className="block font-bold">Metacritic</span>
          <span className="text-xl font-bold">
            {data.metacriticScore !== "0" ? data.metacriticScore : "N/A"}
          </span>
        </a>
      ) : (
        <p className="h-full place-content-center bg-muted py-2 text-muted-foreground">
          Metacritic
          <br /> Data Unavailable
        </p>
      )}
    </div>
  );

  const SteamSection = () => (
    <div className="w-full text-center">
      {data.steamAppID ? (
        <a
          href={`https://store.steampowered.com/app/${data.steamAppID}`}
          target="_blank"
          rel="noopener external"
          className="block h-full bg-muted py-2 hover:bg-background"
        >
          <span className="block font-bold">Steam</span>
          <div>
            <span className="block font-bold">
              {data.steamRatingPercent}% {data.steamRatingText}
            </span>
            <span className="block text-muted-foreground">
              {data.steamRatingCount} Reviews
            </span>
          </div>
        </a>
      ) : (
        <p className="h-full place-content-center bg-muted py-2 text-muted-foreground">
          Steam
          <br /> Data Unavailable
        </p>
      )}
    </div>
  );

  const RatingSection = () => (
    <div className="grid grid-cols-2 gap-1">
      <MetacriticSection />
      <SteamSection />
    </div>
  );

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
        <RatingSection />
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
