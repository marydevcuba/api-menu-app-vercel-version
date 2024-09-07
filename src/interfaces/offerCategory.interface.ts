import { ImageUrl } from "./imageUrl.interfaces.js";

export interface OfferCategory {
  id: string;
  offerId: string;
  categoryId: string;
}

export interface OfferCategoryToAdd {
  offerId: string;
  categoryId: string;
}
