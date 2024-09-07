export interface ImageUrl {
  id: string;
  imageUrl: string;
  public_id: string;
  userId?: string;
  offerId?: string;
  categoryId?: string;
  businessId?: string;
}

export interface ImageToUpload {
  imageUrl: string;
  offerId?: string;
  categoryId?: string;
  businessId?: string;
  userId?: string;
}
