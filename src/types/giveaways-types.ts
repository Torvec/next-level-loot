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
