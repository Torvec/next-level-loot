import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import {
  type DealsCardProps,
  type DealsCardDescriptionSectionProps,
  type DealsCardPriceSectionProps,
} from "@/types/deals-types";
import { query } from "@/lib/query";

export default function DealsCard(data: DealsCardProps) {
  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.thumb} alt={data.title} />
        <CardTitle>
          <h2 className="text-lg">{data.title}</h2>
        </CardTitle>
        <CardDescription>
          <DealsCardDescriptionSection
            storeID={data.storeID}
            releaseDate={data.releaseDate}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <DealsCardPriceSection
          savings={data.savings}
          dealRating={data.dealRating}
          salePrice={data.salePrice}
          normalPrice={data.normalPrice}
        />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <RedirectButton
          url={`https://www.cheapshark.com/redirect?dealID=${data.dealID}`}
          displayText={"Get Deal"}
        />
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <WishlistButton
            item={{
              id: data.dealID,
              title: data.title,
              src: data.thumb,
              path: "/deals/",
              price: data.salePrice,
            }}
          />
          <MoreDetailsButton path={"/deals/"} id={data.dealID} />
        </div>
      </CardFooter>
    </Card>
  );
}

const DealsCardDescriptionSection = ({
  releaseDate,
  storeID,
}: DealsCardDescriptionSectionProps) => {
  const storeOptions = query["deals"].queryParams.filters?.[0].options;
  const storeName = storeOptions?.find((name) => name.value === storeID);

  const formattedReleaseDate =
    releaseDate > 0 ? new Date(releaseDate * 1000).toLocaleDateString() : "N/A";

  return (
    <>
      <span className="block text-sm">
        Store: {storeName && storeName.name}
      </span>
      <span>Released: {formattedReleaseDate}</span>
    </>
  );
};

const DealsCardPriceSection = ({
  savings,
  dealRating,
  salePrice,
  normalPrice,
}: DealsCardPriceSectionProps) => {
  const formattedSavings = parseFloat(savings).toFixed(0);

  const formattedDealRating = parseFloat(dealRating).toFixed(0);

  const displaySalePrice = salePrice !== "0.00" ? `$${salePrice}` : "FREE";

  return (
    <div className="mx-auto w-max">
      <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
        <span className="font rounded-xl text-2xl text-highlight">
          -{formattedSavings}%
        </span>
        <div>
          <span className="block text-sm text-muted-foreground line-through">
            ${normalPrice}
          </span>
          <span className="block">{displaySalePrice}</span>
        </div>
      </div>
      <span className="block text-center text-sm text-muted-foreground">
        {formattedDealRating}/10 Deal
      </span>
    </div>
  );
};
