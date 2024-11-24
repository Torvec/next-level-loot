import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BannerSection from "@/components/ui/banner-section";
import FindDealsButton from "@/components/ui/buttons/find-deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { HighestRatedGameDetailsType } from "../../types";

export default function HighestRatedDetails(data: HighestRatedGameDetailsType) {
  const DescriptionSection = () => (
    <div className="flex flex-col justify-between gap-2 sm:flex-row">
      <p>Released: {data.released}</p>
      <p>ESRB: {data.esrb_rating ? data.esrb_rating.name : "Not Rated"}</p>
    </div>
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

  const DescriptionText = () => (
    <div>
      {data.description_raw ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p className="text-sm leading-loose text-muted-foreground">
            {data.description_raw}
          </p>
        </>
      ) : (
        <div className="bg-background px-4 py-2 text-center text-foreground">
          Description Unavailable
        </div>
      )}
    </div>
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
        {list.length > 0 ? (
          <ul className="space-y-1">
            {list.map((item) => (
              <li key={keyExtractor(item)}>
                <Badge>{renderItem(item)}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Data Unavailable</p>
        )}
      </div>
    );
  };

  const TagList = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-bold">Tags</h3>
      {data.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <li key={tag.id}>
              <Badge>{tag.name}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Data Unavailable
        </p>
      )}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <BannerSection src={data.background_image} alt={data.name} />
        </div>
        <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20 lg:w-2/3">
          <CardHeader>
            <CardTitle>
              <h2>{data.name}</h2>
            </CardTitle>
            <CardDescription>
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-8 space-y-8">
            <ScoreRatingSection />
            <DescriptionText />
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoList
                title="Platforms"
                list={data.platforms}
                keyExtractor={(p) => p.platform.id.toString()}
                renderItem={(p) => p.platform.name}
              />
              <InfoList
                title="Genres"
                list={data.genres}
                keyExtractor={(genre) => genre.id.toString()}
                renderItem={(genre) => genre.name}
              />
              <InfoList
                title="Stores"
                list={data.stores}
                keyExtractor={(s) => s.store.id.toString()}
                renderItem={(s) => s.store.name}
              />
              <InfoList
                title="Developers"
                list={data.developers}
                keyExtractor={(d) => d.id.toString()}
                renderItem={(d) => d.name}
              />
              <InfoList
                title="Publishers"
                list={data.publishers}
                keyExtractor={(p) => p.id.toString()}
                renderItem={(p) => p.name}
              />
            </div>
            <TagList />
          </CardContent>
          <CardFooter className="flex-col justify-between gap-4 md:flex-row">
            <FindDealsButton />
            <WishlistButton title={data.name} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
