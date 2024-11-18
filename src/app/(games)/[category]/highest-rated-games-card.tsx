import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WishlistButton from "@/components/ui/wishlist-button";
import MoreDetailsButton from "@/components/ui/more-details-button";
import BannerSection from "@/components/ui/banner-section";
import { Badge } from "@/components/ui/badge";
import { HighestRatedGameType } from "./types";

export default function HighestRatedGamesCard({
  id,
  name,
  platforms,
  stores,
  released,
  background_image,
  metacritic,
  esrb_rating,
  genres,
}: HighestRatedGameType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{name}</h2>
      <div className="flex flex-col">
        <span className="text-sm font-normal uppercase text-muted-foreground sm:text-center">
          Score
        </span>
        <span className="text-xl">{metacritic}/100</span>
      </div>
    </>
  );

  const DescriptionSection = () => (
    <>
      <p>Released: {released}</p>
      <p>ESRB: {esrb_rating ? esrb_rating.name : "Not Rated"}</p>
    </>
  );

  const InfoList = <T,>(props: {
    title: string;
    list: T[];
    keyExtractor: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
  }) => {
    const { title, list, keyExtractor, renderItem } = props;

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <ul className="space-y-1">
          {list.map((item) => (
            <li key={keyExtractor(item)}>
              <Badge variant="secondary">{renderItem(item)}</Badge>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted">
      <CardHeader>
        <BannerSection src={background_image} alt={name} />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-2 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <InfoList
          title="Platforms"
          list={platforms}
          keyExtractor={(p) => p.platform.id.toString()}
          renderItem={(p) => p.platform.name}
        />
        <InfoList
          title="Genres"
          list={genres}
          keyExtractor={(genre) => genre.id.toString()}
          renderItem={(genre) => genre.name}
        />
        <InfoList
          title="Stores"
          list={stores}
          keyExtractor={(s) => s.store.id.toString()}
          renderItem={(s) => s.store.name}
        />
      </CardContent>
      <CardFooter className="flex-col justify-between gap-4 md:flex-row">
        <MoreDetailsButton path={"/highest-rated/"} id={id} />
        <WishlistButton title={name} />
      </CardFooter>
    </Card>
  );
}
