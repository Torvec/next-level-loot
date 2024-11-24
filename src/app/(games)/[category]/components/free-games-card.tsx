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
import { FreeGameType } from "../types";

export default function FreeGamesCard(data: FreeGameType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{data.title}</h2>
      <div className="flex flex-col text-base lg:text-right">
        <div className="space-x-2">
          <span className="line-through opacity-70">{data.worth}</span>
          <span className="text-xl">Free!</span>
        </div>
      </div>
    </>
  );

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

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-4 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* TODO: Put something here or re-arrange this card */}
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
