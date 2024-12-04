import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import FindDealsButton from "@/components/ui/buttons/find-deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import BannerSection from "@/components/ui/banner-section";
import { HighestRatedGameType } from "@/lib/types";

export default function HighestRatedCard(data: HighestRatedGameType) {
  const DescriptionSection = () => (
    <>
      <p>Released: {data.released}</p>
      <p>ESRB: {data.esrb_rating ? data.esrb_rating.name : "Not Rated"}</p>
    </>
  );

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
        <ScoreBoxButton
          title={data.name}
          score={data.metacritic}
          reviewSourceName="Metacritic"
          reviewSourceBaseURL="https://www.metacritic.com"
          reviewSourceSearch="https://www.metacritic.com/search/"
        />
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
