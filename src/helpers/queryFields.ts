import { Request } from "express";

export const queryFields = (req: Request) => {
  const {
    priceMin,
    priceMax,
    stock,
    discount,
    rate,
    category,
    subcategory,
    search,
  } = req.query;
  const queryProduct = {} as any;
  if (priceMin && priceMax)
    queryProduct.price = { $gte: Number(priceMin), $lte: Number(priceMax) };
  else if (priceMax) queryProduct.price = { $lte: Number(priceMax) };
  else if (priceMin) queryProduct.price = { $gte: Number(priceMin) };
  if (stock) queryProduct.stock = { $gte: Number(stock) };
  if (discount) queryProduct.discount = Number(discount);
  if (rate) queryProduct.rating.rate = { $gte: Number(rate) };
  if (category) queryProduct.category = category;
  if (subcategory) queryProduct.subcategory = subcategory;
  if (search) queryProduct.name = { $regex: "^" + search, $options: "i" };
  return queryProduct;
};
