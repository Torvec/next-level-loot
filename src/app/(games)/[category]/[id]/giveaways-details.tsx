import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { type GiveawaysDetailsProps } from "@/types/giveaways-types";

// Main Component

export default function GiveawaysDetails(data: GiveawaysDetailsProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      {/* HEADER */}
      <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
        <BannerSection src={data.image} alt={data.title} />
        <div>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <div className="text-sm text-muted-foreground">
            <span className="block">Type: {data.type}</span>
            <span className="block">Platforms: {data.platforms}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        {/* MAIN COLUMN */}
        <div className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
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
        </div>
        {/* SIDEBAR COLUMN */}
        <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 text-center md:w-1/3">
          <div className="rounded-xl border border-muted p-2">
            <span className="block text-sm text-muted-foreground">
              Started:
            </span>
            <time dateTime={data.published_date}>{data.published_date}</time>
          </div>
          <div className="rounded-xl border border-muted p-2">
            <span className="block text-sm text-muted-foreground">Ends:</span>
            <span className="block">{data.end_date}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
