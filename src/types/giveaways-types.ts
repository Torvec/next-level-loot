export interface GiveawaysCardProps {
  id: number;
  title: string;
  worth: string;
  // thumbnail: string;
  image: string;
  // description: string;
  // instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  // users: number;
  // status: string;
  // gamerpower_url: string;
  // open_giveaway: string;
}

export interface GiveawaysCardDescriptionSectionProps {
  type: string;
  platforms: string;
}

export interface GiveawaysCardDateTimeProps {
  publishedDate: string;
  endDate: string;
}

export interface GiveawaysDetailsProps {
  id: number;
  title: string;
  worth: string;
  // thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  // users: number;
  // status: string;
  // gamerpower_url: string;
}

export interface GiveawaysDetailsHeaderProps {
  title: string;
  src: string;
  type: string;
  platforms: string;
}

export interface GiveawaysDetailsMainColumnProps {
  src: string;
  title: string;
  type: string;
  id: number;
  url: string;
  worth: string;
  description: string;
  instructions: string;
}

export interface GiveawaysDetailsSideBarProps {
  startDate: string;
  endDate: string;
}
