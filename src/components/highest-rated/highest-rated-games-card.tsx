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
    const initCount = 0;
    const totalRatingCount = data.ratings.reduce(
      (acc, rating) => acc + rating.count,
      initCount,
    );

    return (
      <div className="flex gap-4">
        <div className="flex w-1/3 flex-col justify-between rounded-xl border-2 border-muted-foreground py-4 text-center">
          <span className="block text-sm font-bold uppercase opacity-80">
            Score
          </span>
          <span className="block text-3xl font-black">{data.metacritic}%</span>
          <span className="text-sm text-muted-foreground">Metacritic</span>
        </div>
        <div className="w-2/3">
          <ul className="mb-2 space-y-1">
            {data.ratings.map((rating) => (
              <li
                key={rating.id}
                className="flex justify-between bg-muted py-0.5 text-sm"
              >
                <span
                  className="block bg-muted-foreground pl-2"
                  style={{ width: `${rating.percent}%` }}
                >
                  {rating.percent}%
                </span>
                <span className="pr-2">{rating.title}</span>
              </li>
            ))}
          </ul>
          <span className="block text-center text-sm text-muted-foreground">
            {totalRatingCount} Ratings
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/25">
      <CardHeader>
        <BannerSection src={data.background_image} alt={data.name} />
        <CardTitle>
          <h2>{data.name}</h2>
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-2 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScoreRatingSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <FindDealsButton title={data.name} />
          <WishlistButton title={data.name} />
        </div>
        <MoreDetailsButton path={"/highest-rated/"} id={data.id} />
      </CardFooter>
    </Card>
  );
}
