import { ImageUrl } from "./imageUrl.interfaces.js";

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: ImageUrl;
}

export interface CategoriesIdArray {
  arrayIds: string[];
}
