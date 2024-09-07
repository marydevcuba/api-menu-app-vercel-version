export interface BusinessCategory {
  id: string;
  businessId: string;
  categoryId: string;
}

export interface BusinessCategoryToAdd {
  id?: string;
  businessId: string;
  categoryId: string;
}
