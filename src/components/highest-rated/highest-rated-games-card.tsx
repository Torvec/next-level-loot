import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FindDealsButton from "@/components/ui/buttons/find-deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import BannerSection from "@/components/ui/banner-section";
import { HighestRatedGameType } from "@/lib/types";

export default function HighestRatedGamesCard(data: HighestRatedGameType) {
  const DescriptionSection = () => (
    <>
      <p>Released: {data.released}</p>
      <p>ESRB: {data.esrb_rating ? data.esrb_rating.name : "Not Rated"}</p>
    </>
  );

  const ScoreRatingSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col justify-between rounded-xl border-2 border-muted-foreground py-4 text-center">
          <span className="block text-sm font-bold uppercase opacity-80">
            Score
          </span>
          <span className="block text-3xl font-black">{data.metacritic}%</span>
          <span className="text-sm text-muted-foreground">Metacritic</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/25">
      <CardHeader>
        <BannerSection src={data.background_image} alt={data.name} />
        <CardTitle>
          <h2 className="text-lg">{data.name}</h2>
        </CardTitle>
        <CardDescription>
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScoreRatingSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <FindDealsButton title={data.name} />
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <WishlistButton title={data.name} />
          <MoreDetailsButton path={"/highest-rated/"} id={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
