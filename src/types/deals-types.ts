export interface DealsCardProps {
  // internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  // gameID: string;
  salePrice: string;
  normalPrice: string;
  // isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  // lastChange: number;
  dealRating: string;
  thumb: string;
}

export type DealsCardDescriptionSectionProps = {
  releaseDate: number;
  storeID: string;
};

export type DealsCardPriceSectionProps = {
  savings: string;
  dealRating: string;
  normalPrice: string;
  salePrice: string;
};

export interface DealsDetailsProps {
  gameInfo: {
    storeID: string;
    // gameID: string;
    name: string;
    steamAppID: string;
    salePrice: string;
    retailPrice: string;
    steamRatingText: string;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string;
    releaseDate: number;
    // publisher: string;
    // steamworks: string;
    thumb: string;
  };
  cheaperStores: {
    dealID: string;
    storeID: string;
    salePrice: string;
    retailPrice: string;
  }[];
  cheapestPrice: {
    price: string;
    date: number;
  };
}

export type DealsDetailsHeaderProps = {
  title: string;
  src: string;
  released: number;
  storeID: string;
};

export type DealsDetailsMainColumnProps = {
  src: string;
  title: string;
  id: string;
  metacriticLink: string;
  metacriticScore: string;
  steamAppID: string;
  steamRatingPercent: string;
  retailPrice: string;
  salePrice: string;
};

export type DealsDetailsPriceSectionProps = {
  retailPrice: string;
  salePrice: string;
};

export type DealsDetailsSideBarProps = {
  cheaperStores: {
    storeID: string;
    dealID: string;
    retailPrice: string;
    salePrice: string;
  }[];
  salePrice: string;
};
