export interface TypeModelSingle {
  id: number;
  description: string;
}

export interface TypesModelDual {
  id: number;
  descriptionEn: string;
  descriptionPt: string;
}


export interface StatesModel {
  id: number;
  description: string;
  name: string;
}

export interface GameOfferWrapper {
  game: GameModel;
  medias: Array<MediaModel>;
  prices: Array<PriceModel>
}

export interface GameModel{
  id: number;
  name: string;
  releaseDate: string;
  genre: number;
  publisher: number;
  cover: string;
  bestPrice: number;
}

export interface MediaModel{
  id: number;
  game: number;
  isVideo: boolean;
  url: string;
}

export interface PriceModel{
  id: number;
  gamePlatform: number;
  dateTimePublish: string;
  value: number;
}

export interface  OrderModel {
  id?: number;
  idCustomer: number;
  firstName: string;
  lastName: string;
  email: string;
  idTypeStatusOrder: number;
  dateTimeOrder: Date;
  totalValue: number;
  trackingCode: string;
}

export interface  ItemOrderModel {
  id?: number;
  quantity: number;
  gameName: string;
  gameId: number;
  typePlatformId: number;
  gameCover: string;
  unityValue: number;
  subTotal: number;
}

export interface  OrderWrapper {
  medias: OrderModel;
  prices: Array<ItemOrderModel>
}

export interface CartItensModel {
  idPrice: number;
  quantity: number;
}

export interface PricesModel {
  idPrice: number;
  idPlatform: number;
  value: number;
}

export interface DetailCartItensModel {
  gameCover: string;
  gameName: string;
  idPrice: number;
  idPlatform: number;
  quantity: number;
  subTotal: number;
  unityPrice: number;
}

export interface GameSummaryModel {
  id: number;
  name: string;
  cover: string;
}