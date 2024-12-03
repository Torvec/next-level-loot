import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { FreeGameType } from "@/lib/types";

export default function FreeGamesCard(data: FreeGameType) {
  const DescriptionSection = () => (
    <div className="space-y-1">
      <p>Type: {data.type}</p>
      <p>Platforms: {data.platforms}</p>
      <p>Start: {data.published_date}</p>
      <p>End: {data.end_date}</p>
    </div>
  );

  const PriceSection = () => {
    return (
      <div className="">
        <span className="block text-2xl font-bold">Free!</span>
        <span className="block text-muted-foreground line-through">
          {data.worth}
        </span>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle>
          <h2 className="text-lg">{data.title}</h2>
        </CardTitle>
        <CardDescription>
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PriceSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <RedirectButton url={data.open_giveaway_url} text={"Get Giveaway"} />
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <WishlistButton title={data.title} />
          <MoreDetailsButton path={"/free-games/"} id={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
