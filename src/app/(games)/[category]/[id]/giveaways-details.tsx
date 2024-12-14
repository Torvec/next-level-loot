import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import {
  type GiveawaysDetailsProps,
  type GiveawaysDetailsHeaderProps,
  type GiveawaysDetailsMainColumnProps,
  type GiveawaysDetailsSideBarProps,
} from "@/types/giveaways-types";

// Main Component

export default function GiveawaysDetails(data: GiveawaysDetailsProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <GiveawaysDetailsHeader
        title={data.title}
        src={data.image}
        type={data.type}
        platforms={data.platforms}
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <GiveawaysDetailsMainColumn
          src={data.image}
          title={data.title}
          id={data.id}
          url={data.open_giveaway_url}
          worth={data.worth}
          description={data.description}
          instructions={data.instructions}
        />
        <GiveawaysDetailsSideBar
          startDate={data.published_date}
          endDate={data.end_date}
        />
      </div>
    </div>
  );
}

// Sub-Components

const GiveawaysDetailsHeader = ({
  title,
  src,
  type,
  platforms,
}: GiveawaysDetailsHeaderProps) => {
  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
      <BannerSection src={src} alt={title} />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          <span className="block">Type: {type}</span>
          <span className="block">Platforms: {platforms}</span>
        </div>
      </div>
    </div>
  );
};

const GiveawaysDetailsMainColumn = ({
  src,
  title,
  id,
  url,
  worth,
  description,
  instructions,
}: GiveawaysDetailsMainColumnProps) => {
  return (
    <div className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
      <div>
        <h3 className="font-bold">Description</h3>
        <p className="text-sm leading-loose text-muted-foreground">
          {description}
        </p>
      </div>
      <div>
        <h3 className="font-bold">Instructions</h3>
        <p className="text-sm leading-loose text-muted-foreground">
          {instructions}
        </p>
      </div>
      <GiveawaysDetailsPriceSection worth={worth} />
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton url={url} displayText={"Get Giveaway"} />
        <WishlistButton
          item={{
            id: id,
            title: title,
            src: src,
            path: "/giveaways/",
            price: "Free",
          }}
        />
      </div>
    </div>
  );
};

const GiveawaysDetailsPriceSection = ({ worth }: { worth: string }) => {
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

const GiveawaysDetailsSideBar = ({
  startDate,
  endDate,
}: GiveawaysDetailsSideBarProps) => {
  return (
    <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 text-center md:w-1/3">
      <div className="rounded-xl border border-muted p-2">
        <span className="block text-sm text-muted-foreground">Ends:</span>
        <span className="block">{endDate}</span>
      </div>
      <div className="rounded-xl border border-muted p-2">
        <span className="block text-sm text-muted-foreground">Started:</span>
        <span className="block">{startDate}</span>
      </div>
    </aside>
  );
};
