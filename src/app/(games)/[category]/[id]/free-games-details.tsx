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
import WishlistButton from "@/components/ui/wishlist-button";
import { FreeGameDetailsType } from "../types";

export default function FreeGamesDetails({
  title,
  worth,
  image,
  description,
  instructions,
  open_giveaway_url,
  published_date,
  type,
  platforms,
  end_date,
}: FreeGameDetailsType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{title}</h2>
      <div className="text-base sm:text-right">
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
      <div className="sm:text-right">
        <p>Started: {published_date}</p>
        <p>Ends: {end_date}</p>
      </div>
    </>
  );

  const DescriptionText = () => (
    <div>
      {description ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p>{description}</p>
        </>
      ) : (
        <div className="px-4 py-2 text-center text-muted-foreground">
          Description Unavailable
        </div>
      )}
    </div>
  );

  const InstructionsText = () => (
    <div>
      {instructions ? (
        <>
          <h3 className="font-bold">Instructions</h3>
          <p>{instructions}</p>
        </>
      ) : (
        <div className="px-4 py-2 text-center text-muted-foreground">
          Instructions Unavailable
        </div>
      )}
    </div>
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
    <>
      <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <BannerSection src={image} alt={title} />
        </div>
        <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted lg:w-2/3">
          <CardHeader>
            <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
              <TitleSection />
            </CardTitle>
            <CardDescription className="flex flex-col justify-between gap-2 sm:flex-row">
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-8 space-y-4">
            <DescriptionText />
            <InstructionsText />
          </CardContent>
          <CardFooter className="flex-col justify-between gap-4 md:flex-row">
            <GiveawayButton />
            <WishlistButton title={title} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
