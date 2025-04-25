import { CardDescription, CardTitle } from "@/components/ui/card";
import BannerSection from "@/components/ui/banner-section";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import { type GiveawaysCardProps } from "@/types/giveaways-types";

export function GiveawaysCardHeader(data: GiveawaysCardProps) {
  return (
    <>
      <BannerSection src={data.image} alt={data.title} />
      <CardTitle>
        <h2 className="text-lg">{data.title}</h2>
      </CardTitle>
      <CardDescription className="space-y-1">
        <p>Type: {data.type}</p>
        <p>Platforms: {data.platforms}</p>
      </CardDescription>
    </>
  );
}

export function GiveawaysCardContent(data: GiveawaysCardProps) {
  return (
    <>
      <div className="flex justify-between gap-4 text-center">
        <div className="w-1/2 rounded-xl border border-muted p-2">
          <span className="block text-sm text-muted-foreground">Started:</span>
          <time dateTime={data.published_date}>
            {formatDateTime(data.published_date)}
          </time>
        </div>
        <div className="w-1/2 rounded-xl border border-muted p-2">
          <span className="block text-sm text-muted-foreground">Ends:</span>
          <time dateTime={data.end_date}>{formatDateTime(data.end_date)}</time>
        </div>
      </div>
      <div className="mx-auto w-max">
        <div className="flex items-center gap-4 rounded-xl border-2 border-muted px-4 py-2">
          <span className="font rounded-xl text-2xl text-highlight">-100%</span>
          <div>
            <span className="block text-muted-foreground line-through">
              {data.worth}
            </span>
            <span className="block">Free!</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function GiveawaysCardFooter(data: GiveawaysCardProps) {
  return (
    <>
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
    </>
  );
}

// UTILITY FUNCTIONS

const formatDateTime = (dateTime: string | number | Date) => {
  if (dateTime !== "N/A") {
    return new Date(dateTime).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
  }
  return dateTime;
};
