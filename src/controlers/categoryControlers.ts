import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { categoryModel } from "../models/categorySchema";
import { subcategoryModel } from "./../models/categorySchema";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  if (!name) {
    return next(createError(400, "category name is required"));
  }
  try {
    const existCategory = await categoryModel.findOne({ name });
    if (existCategory) {
      return next(createError(400, "Category already exist"));
    }
    const category = await categoryModel.create({
      name,
      slug: name,
    });
    res.status(201).json({
      success: true,
      status: 201,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryModel.find().populate("subcategory");
    res.status(200).json({
      success: true,
      status: 200,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

//subcategory controlers
export const createSubcategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    if (!name) {
      return next(createError(400, "subcategory name is required"));
    }
    const existSubcategory = await subcategoryModel.findOne({ name });
    if (existSubcategory) {
      return next(createError(400, "Subcategory already exist"));
    }

    const subcategory = await subcategoryModel.create({
      category: id,
      name: name,
      slug: name,
    });
    await categoryModel.findByIdAndUpdate(id, {
      $push: { subcategory: subcategory._id },
    });
    res.status(201).json({
      success: true,
      status: 201,
      data: subcategory,
    });
  } catch (error) {
    next(error);
  }
};
export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const SubCategories = await subcategoryModel.find();
    res.status(200).json({
      success: true,
      status: 200,
      data: SubCategories,
    });
  } catch (error) {
    next(error);
  }
};
