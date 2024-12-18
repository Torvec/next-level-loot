import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BannerSection from "@/components/ui/banner-section";
import { ChevronRight } from "lucide-react";
import {
  type CategorySectionProps,
  type FetchLatestDataProps,
} from "@/types/types";
import { query, storesData } from "@/lib/query";

// Main Component

export default function Page() {
  return (
    <div className="mb-32 space-y-32">
      <HeroSection />
      <div className="container mx-auto grid grid-cols-6 gap-6">
        <Suspense fallback={<CategorySectionSkeleton />}>
          <LatestDealsSection />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <LatestGiveawaysSection />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <HighestRatedGamesSection />
        </Suspense>
      </div>
      <StoreFrontsSection />
    </div>
  );
}

// Sub Components

const HeroSection = () => {
  return (
    <section className="grid h-[640px] place-content-center border-b text-center">
      <h2 className="text-4xl font-black uppercase">Next-Level-Loot</h2>
      <span className="text-muted-foreground">
        Taking your gaming budget to the next level!
      </span>
    </section>
  );
};

const LatestDealsSection = async () => {
  const apiLink = { name: "CheapShark", href: "https://www.cheapshark.com/" };
  const url =
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Recent&pageSize=10";

  const data = await fetchLatestData({ url });

  const formattedData = data.map((item: Record<string, string>) => ({
    id: item.dealID,
    image: item.thumb,
    name: item.title,
    normalPrice: item.normalPrice,
    salePrice: item.salePrice,
  }));

  return (
    <CategorySection
      sectionTitle="Latest Deals"
      apiLink={apiLink}
      data={formattedData}
      path="/deals"
      buttonText="More Deals"
    />
  );
};

const LatestGiveawaysSection = async () => {
  const apiLink = {
    name: "GamerPower",
    href: "https://www.gamerpower.com/",
  };
  const url =
    "https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=date&type=game";
  const headers = query.giveaways.headers;

  const data = await fetchLatestData({ url, headers });

  const formattedData = data
    .slice(0, 10)
    .map((item: Record<string, string>) => ({
      id: item.id,
      image: item.thumbnail,
      name: item.title,
      worth: item.worth,
    }));

  return (
    <CategorySection
      sectionTitle="Latest Giveaways"
      apiLink={apiLink}
      data={formattedData}
      path="/giveaways"
      buttonText="More Giveaways"
    />
  );
};

const HighestRatedGamesSection = async () => {
  const apiKey = process.env.RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page_size=10&platforms=4, 7, 186,187`;

  const data = await fetchLatestData({ url });

  const formattedData = data.results.map((item: Record<string, string>) => ({
    id: item.id,
    image: item.background_image,
    name: item.name,
    rating: item.metacritic,
  }));

  const apiLink = { name: "RAWG", href: "https://rawg.io/" };

  return (
    <CategorySection
      sectionTitle="Highest Rated Games"
      apiLink={apiLink}
      data={formattedData}
      path="/games"
      buttonText="More Games"
    />
  );
};

const StoreFrontsSection = () => {
  return (
    <section className="container mx-auto">
      <h3 className="mb-16 text-center text-xl font-bold">Featured Stores</h3>
      <div className="flex flex-wrap items-end justify-center gap-6 text-lg">
        {storesData.map((store) => (
          <a
            key={store.name}
            href={store.href}
            target="_blank"
            rel="noopener noreferrer external"
            className="mx-auto block w-max rounded-xl bg-muted px-4 py-1 text-highlight hover:bg-muted-foreground hover:text-background"
          >
            {store.name}
          </a>
        ))}
      </div>
    </section>
  );
};

const CategorySection = ({
  sectionTitle,
  apiLink,
  data,
  path,
  buttonText,
}: CategorySectionProps) => {
  return (
    <section className="col-span-6 space-y-2 rounded-xl border p-2 md:col-span-3 md:space-y-6 md:last:col-span-4 md:last:col-start-2 lg:col-span-2 lg:p-4 lg:last:col-span-2 lg:last:col-start-5 xl:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-center text-xl font-bold lg:text-left">
          {sectionTitle}
        </h3>
        <a
          href={apiLink.href}
          target="_blank"
          rel="noopener noreferrer external"
          className="px-2 py-1 text-sm text-highlight hover:text-foreground hover:underline"
        >
          {apiLink.name}
        </a>
      </div>
      <div>
        {data.map((item) => (
          <Link
            href={`${path}/${item.id}`}
            prefetch={true}
            key={item.id}
            className="grid grid-cols-4 items-center gap-2 p-2 hover:bg-muted md:gap-4"
          >
            <BannerSection src={item.image} alt={item.name} height="h-24" />
            <span className="col-span-2 block text-sm">{item.name}</span>
            {item.rating && (
              <span className="block text-right text-lg font-bold">
                {item.rating}%
              </span>
            )}
            {item.worth && (
              <div className="text-right">
                <span className="block text-xs text-muted-foreground line-through">
                  {item.worth}
                </span>
                <span className="block">Free</span>
              </div>
            )}
            {item.salePrice && (
              <div className="text-right">
                <span className="block text-xs text-muted-foreground line-through">
                  ${item.normalPrice}
                </span>
                <span className="block">${item.salePrice}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
      <Button asChild className="w-full bg-highlight">
        <Link href={path}>
          {buttonText}
          <ChevronRight />
        </Link>
      </Button>
    </section>
  );
};

// Loading State UI Components

const CategorySectionSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 }).map((_, index) => (
    <SkeletonCards key={index} />
  ));

  return (
    <div className="col-span-6 space-y-2 rounded-xl border p-2 md:col-span-3 md:space-y-6 md:last:col-span-4 md:last:col-start-2 lg:col-span-2 lg:p-4 lg:last:col-span-2 lg:last:col-start-5 xl:p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-1/4" />
        <Skeleton className="h-4 w-1/5" />
      </div>
      <div>{skeletonCards}</div>
      <Skeleton className="h-10" />
    </div>
  );
};

const SkeletonCards = () => {
  return (
    <div className="grid grid-cols-4 items-center gap-2 p-2 md:gap-4">
      <Skeleton className="h-24" />
      <Skeleton className="col-span-2 h-5" />
      <div className="space-y-1">
        <Skeleton className="h-4" />
        <Skeleton className="h-7" />
      </div>
    </div>
  );
};

// Utility Functions

const fetchLatestData = async ({ url, headers }: FetchLatestDataProps) => {
  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data. Status: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};
