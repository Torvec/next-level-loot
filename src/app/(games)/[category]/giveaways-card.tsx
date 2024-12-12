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
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import {
  type GiveawaysCardProps,
  type GiveawaysCardDescriptionSectionProps,
} from "@/types/giveaways-types";

export default function GiveawaysCard(data: GiveawaysCardProps) {
  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle>
          <h2 className="text-lg">{data.title}</h2>
        </CardTitle>
        <CardDescription>
          <GiveawaysCardDescriptionSection
            type={data.type}
            platforms={data.platforms}
            publishedDate={data.published_date}
            endDate={data.end_date}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GiveawaysCardPriceSection worth={data.worth} />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <RedirectButton
          url={data.open_giveaway_url}
          displayText={"Get Giveaway"}
        />
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <WishlistButton
            item={{
              id: data.id,
              title: data.title,
              src: data.image,
              path: "/giveaways/",
              price: "Free",
            }}
          />
          <MoreDetailsButton path={"/giveaways/"} id={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}

const GiveawaysCardDescriptionSection = ({
  type,
  platforms,
  publishedDate,
  endDate,
}: GiveawaysCardDescriptionSectionProps) => (
  <div className="space-y-1">
    <p>Type: {type}</p>
    <p>Platforms: {platforms}</p>
    <p>Start: {publishedDate}</p>
    <p>End: {endDate}</p>
  </div>
);

const GiveawaysCardPriceSection = ({ worth }: { worth: string }) => {
  return (
    <div>
      <span className="block text-2xl font-bold">Free!</span>
      <span className="block text-muted-foreground line-through">{worth}</span>
    </div>
  );
};
