import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/wishlist-button";
import { HighestRatedGameDetailsType } from "../types";
import Link from "next/link";

export default function HighestRatedDetails({
  name,
  background_image,
  metacritic,
  released,
  esrb_rating,
  description_raw,
  platforms,
  genres,
  stores,
  developers,
  publishers,
  tags,
}: HighestRatedGameDetailsType) {
  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{name}</h2>
      <div className="flex flex-col">
        <span className="text-base font-normal uppercase text-muted-foreground sm:text-center">
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
        {list.length > 0 ? (
          <ul className="space-y-1">
            {list.map((item) => (
              <li key={keyExtractor(item)}>
                <Badge className="hover:scale-105">{renderItem(item)}</Badge>
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
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.id}>
              <Badge className="hover:scale-105">{tag.name}</Badge>
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

  const DescriptionText = () => (
    <div>
      {description_raw ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p className="text-sm leading-loose text-muted-foreground">
            {description_raw}
          </p>
        </>
      ) : (
        <div className="bg-background px-4 py-2 text-center text-foreground">
          Description Unavailable
        </div>
      )}
    </div>
  );

  const FindDealsButton = () => (
    <Button asChild className="w-full bg-muted-foreground hover:bg-foreground">
      <Link href={"/best-deals"}>Find Deals</Link>
    </Button>
  );

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4 lg:flex-row">
        <div className="lg:w-1/3">
          <BannerSection src={background_image} alt={name} />
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
          <CardContent className="mb-8 space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
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
              <InfoList
                title="Developers"
                list={developers}
                keyExtractor={(d) => d.id.toString()}
                renderItem={(d) => d.name}
              />
              <InfoList
                title="Publishers"
                list={publishers}
                keyExtractor={(p) => p.id.toString()}
                renderItem={(p) => p.name}
              />
            </div>
            <DescriptionText />
            <TagList />
          </CardContent>
          <CardFooter className="flex-col justify-between gap-4 md:flex-row">
            <FindDealsButton />
            <WishlistButton title={name} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
