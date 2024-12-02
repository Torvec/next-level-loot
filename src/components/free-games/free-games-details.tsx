import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { FreeGameDetailsType } from "@/lib/types";

export default function FreeGamesDetails(data: FreeGameDetailsType) {
  const DescriptionSection = () => (
    <>
      <div>
        <p>Type: {data.type}</p>
        <p>Platforms: {data.platforms}</p>
      </div>
      <div className="sm:text-right">
        <p>Started: {data.published_date}</p>
        <p>Ends: {data.end_date}</p>
      </div>
    </>
  );

  const TextSection = ({ title, text }: { title: string; text: string }) => (
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm">{text}</p>
    </div>
  );

  const PriceSection = () => {
    return (
      <div className="mx-auto w-max space-y-4 text-center text-base">
        <div className="flex gap-4">
          <span className="rounded-xl border-4 border-gold-foreground p-4 text-2xl font-black text-gold-foreground">
            -100%
          </span>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground line-through">
              {data.worth}
            </span>
            <span className="text-2xl font-bold">Free!</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="mx-auto flex max-w-4xl flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle>
          <h2>{data.title}</h2>
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-2 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextSection title="Description" text={data.description} />
        <TextSection title="Instructions" text={data.instructions} />
        <PriceSection />
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <RedirectButton url={data.open_giveaway_url} text={"Get Giveaway"} />
          <WishlistButton title={data.title} />
        </div>
      </CardFooter>
    </Card>
  );
}
