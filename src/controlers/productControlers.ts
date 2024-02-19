import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { findImageFromURL } from "../helpers/imageURL";
import { productImages } from "../helpers/productImages";
import { productFieldChecker } from "../helpers/productUpdateFieldChecker";
import { deleteCloudinaryImage } from "../lib/cloudinary";
import { productModel } from "../models/productModel";
import { ImagesType } from "../types/productType";
import { queryFields } from "./../helpers/queryFields";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productImagesUrl = await productImages(req);
    const product = await productModel.create({
      ...req.body,
      ...productImagesUrl,
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const files = req.files as unknown as ImagesType;
  try {
    const updatedProducts = await productFieldChecker(req);
    const product = await productModel.findByIdAndUpdate(id, updatedProducts);
    if (product && Object.entries(files).length > 0) {
      for (let image of product.images) {
        const { public_id } = findImageFromURL("products", image);
        await deleteCloudinaryImage(public_id);
      }
    }
    res.status(200).json({
      success: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (deletedProduct) {
      for (let image of deletedProduct.images) {
        const { public_id } = findImageFromURL("products", image);
        await deleteCloudinaryImage(public_id);
      }
    }
    res.status(200).json({
      success: true,
      status: 200,
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const product = await productModel.findById(id);
    res.status(200).json({
      success: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, discount, rate, category, subcategory } =
    queryFields(req);
  const currentPage = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skipPage = (currentPage - 1) * limit;
  const sortOptions: any = {};
  if (req.body?.sortBy) {
    //for sort, url like => api/products?sortBy=price:desc
    const parts = req.body.sortBy.split(":");
    sortOptions[parts[0]] = parts[1] === "desc" ? -1 : 1;
  } else {
    sortOptions.createdAt = -1;
  }
  const multifield = {
    $or: [
      { name: name || "" },
      { price: price || "" },
      { stock: price || "" },
      { discount: discount || "" },
      { rate: rate || "" },
      { category: category || "" },
      { subcategory: subcategory || "" },
    ],
  };
  try {
    const products = await productModel
      .find(queryFields(req))
      .limit(limit)
      .skip(skipPage)
      .sort(sortOptions)
      .populate(["category", "subcategory"]);
    const totalProductlength = await productModel.countDocuments();
    res.status(200).json({
      success: true,
      status: 200,
      data: products,
      pagination: {
        currentPage,
        totalPage: Math.ceil(totalProductlength / limit),
        nextPage:
          currentPage < Math.ceil(totalProductlength / limit)
            ? currentPage + 1
            : currentPage,
        prevPage: currentPage > 1 ? currentPage - 1 : currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const createProductReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;
  const { userId, comment, rate } = req.body;
  const newRate = Number(rate);
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return next(createError("400", "product not found"));
    }
    //calcalute all previous rating
    const prevAllRating = product.reviews.reduce((prevTotal, currentTotal) => {
      return prevTotal + currentTotal.rate;
    }, 0);
    //calcalute new rating
    const totalRating =
      (prevAllRating + newRate) / (product.reviews.length + 1);
    //add new review
    product.reviews.push({ user: userId, comment, rate: newRate });
    //add total rating of product
    product.rating = parseFloat(totalRating.toFixed(1));
    //save in database and send response
    await product.save();
    res.status(200).json({
      success: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
