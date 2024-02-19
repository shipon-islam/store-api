import { Request } from "express";
import { ImagesType } from "../types/productType";
import { productImages } from "./productImages";

export const productFieldChecker = async (req: Request) => {
  const { name, price, description, features, stock, discount, rating } =
    req.body;
  const files = req.files as unknown as ImagesType;
  const updatedProduct = {} as any;
  if (name) updatedProduct.name = name;
  if (price) updatedProduct.price = Number(price);
  if (description) updatedProduct.description = description;
  if (features) updatedProduct.features = features;
  if (stock) updatedProduct.stock = Number(stock);
  if (discount) updatedProduct.discount = Number(discount);
  if (rating) updatedProduct.rating = rating;

  if (Object.entries(files).length > 0) {
    const { images, cover } = await productImages(req);
    updatedProduct.images = images;
    updatedProduct.cover = cover;
  }
  return updatedProduct;
};
