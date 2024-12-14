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
  type GiveawaysCardDateTimeProps,
} from "@/types/giveaways-types";

// Main Component

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
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GiveawaysCardDateTime
          publishedDate={data.published_date}
          endDate={data.end_date}
        />
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

// Sub-Components

const GiveawaysCardDescriptionSection = ({
  type,
  platforms,
}: GiveawaysCardDescriptionSectionProps) => (
  <div className="space-y-1">
    <p>Type: {type}</p>
    <p>Platforms: {platforms}</p>
  </div>
);

const GiveawaysCardDateTime = ({
  publishedDate,
  endDate,
}: GiveawaysCardDateTimeProps) => {
  return (
    <div className="flex justify-between gap-4 text-center">
      <div className="w-1/2 rounded-xl border border-muted p-2">
        <span className="block text-sm text-muted-foreground">Started:</span>
        <span className="block">{publishedDate}</span>
      </div>
      <div className="w-1/2 rounded-xl border border-muted p-2">
        <span className="block text-sm text-muted-foreground">Ends:</span>
        <span className="block">{endDate}</span>
      </div>
    </div>
  );
};

const GiveawaysCardPriceSection = ({ worth }: { worth: string }) => {
  return (
    <div className="mx-auto w-max">
      <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
        <span className="font rounded-xl text-2xl text-highlight">-100%</span>
        <div>
          <span className="block text-muted-foreground line-through">
            {worth}
          </span>
          <span className="block">Free!</span>
        </div>
      </div>
    </div>
  );
};
