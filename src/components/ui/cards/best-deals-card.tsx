import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
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
        <div className="flex gap-4">
          <ScoreBoxButton
            apiLink={data.metacriticLink}
            title={data.title}
            score={data.metacriticScore}
            reviewSourceName="Metacritic"
            reviewSourceBaseURL="https://www.metacritic.com"
            reviewSourceSearch="https://www.metacritic.com/search/"
          />
          <ScoreBoxButton
            apiLink={data.steamAppID}
            title={data.title}
            score={data.steamRatingPercent}
            reviewSourceName="Steam"
            reviewSourceBaseURL="https://store.steampowered.com/app/"
            reviewSourceSearch="https://store.steampowered.com/search/?term="
          />
        </div>
        <PriceSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${data.dealID}`}
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
