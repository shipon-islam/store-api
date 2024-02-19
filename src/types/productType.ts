export interface ProductType {
  name?: string;
  price?: number;
  description?: string;
  features?: string[];
  stock?: number;
  discount?: number;
  cover?: string;
  rating?: {
    rate: number;
    count: number;
  };
  category?: string;
  subcategory?: string;
}
export interface UpdatedProductType extends ProductType {
  images: string[];
}
export interface ImagesType {
  cover: Express.Multer.File[];
  feature: Express.Multer.File[];
}
