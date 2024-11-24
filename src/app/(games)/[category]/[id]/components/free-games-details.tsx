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
import { FreeGameDetailsType } from "../../types";

export default function FreeGamesDetails(data: FreeGameDetailsType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{data.title}</h2>
      <div className="text-base sm:text-right">
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
      <div className="sm:text-right">
        <p>Started: {data.published_date}</p>
        <p>Ends: {data.end_date}</p>
      </div>
    </>
  );

  const DescriptionText = () => (
    <div>
      {data.description ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p>{data.description}</p>
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
      {data.instructions ? (
        <>
          <h3 className="font-bold">Instructions</h3>
          <p>{data.instructions}</p>
        </>
      ) : (
        <div className="px-4 py-2 text-center text-muted-foreground">
          Instructions Unavailable
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <BannerSection src={data.image} alt={data.title} />
        </div>
        <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20 lg:w-2/3">
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
          <CardFooter>
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
              <RedirectButton
                url={data.open_giveaway_url}
                text={"Get Giveaway"}
              />
              <WishlistButton title={data.title} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
