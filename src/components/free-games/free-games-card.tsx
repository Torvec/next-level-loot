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
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { FreeGameType } from "@/lib/types";

export default function FreeGamesCard(data: FreeGameType) {
  const DescriptionSection = () => (
    <>
      <div>
        <p>Type: {data.type}</p>
        <p>Platforms: {data.platforms}</p>
      </div>
      <div className="lg:text-right">
        <p>Started: {data.published_date}</p>
        <p>Ends: {data.end_date}</p>
      </div>
    </>
  );

  const PriceSection = () => {
    return (
      <div className="mx-auto w-max space-y-4 text-center text-base">
        <div className="flex gap-4">
          <span className="rounded-xl border-4 border-gold-foreground p-4 text-2xl font-black text-gold-foreground">
            -100%
          </span>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground line-through">
              {data.worth}
            </span>
            <span className="text-2xl font-bold">Free!</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle>
          <h2>{data.title}</h2>
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-4 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PriceSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <RedirectButton url={data.open_giveaway_url} text={"Get Giveaway"} />
          <WishlistButton title={data.title} />
        </div>
        <MoreDetailsButton path={"/free-games/"} id={data.id} />
      </CardFooter>
    </Card>
  );
}
