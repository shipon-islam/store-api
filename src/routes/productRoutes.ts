import { Router } from "express";
import {
  createCategory,
  createSubcategory,
  getCategories,
  getSubCategories,
} from "../controlers/categoryControlers";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controlers/productControlers";
import { protect } from "../middlewares/authentication";
import { productImageUploader } from "../middlewares/fileUpload";
import {
  checkProductField,
  productValidateHandler,
} from "../middlewares/productValidation";
import {
  checkReviewField,
  reviewValidateHandler,
} from "../middlewares/reviewValidation";
const router = Router();
//product routes
router.post(
  "/product",
  protect,
  productImageUploader,
  checkProductField,
  productValidateHandler,
  createProduct
);
router.put("/products/:id", protect, productImageUploader, updateProduct);
router.delete("/products/:id", protect, deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getAllProduct);

//product rating
router.post(
  "/products/:productId/reviews",
  protect,
  checkReviewField,
  reviewValidateHandler,
  createProductReview
);

//category routes
router.post("/category", protect, createCategory);
router.get("/categories", getCategories);
router.post("/categories/:id/subcategory", protect, createSubcategory);
router.get("/subcategories/", getSubCategories);

export default router;
