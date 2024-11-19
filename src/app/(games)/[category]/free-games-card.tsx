import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import BannerSection from "@/components/ui/banner-section";
import MoreDetailsButton from "@/components/ui/more-details-button";
import WishlistButton from "@/components/ui/wishlist-button";
import { FreeGameType } from "./types";

export default function FreeGamesCard({
  id,
  title,
  type,
  worth,
  image,
  open_giveaway_url,
  published_date,
  platforms,
  end_date,
}: FreeGameType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{title}</h2>
      <div className="flex flex-col text-base lg:text-right">
        <div className="space-x-2">
          <span className="line-through opacity-70">${worth}</span>
          <span className="text-xl">Free!</span>
        </div>
      </div>
    </>
  );

  const DescriptionSection = () => (
    <>
      <div>
        <p>Type: {type}</p>
        <p>Platforms: {platforms}</p>
      </div>
      <div className="lg:text-right">
        <p>Started: {published_date}</p>
        <p>Ends: {end_date}</p>
      </div>
    </>
  );

  const GiveawayButton = () => (
    <Button
      asChild
      className="w-full bg-muted-foreground hover:bg-background hover:text-foreground"
    >
      <a
        href={open_giveaway_url}
        target="_blank"
        rel="noopener noreferrer external"
      >
        Get Giveaway
        <ExternalLink />
      </a>
    </Button>
  );

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted">
      <CardHeader>
        <BannerSection src={image} alt={title} />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-4 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GiveawayButton />
      </CardContent>
      <CardFooter className="flex-col justify-between gap-4 md:flex-row">
        <MoreDetailsButton path={"/free-games/"} id={id} />
        <WishlistButton title={title} />
      </CardFooter>
    </Card>
  );
}
