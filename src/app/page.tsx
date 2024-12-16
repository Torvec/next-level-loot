import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BannerSection from "@/components/ui/banner-section";
import { ChevronRight } from "lucide-react";

// Main Component

export default function Home() {
  return (
    <div className="mb-32 space-y-32">
      <HeroSection />
      <div className="grid grid-cols-6 gap-6">
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
      <Suspense fallback={<div>Loading StoreFronts...</div>}>
        <StoreFrontsSection />
      </Suspense>
    </div>
  );
}

// Sub Components

const HeroSection = () => {
  return (
    <section className="grid min-h-[50vh] place-content-center text-center">
      <h2 className="text-4xl font-black uppercase">Next-Level-Loot</h2>
      <span className="text-muted-foreground">
        Taking your gaming budget to the next level!
      </span>
    </section>
  );
};

const LatestDealsSection = async () => {
  const url =
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Recent&pageSize=10";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch the latest deals. Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  const formattedData = data.map((item: Record<string, string>) => ({
    id: item.dealID,
    image: item.thumb,
    name: item.title,
    normalPrice: item.normalPrice,
    salePrice: item.salePrice,
  }));

  const apiLink = { name: "CheapShark", href: "https://www.cheapshark.com/" };

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
  const url =
    "https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=date&type=game";
  const headers = {
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };
  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Latest Giveaways. Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  const formattedData = data
    .slice(0, 10)
    .map((item: Record<string, string>) => ({
      id: item.id,
      image: item.thumbnail,
      name: item.title,
      worth: item.worth,
    }));

  const apiLink = {
    name: "GamerPower",
    href: "https://www.gamerpower.com/",
  };

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
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Latest Giveaways. Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

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
  const stores = [
    {
      name: "Steam",
      href: "https://store.steampowered.com/",
    },
    {
      name: "Epic Games Store",
      href: "https://store.epicgames.com/",
    },
    { name: "itch.io", href: "https://itch.io/" },
    { name: "GoG", href: "https://www.gog.com/" },
    {
      name: "GamersGate",
      href: "https://www.gamersgate.com/",
    },
    {
      name: "GreenManGaming",
      href: "https://www.greenmangaming.com/",
    },
    {
      name: "EA App Store",
      href: "https://www.ea.com/games/library/pc-download",
    },
    {
      name: "Humble Store",
      href: "https://www.humblebundle.com/store",
    },
    { name: "Ubisoft Store", href: "https://store.ubi.com/" },
    { name: "Fanatical", href: "https://www.fanatical.com/" },
    {
      name: "WinGameStore",
      href: "https://www.wingamestore.com/",
    },
    {
      name: "GameBillet",
      href: "https://www.gamebillet.com/",
    },
    { name: "Voidu", href: "https://www.voidu.com/" },
    {
      name: "Gamesplanet",
      href: "https://us.gamesplanet.com/",
    },
    { name: "Gamesload", href: "https://www.gamesload.com/" },
    { name: "2Game", href: "https://www.2game.com/" },
    { name: "IndieGala", href: "https://www.indiegala.com/" },
    {
      name: "Blizzard Shop",
      href: "https://us.shop.battle.net/",
    },
    { name: "DLGamer", href: "https://www.dlgamer.com/" },
    { name: "Noctre", href: "https://www.noctre.com/" },
    { name: "DreamGame", href: "https://www.dreamgame.com/" },
    {
      name: "PlayStation Store",
      href: "https://store.playstation.com/",
    },
    { name: "Xbox Store", href: "https://www.xbox.com/" },
    {
      name: "App Store",
      href: "https://www.apple.com/app-store/",
    },
    {
      name: "Nintendo Store",
      href: "https://www.nintendo.com/store/",
    },
    {
      name: "Google Play Store",
      href: "https://play.google.com/store",
    },
  ];

  return (
    <section>
      <h3 className="mb-16 text-center text-xl font-bold">Featured Stores</h3>
      <div className="flex flex-wrap items-end justify-center gap-6 text-lg">
        {stores.map((store) => (
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
}: {
  sectionTitle: string;
  apiLink: { name: string; href: string };
  data: {
    id: string | number;
    image: string;
    name: string;
    rating?: string;
    worth?: string;
    normalPrice?: string;
    salePrice?: string;
  }[];
  path: string;
  buttonText: string;
}) => {
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
          className="px-2 py-1 text-highlight hover:text-foreground hover:underline"
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

const CategorySectionSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 }).map((_, index) => (
    <CategorySectionSkeletonCards key={index} />
  ));

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <Skeleton className="h-7" />
      <div>{skeletonCards}</div>
      <Skeleton className="h-10" />
    </div>
  );
};

const CategorySectionSkeletonCards = () => {
  return (
    <div className="grid grid-cols-4 items-center gap-4 p-2">
      <Skeleton className="h-24" />
      <Skeleton className="col-span-2 h-5 w-full" />
      <div className="space-y-1">
        <Skeleton className="ml-auto h-4" />
        <Skeleton className="ml-auto h-7" />
      </div>
    </div>
  );
};
