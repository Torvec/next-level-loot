import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function BestDeals() {
  interface GameDeal {
    internalName: string;
    title: string;
    metacriticLink: string | null;
    dealID: string;
    storeID: string;
    gameID: string;
    salePrice: string;
    normalPrice: string;
    isOnSale: string;
    savings: string;
    metacriticScore: string;
    steamRatingText: string | null;
    steamRatingPercent: string;
    steamRatingCount: string;
    steamAppID: string | null;
    releaseDate: number;
    lastChange: number;
    dealRating: string;
    thumb: string;
  }

  try {
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const gameDeals: GameDeal[] = data;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Best Deals
        </h1>
        <div className="mb-32 grid grid-cols-4 gap-8">
          {gameDeals.map(
            ({
              // internalName,
              title,
              // metacriticLink,
              dealID,
              // storeID,
              // gameID,
              salePrice,
              normalPrice,
              // isOnSale,
              savings,
              // metacriticScore,
              // steamRatingText,
              // steamRatingPercent,
              // steamRatingCount,
              steamAppID,
              // releaseDate,
              // lastChange,
              dealRating,
              thumb,
            }) => {
              const formattedSavings = parseFloat(savings).toFixed(0);
              const formattedDealRating = parseFloat(dealRating).toFixed(0);
              return (
                <Card key={dealID} className="rounded-xl border-neutral-700">
                  <CardHeader>
                    <CardDescription className="h-24 bg-neutral-900 py-4">
                      <img src={thumb} alt={title} className="mx-auto h-full" />
                    </CardDescription>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Sale Price: {salePrice}</p>
                    <p>Retail Price: {normalPrice}</p>
                    <p>Savings: {formattedSavings}%</p>
                    <p>Deal Rating: {formattedDealRating}</p>
                  </CardContent>
                  <CardFooter>
                    {steamAppID && (
                      <Button className="bg-neutral-500">
                        <a
                          href={`https://store.steampowered.com/app/${steamAppID}`}
                          target="_blank"
                          rel="noopener noreferrer external"
                        >
                          View on Steam
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            },
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
