import BannerSection from "@/components/ui/banner-section";
import WishlistButton from "@/components/ui/buttons/wishlist-button";
import RedirectButton from "@/components/ui/buttons/redirect-button";
import { GiveawaysDetailsType } from "@/lib/types";

export default function GiveawaysDetails(data: GiveawaysDetailsType) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Header
        title={data.title}
        src={data.image}
        type={data.type}
        platforms={data.platforms}
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <MainColumn
          src={data.image}
          title={data.title}
          id={data.id}
          url={data.open_giveaway_url}
          worth={data.worth}
          description={data.description}
          instructions={data.instructions}
        />
        <SideBar startDate={data.published_date} endDate={data.end_date} />
      </div>
    </div>
  );
}

const Header = ({
  title,
  src,
  type,
  platforms,
}: {
  title: string;
  src: string;
  type: string;
  platforms: string;
}) => {
  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
      <BannerSection src={src} alt={title} />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex flex-col text-sm text-muted-foreground md:flex-row md:justify-between">
          <span className="block">Type: {type}</span>
          <span className="block">Platforms: {platforms}</span>
        </div>
      </div>
    </div>
  );
};

const MainColumn = ({
  src,
  title,
  id,
  url,
  worth,
  description,
  instructions,
}: {
  src: string;
  title: string;
  id: number;
  url: string;
  worth: string;
  description: string;
  instructions: string;
}) => {
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
      <PriceSection worth={worth} />
      <div className="flex flex-col gap-4 md:flex-row">
        <RedirectButton url={url} text={"Get Deal"} />
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

const PriceSection = ({ worth }: { worth: string }) => {
  return (
    <div className="mx-auto w-max space-y-4 text-center text-base">
      <div className="flex gap-4">
        <span className="rounded-xl border-4 border-highlight p-4 text-2xl font-black text-highlight">
          -100%
        </span>
        <div className="flex flex-col justify-between">
          <span className="text-muted-foreground line-through">{worth}</span>
          <span className="text-2xl font-bold">Free!</span>
        </div>
      </div>
    </div>
  );
};

const SideBar = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return (
    <aside className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
      <ul>
        <li>Started: {startDate}</li>
        <li>Ends: {endDate}</li>
      </ul>
      <div className="sm:text-right"></div>
    </aside>
  );
};
