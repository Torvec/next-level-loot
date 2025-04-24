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
import { type GiveawaysCardProps } from "@/types/giveaways-types";

export default function GiveawaysCard(data: GiveawaysCardProps) {
  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20">
      <CardHeader>
        <BannerSection src={data.image} alt={data.title} />
        <CardTitle>
          <h2 className="text-lg">{data.title}</h2>
        </CardTitle>
        <CardDescription className="space-y-1">
          <p>Type: {data.type}</p>
          <p>Platforms: {data.platforms}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between gap-4 text-center">
          <div className="w-1/2 rounded-xl border border-muted p-2">
            <span className="block text-sm text-muted-foreground">
              Started:
            </span>
            <time dateTime={data.published_date}>{data.published_date}</time>
          </div>
          <div className="w-1/2 rounded-xl border border-muted p-2">
            <span className="block text-sm text-muted-foreground">Ends:</span>
            <time dateTime={data.end_date}>{data.end_date}</time>
          </div>
        </div>
        <div className="mx-auto w-max">
          <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
            <span className="font rounded-xl text-2xl text-highlight">
              -100%
            </span>
            <div>
              <span className="block text-muted-foreground line-through">
                {data.worth}
              </span>
              <span className="block">Free!</span>
            </div>
          </div>
        </div>
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
              type: data.type,
              src: data.image,
              path: "/giveaways/",
              price: "Free",
              timestamp: Date.now(),
            }}
          />
          <MoreDetailsButton path={"/giveaways/"} id={data.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
