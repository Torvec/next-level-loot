import { Badge } from "@/components/ui/badge";
import BannerSection from "@/components/ui/banner-section";
import ScoreBoxButton from "@/components/ui/buttons/score-box-button";
import FindDealsButton from "@/components/ui/buttons/deals-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import {
  type GamesDetailsProps,
  type GamesDetailsBadgeListProps,
} from "@/types/games-types";

export function GamesDetailsHeader(data: GamesDetailsProps) {
  return (
    <>
      <BannerSection src={data.background_image} alt={data.name} />
      <div>
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <div className="text-sm text-muted-foreground">
          <p>Released: {data.released}</p>
          <p>ESRB: {getESRBRating(data.esrb_rating)}</p>
        </div>
      </div>
    </>
  );
}

export function GamesDetailsMainColumn(data: GamesDetailsProps) {
  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/4">
          <ScoreBoxButton
            title={data.name}
            score={data.metacritic}
            reviewSourceName="Metacritic"
            reviewSourceBaseURL="https://www.metacritic.com"
            reviewSourceSearch="https://www.metacritic.com/search/"
          />
        </div>
        <div className="md:w-3/4">
          <ul className="mb-2 space-y-1">
            {data.ratings.map((rating) => (
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
            {getTotalRatingCount(data.ratings)} Ratings on{" "}
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
      <div className="flex flex-col gap-4 md:flex-row">
        <FindDealsButton title={data.name} />
        <WishlistButton
          item={{
            id: data.id,
            title: data.name,
            src: data.background_image,
            path: "/games/",
            timestamp: Date.now(),
          }}
        />
      </div>
      <div>
        {data.description_raw ? (
          <>
            <h3>Description</h3>
            <p className="text-sm leading-loose text-muted-foreground">
              {data.description_raw}
            </p>
          </>
        ) : (
          <div className="px-4 py-2 text-center text-foreground">
            Description Unavailable
          </div>
        )}
      </div>
    </>
  );
}

export function GamesDetailsSideBar(data: GamesDetailsProps) {
  return (
    <>
      <div className="space-y-6">
        <GamesDetailsBadgeList
          title="Platforms"
          list={data.platforms}
          keyExtractor={(p) => p.platform.id.toString()}
          renderItem={(p) => p.platform.name}
        />
        <GamesDetailsBadgeList
          title="Genres"
          list={data.genres}
          keyExtractor={(g) => g.id.toString()}
          renderItem={(g) => g.name}
        />
        <GamesDetailsBadgeList
          title="Stores"
          list={data.stores}
          keyExtractor={(s) => s.store.id.toString()}
          renderItem={(s) => s.store.name}
        />
        <GamesDetailsBadgeList
          title="Developers"
          list={data.developers}
          keyExtractor={(d) => d.id.toString()}
          renderItem={(d) => d.name}
        />
        <GamesDetailsBadgeList
          title="Publishers"
          list={data.publishers}
          keyExtractor={(p) => p.id.toString()}
          renderItem={(p) => p.name}
        />
        <GamesDetailsBadgeList
          title="Tags"
          list={data.tags}
          keyExtractor={(t) => t.id.toString()}
          renderItem={(t) => t.name}
        />
      </div>
    </>
  );
}

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

// Utility Functions

const getTotalRatingCount = (ratings: { count: number }[]) => {
  return ratings.reduce((acc, rating) => acc + rating.count, 0);
};

const getESRBRating = (rating: { name: string }) => {
  return rating ? rating.name : "Not Rated";
};
