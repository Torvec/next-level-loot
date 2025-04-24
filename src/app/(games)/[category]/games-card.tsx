import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import FindDealsButton from "@/components/ui/buttons/deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import BannerSection from "@/components/ui/banner-section";
import { type GamesCardProps } from "@/types/games-types";

export default function GamesCard(data: GamesCardProps) {
  const getESRBRating = (rating: { name: string }) => {
    return rating ? rating.name : "Not Rated";
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/25">
      <CardHeader>
        <BannerSection src={data.background_image} alt={data.name} />
        <CardTitle>
          <h2 className="text-lg">{data.name}</h2>
        </CardTitle>
        <CardDescription>
          <span className="block">Released: {data.released}</span>
          <span className="block">ESRB: {getESRBRating(data.esrb_rating)}</span>
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
          <WishlistButton
            item={{
              id: data.id,
              title: data.name,
              src: data.background_image,
              path: "/games/",
              timestamp: Date.now(),
            }}
          />
          <MoreDetailsButton path={"/games/"} id={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
