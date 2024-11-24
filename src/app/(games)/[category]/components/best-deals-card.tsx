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
  const TitleSection = () => {
    const formattedSavings = parseFloat(data.savings).toFixed(0);

    return (
      <>
        <h2 className="w-full sm:w-2/3">{data.title}</h2>
        <div className="flex flex-col text-base sm:text-right">
          <div className="space-x-2">
            <span className="line-through opacity-70">${data.normalPrice}</span>
            <span className="text-xl">
              {data.salePrice !== "0.00" ? `$${data.salePrice}` : "FREE"}
            </span>
          </div>
          <span>{formattedSavings}% OFF!</span>
        </div>
      </>
    );
  };

  const DescriptionSection = () => {
    const formattedReleaseDate =
      data.releaseDate > 0
        ? new Date(data.releaseDate * 1000).toLocaleDateString()
        : "N/A";

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
      <>
        <p>Released: {formattedReleaseDate}</p>
        <p>{rating} Deal!</p>
      </>
    );
  };

  const MetacriticSection = () => (
    <div>
      {data.metacriticLink ? (
        <a
          href={`https://www.metacritic.com${data.metacriticLink}`}
          target="_blank"
          rel="noopener external"
          className="flex w-full items-center justify-between bg-muted px-4 py-2 hover:opacity-80"
        >
          <h3 className="font-bold">Metacritic</h3>
          <span className="text-lg font-bold">
            {data.metacriticScore !== "0" ? data.metacriticScore : "N/A"}
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
      {data.steamAppID ? (
        <a
          href={`https://store.steampowered.com/app/${data.steamAppID}`}
          target="_blank"
          rel="noopener external"
          className="flex w-full justify-between bg-muted px-4 py-2 hover:opacity-80"
        >
          <h3 className="font-bold">Steam</h3>
          <div className="flex flex-col text-right">
            <span className="font-bold sm:text-lg">
              {data.steamRatingPercent}% {data.steamRatingText}
            </span>
            <span className="text-muted-foreground">
              {data.steamRatingCount} Reviews
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

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.thumb} alt={data.title} />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex justify-between">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <MetacriticSection />
        <SteamSection />
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
