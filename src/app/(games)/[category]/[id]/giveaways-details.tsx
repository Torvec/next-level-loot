import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { type GiveawaysDetailsProps } from "@/types/giveaways-types";

export function GiveawaysDetailsHeader(data: GiveawaysDetailsProps) {
  return (
    <>
      <BannerSection src={data.image} alt={data.title} />
      <div>
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <div className="text-sm text-muted-foreground">
          <span className="block">Type: {data.type}</span>
          <span className="block">Platforms: {data.platforms}</span>
        </div>
      </div>
    </>
  );
}

export function GiveawaysDetailsMainColumn(data: GiveawaysDetailsProps) {
  return (
    <>
      <div>
        <h3 className="font-bold">Description</h3>
        <p className="text-sm leading-loose text-muted-foreground">
          {data.description}
        </p>
      </div>
      <div>
        <h3 className="font-bold">Instructions</h3>
        <p className="text-sm leading-loose text-muted-foreground">
          {data.instructions}
        </p>
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
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton
          url={data.open_giveaway_url}
          displayText={"Get Giveaway"}
        />
        <WishlistButton
          item={{
            id: data.id,
            title: data.title,
            src: data.image,
            path: "/giveaways/",
            type: data.type,
            price: "Free",
            timestamp: Date.now(),
          }}
        />
      </div>
    </>
  );
}

export function GiveawaysDetailsSideBar(data: GiveawaysDetailsProps) {
  return (
    <>
      <div className="rounded-xl border border-muted p-2 text-center">
        <span className="block text-sm text-muted-foreground">Started:</span>
        <time dateTime={data.published_date}>
          {formatDateTime(data.published_date)}
        </time>
      </div>
      <div className="rounded-xl border border-muted p-2 text-center">
        <span className="block text-sm text-muted-foreground">Ends:</span>
        <time dateTime={data.end_date}>{formatDateTime(data.end_date)}</time>
      </div>
    </>
  );
}

// Utility Functions

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
