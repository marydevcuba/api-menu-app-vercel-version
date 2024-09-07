import { ImageUrl } from "./imageUrl.interfaces.js";

export interface Offer {
  id?: string;
  name: string;
  price: number;
  code?: string;
  description?: string;
  ingredients?: string;
  imageUrl?: ImageUrl[];
  businessId: string;
}

export interface OfferAdd {
  name: string;
  price: number;
  businessId: string;
  code?: string;
}
