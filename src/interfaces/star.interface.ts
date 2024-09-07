export interface Star {
  id?: string;
  valoration: number;
  userId: string;
  businessId?: string;
  offerId?: string;
  reviewId: string;
}
export interface StarToUpdate {
  id?: string;
  valoration: number;
}
