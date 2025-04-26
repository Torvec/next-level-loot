import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BannerSection from "@/components/ui/banner-section";
import { ChevronRight } from "lucide-react";
import { type CategorySectionProps, type FetchLatestDataProps } from "@/types/types";
import { query, storesData } from "@/lib/query";

export default async function Page() {
  const fetchLatestData = async ({ url, headers }: FetchLatestDataProps) => {
    const response = await fetch(url, headers);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  };

  const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer external"
        className="text-highlight hover:underline"
      >
        {children}
      </a>
    );
  };

  const apiLink = {
    cheapshark: {
      name: "CheapShark",
      href: "https://www.cheapshark.com/",
    },
    gamerpower: {
      name: "GamerPower",
      href: "https://www.gamerpower.com/",
    },
    rawg: {
      name: "RAWG",
      href: "https://rawg.io/",
    },
  };

  const url = {
    cheapshark: "https://www.cheapshark.com/api/1.0/deals?sortBy=Recent&pageSize=10",
    gamerpower: "https://gamerpower.p.rapidapi.com/api/giveaways?sort-by=date&type=game",
    rawg: `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-metacritic&page_size=10&platforms=4, 7, 186,187`,
  };

  const data = {
    cheapshark: await fetchLatestData({ url: url.cheapshark }),
    gamerpower: await fetchLatestData({
      url: url.gamerpower,
      headers: query.giveaways.headers,
    }),
    rawg: await fetchLatestData({ url: url.rawg }),
  };

  const formattedData = {
    cheapshark: data.cheapshark.map((item: Record<string, string>) => ({
      id: item.dealID,
      image: item.thumb,
      name: item.title,
      normalPrice: item.normalPrice,
      salePrice: item.salePrice,
    })),
    gamerpower: data.gamerpower.slice(0, 10).map((item: Record<string, string>) => ({
      id: item.id,
      image: item.thumbnail,
      name: item.title,
      worth: item.worth,
    })),
    rawg: data.rawg.results.map((item: Record<string, string>) => ({
      id: item.id,
      image: item.background_image,
      name: item.name,
      rating: item.metacritic,
    })),
  };

  return (
    <div className="mb-32 space-y-32">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[512px] items-center justify-center border-b-2 bg-hero bg-cover bg-center bg-no-repeat">
        <div className="container z-20 mx-auto space-y-4 px-4 text-center md:px-0">
          <h2 className="mx-auto rounded-2xl border-4 border-highlight px-3 py-3 text-2xl font-black uppercase text-highlight shadow-xl shadow-foreground/20 backdrop-blur-3xl md:w-max md:border-[8px] md:px-6 md:text-5xl">
            Next-Level-Loot
          </h2>
          <span className="mx-auto block rounded bg-highlight px-2 py-1.5 text-sm font-medium text-background shadow-xl shadow-foreground/20 md:w-max md:px-4 md:text-xl">
            Take your gaming budget to the next level!
          </span>
        </div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-background to-90%" />
      </section>
      {/* CATEGORY SECTIONS */}
      <div className="container mx-auto grid grid-cols-6 gap-6 px-4 xl:px-0">
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection
            sectionTitle="Latest Deals"
            apiLink={apiLink.cheapshark}
            data={formattedData.cheapshark}
            path="/deals"
            buttonText="More Deals"
          />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection
            sectionTitle="Latest Giveaways"
            apiLink={apiLink.gamerpower}
            data={formattedData.gamerpower}
            path="/giveaways"
            buttonText="More Giveaways"
          />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection
            sectionTitle="Highest Rated Games"
            apiLink={apiLink.rawg}
            data={formattedData.rawg}
            path="/games"
            buttonText="More Games"
          />
        </Suspense>
      </div>
      {/* STORE LIST SECTION */}
      <section className="container mx-auto max-w-5xl px-4 xl:px-0">
        <h3 className="mb-16 text-center text-xl font-bold">Featured Stores</h3>
        <div className="flex flex-wrap items-end justify-center gap-6 text-lg">
          {storesData.map((store) => (
            <a
              key={store.name}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer external"
              className="mx-auto block w-max rounded-xl border-2 border-muted px-4 py-1 text-sm text-highlight transition-colors duration-150 ease-in-out hover:bg-muted-foreground hover:text-background"
            >
              {store.name}
            </a>
          ))}
        </div>
      </section>
      {/* ABOUT SECTION */}
      <section className="container mx-auto max-w-5xl space-y-6 border-y-2 border-y-muted px-4 py-16 text-muted-foreground xl:px-0">
        <div>
          <h3 className="mb-2 text-2xl font-bold text-foreground">About this site</h3>
          <div className="space-y-6">
            <p>
              Next Level Loot is primarily a portfolio piece to showcase my skills as a web
              developer, and as a way for me to learn how to build a site using{" "}
              <ExtLink href="https://nextjs.org/">Next.js</ExtLink> and{" "}
              <ExtLink href="https://shadcn.dev/">shadcn/ui</ExtLink> components. It is also a
              continuation of a previous project, called{" "}
              <ExtLink href="https://torvec.github.io/Loot-Vault/">Loot Vault</ExtLink>{" "}
              <ExtLink href="https://github.com/Torvec/Loot-Vault">(Repo)</ExtLink>, I worked on as
              part of my first group project in a{" "}
              <ExtLink href="https://extension.berkeley.edu/">UC Berkeley coding bootcamp</ExtLink>{" "}
              in 2023. Like Loot Vault, Next Level Loot is a site that aggregates game data from
              multiple APIs and allows gamers to find deals, giveaways, and information about games.
            </p>
            <p>
              The site was built using <ExtLink href="https://nextjs.org/">Next.js 15</ExtLink>,{" "}
              <ExtLink href="https://reactjs.org/">React 19</ExtLink>,{" "}
              <ExtLink href="https://tailwindcss.com/">Tailwind CSS</ExtLink>,{" "}
              <ExtLink href="https://www.typescriptlang.org/">TypeScript</ExtLink>, and{" "}
              <ExtLink href="https://shadcn.dev/">shadcn/ui</ExtLink> components. All API
              development and testing was done using{" "}
              <ExtLink href="https://usebruno.com/">Bruno</ExtLink> and all data was fetched from
              the following APIs: <ExtLink href="https://www.cheapshark.com/">CheapShark</ExtLink>,{" "}
              <ExtLink href="https://www.gamerpower.com/">GamerPower</ExtLink>, and{" "}
              <ExtLink href="https://rawg.io/">RAWG</ExtLink>. Deployment is handled by{" "}
              <ExtLink href="https://vercel.com/">Vercel</ExtLink>.
            </p>
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-foreground">About the developer</h4>
          <p>
            Hello, my name is Edward Vonschondorf, and I am a freelance full stack developer located
            in the San Francisco Bay Area. I enjoy making full stack apps as well as games. Check
            out <ExtLink href="https://edward-vonschondorf.dev/">my website</ExtLink> for more
            projects by me!
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-foreground">Future Development</h4>
          <p>
            Updates/Improvments and bug fixes will continue on a regular basis for the foreseeable
            future as it has been a great experience for me to have a fully-featured site, excluding
            database usage, for me to implement various design and development patterns. Check out{" "}
            <ExtLink href="https://github.com/Torvec/loot_vault_next">the repository</ExtLink> for
            the latest issues and details on what is being worked on currently.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-foreground">Disclaimer</h4>
          <p className="text-sm">
            The information displayed on this site is obtained from third-party APIs, and I do not
            own or operate any of these APIs. Therefore, I cannot guarantee the accuracy,
            completeness, or reliability of the data provided. Additionally, I do not own any
            trademarks or copyrights for the games or other content displayed on this site. All
            trademarks and copyrights are the property of their respective owners.
          </p>
        </div>
      </section>
    </div>
  );
}

const CategorySection = ({
  sectionTitle,
  apiLink,
  data,
  path,
  buttonText,
}: CategorySectionProps) => {
  return (
    <section className="col-span-6 flex flex-col justify-between space-y-2 rounded-xl border-2 p-2 md:col-span-3 md:space-y-6 md:last:col-span-4 md:last:col-start-2 lg:col-span-2 lg:p-4 lg:last:col-span-2 lg:last:col-start-5 xl:p-6">
      {/* COLUMN HEADER */}
      <div>
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <h3 className="text-center text-xl font-bold lg:text-left">{sectionTitle}</h3>
          <a
            href={apiLink.href}
            target="_blank"
            rel="noopener noreferrer external"
            className="px-2 py-1 text-sm text-highlight hover:text-foreground hover:underline"
          >
            {apiLink.name}
          </a>
        </div>
        {/* GAMES LIST */}
        <div>
          {data.map((item) => (
            <Link
              href={`${path}/${item.id}`}
              prefetch={true}
              key={item.id}
              className="grid grid-cols-6 items-center gap-2 p-2 hover:bg-muted md:gap-4"
            >
              <div className="col-span-5 grid grid-cols-6 items-center gap-2">
                <div className="col-span-2">
                  <BannerSection src={item.image} alt={item.name} height="h-24" />
                </div>
                <span className="col-span-4 block text-sm">{item.name}</span>
              </div>

              {item.rating && (
                <div className="text-center">
                  <span className="block text-xs text-muted-foreground">Score</span>
                  <span className="block text-lg font-bold">{item.rating}%</span>
                </div>
              )}

              {item.worth && (
                <div className="text-center">
                  <span className="block text-xs text-muted-foreground line-through">
                    {item.worth}
                  </span>
                  <span className="block">Free</span>
                </div>
              )}

              {item.salePrice && (
                <div className="text-center">
                  <span className="block text-xs text-muted-foreground line-through">
                    ${item.normalPrice}
                  </span>
                  <span className="block">${item.salePrice}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      {/* MORE BUTTON */}
      <Button asChild className="w-full bg-highlight">
        <Link href={path} className="group">
          {buttonText}
          <ChevronRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
        </Link>
      </Button>
    </section>
  );
};

const CategorySectionSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 }).map((_, index) => <SkeletonCards key={index} />);

  return (
    <div className="col-span-6 space-y-2 rounded-xl border p-2 md:col-span-3 md:space-y-6 md:last:col-span-4 md:last:col-start-2 lg:col-span-2 lg:p-4 lg:last:col-span-2 lg:last:col-start-5 xl:p-6">
      <div className="flex flex-col items-center justify-between md:flex-row">
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
    <div className="grid grid-cols-6 items-center gap-2 p-2 md:gap-4">
      <div className="col-span-5 grid grid-cols-6 items-center gap-2">
        <div className="col-span-2">
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="col-span-2 h-5" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4" />
        <Skeleton className="h-7" />
      </div>
    </div>
  );
};
