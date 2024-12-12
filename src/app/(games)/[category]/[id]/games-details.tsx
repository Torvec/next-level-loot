import { Badge } from "@/components/ui/badge";
import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import FindDealsButton from "@/components/ui/buttons/deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import {
  type GamesDetailsProps,
  type GamesDetailsHeaderProps,
  type GamesDetailsMainColumnProps,
  type GamesDetailsScoreRatingSectionProps,
  type GamesDetailsSideBarProps,
  type GamesDetailsBadgeListProps,
} from "@/types/games-types";

export default function GamesDetails(data: GamesDetailsProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <GamesDetailsHeader
        title={data.name}
        src={data.background_image}
        released={data.released}
        esrb={data.esrb_rating}
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <GamesDetailsMainColumn
          src={data.background_image}
          title={data.name}
          id={data.id}
          metacritic={data.metacritic}
          ratings={data.ratings}
          description={data.description_raw}
        />
        <GamesDetailsSideBar
          platforms={data.platforms}
          genres={data.genres}
          stores={data.stores}
          developers={data.developers}
          publishers={data.publishers}
          tags={data.tags}
        />
      </div>
    </div>
  );
}

const GamesDetailsHeader = ({
  title,
  src,
  released,
  esrb,
}: GamesDetailsHeaderProps) => {
  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
      <BannerSection src={src} alt={title} />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex flex-col text-sm text-muted-foreground sm:flex-row md:justify-between">
          <p>Released: {released}</p>
          <p>ESRB: {esrb ? esrb.name : "Not Rated"}</p>
        </div>
      </div>
    </div>
  );
};

const GamesDetailsMainColumn = ({
  src,
  title,
  id,
  metacritic,
  ratings,
  description,
}: GamesDetailsMainColumnProps) => {
  return (
    <div className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
      <GamesDetailsScoreRatingSection
        title={title}
        metacritic={metacritic}
        ratings={ratings}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <FindDealsButton title={title} />
        <WishlistButton
          item={{
            id: id,
            title: title,
            src: src,
            path: "/games/",
          }}
        />
      </div>
      <GamesDetailsDescriptionText description={description} />
    </div>
  );
};

const GamesDetailsScoreRatingSection = ({
  ratings,
  title,
  metacritic,
}: GamesDetailsScoreRatingSectionProps) => {
  const initCount = 0;
  const totalRatingCount = ratings.reduce(
    (acc, rating) => acc + rating.count,
    initCount,
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="md:w-1/4">
        <ScoreBoxButton
          title={title}
          score={metacritic}
          reviewSourceName="Metacritic"
          reviewSourceBaseURL="https://www.metacritic.com"
          reviewSourceSearch="https://www.metacritic.com/search/"
        />
      </div>
      <div className="md:w-3/4">
        <ul className="mb-2 space-y-1">
          {ratings.map((rating) => (
            <li
              key={rating.id}
              className="flex justify-between rounded-xl bg-muted py-0.5 text-sm"
            >
              <span
                className="block rounded-xl bg-muted-foreground pl-2"
                style={{ width: `${rating.percent}%` }}
              >
                {rating.percent}%
              </span>
              <span className="pr-2">{rating.title}</span>
            </li>
          ))}
        </ul>
        <span className="block text-center text-sm text-muted-foreground">
          {totalRatingCount} Ratings on{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            rel="noopener external"
            className="text-highlight hover:underline"
          >
            RAWG
          </a>
        </span>
      </div>
    </div>
  );
};

const GamesDetailsDescriptionText = ({
  description,
}: {
  description: string;
}) => (
  <div>
    {description ? (
      <>
        <h3>Description</h3>
        <p className="text-sm leading-loose text-muted-foreground">
          {description}
        </p>
      </>
    ) : (
      <div className="bg-background px-4 py-2 text-center text-foreground">
        Description Unavailable
      </div>
    )}
  </div>
);

const GamesDetailsSideBar = ({
  platforms,
  genres,
  stores,
  developers,
  publishers,
  tags,
}: GamesDetailsSideBarProps) => {
  return (
    <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
      <div className="space-y-6">
        <GamesDetailsBadgeList
          title="Platforms"
          list={platforms}
          keyExtractor={(p) => p.platform.id.toString()}
          renderItem={(p) => p.platform.name}
        />
        <GamesDetailsBadgeList
          title="Genres"
          list={genres}
          keyExtractor={(g) => g.id.toString()}
          renderItem={(g) => g.name}
        />
        <GamesDetailsBadgeList
          title="Stores"
          list={stores}
          keyExtractor={(s) => s.store.id.toString()}
          renderItem={(s) => s.store.name}
        />
        <GamesDetailsBadgeList
          title="Developers"
          list={developers}
          keyExtractor={(d) => d.id.toString()}
          renderItem={(d) => d.name}
        />
        <GamesDetailsBadgeList
          title="Publishers"
          list={publishers}
          keyExtractor={(p) => p.id.toString()}
          renderItem={(p) => p.name}
        />
        <GamesDetailsBadgeList
          title="Tags"
          list={tags}
          keyExtractor={(t) => t.id.toString()}
          renderItem={(t) => t.name}
        />
      </div>
    </aside>
  );
};

const GamesDetailsBadgeList = <T,>({
  title,
  list,
  keyExtractor,
  renderItem,
}: GamesDetailsBadgeListProps<T>) => {
  return (
    <div>
      <h3>{title}</h3>
      {list.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {list.map((item) => (
            <li key={keyExtractor(item)}>
              <Badge className="bg-muted-foreground">{renderItem(item)}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Data Unavailable</p>
      )}
    </div>
  );
};
