import { Schema, model } from "mongoose";
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    set: (v: string) => v.replace(/ /g, "-"),
  },
  subcategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      unique: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const SubcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    set: (v: string) => v.replace(/ /g, "-"),
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const subcategoryModel = model("Subcategory", SubcategorySchema);
export const categoryModel = model("Category", categorySchema);
