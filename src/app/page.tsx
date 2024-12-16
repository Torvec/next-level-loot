import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-6">
      <span className="block bg-destructive py-4 text-center italic">
        Under Development - Almost done! I think..
      </span>
      <HeroSection />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<div>Loading Latest Deals...</div>}>
          <LatestDealsSection />
        </Suspense>
        <Suspense fallback={<div>Loading Latest Giveaways...</div>}>
          <LatestGiveawaysSection />
        </Suspense>
        <Suspense fallback={<div>Loading Highest Rated Games...</div>}>
          <HighestRatedGamesSection />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading StoreFronts...</div>}>
        <StoreFrontsSection />
      </Suspense>
      <span className="block bg-destructive py-4 text-center italic">
        Under Development - Is anything ever REALLY done though?
      </span>
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="grid min-h-[50vh] place-content-center bg-muted text-center">
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
    salePrice: item.salePrice,
  }));

  return (
    <CategorySection
      sectionTitle="Latest Deals"
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

  return (
    <CategorySection
      sectionTitle="Latest Giveaways"
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

  return (
    <CategorySection
      sectionTitle="Highest Rated Games"
      data={formattedData}
      path="/games"
      buttonText="More Games"
    />
  );
};

const StoreFrontsSection = () => {
  return (
    <section className="min-h-[50vh] rounded-xl border p-6">
      <h3 className="text-xl font-bold">Stores</h3>
    </section>
  );
};

const CategorySection = ({
  sectionTitle,
  data,
  path,
  buttonText,
}: {
  sectionTitle: string;
  data: {
    id: string | number;
    image: string;
    name: string;
    rating?: string;
    worth?: string;
    salePrice?: string;
  }[];
  path: string;
  buttonText: string;
}) => {
  return (
    <section className="flex flex-col gap-4 rounded-xl border p-6">
      <h3 className="text-xl font-bold">{sectionTitle}</h3>
      {data.map((item, index) => (
        <Link
          href={`${path}/${item.id}`}
          prefetch={true}
          key={item.id}
          className="bg-muted hover:bg-muted/50"
        >
          <div className="flex items-center justify-between gap-2 p-4">
            <div className="flex items-center gap-2">
              <span className="block text-xs text-muted-foreground">
                {index + 1}
              </span>
              <img src={item.image} className="max-h-12 w-auto" />
              <span className="block text-xs">{item.name}</span>
            </div>
            {item.rating && <span className="block">{item.rating}%</span>}
            {item.worth && <span className="block">{item.worth}</span>}
            {item.salePrice && <span className="block">${item.salePrice}</span>}
          </div>
        </Link>
      ))}
      <Button asChild className="bg-highlight">
        <Link href={path}>{buttonText}</Link>
      </Button>
    </section>
  );
};
