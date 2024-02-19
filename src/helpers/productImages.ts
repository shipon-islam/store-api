import { Request } from "express";
import { cloudinaryUpload } from "../lib/cloudinary";
import { ImagesType } from "../types/productType";

export const productImages = async (req: Request) => {
  const { cover, feature } = req.files as unknown as ImagesType;
  const imageObj: { images: string[]; cover: string } = {
    images: [],
    cover: "",
  };

  if (cover.length > 0) {
    for (let file of cover) {
      const { secure_url } = await cloudinaryUpload("products", file.path);
      imageObj.images.push(secure_url);
      imageObj.cover = secure_url;
    }
  }
  if (feature.length > 0) {
    for (let file of feature) {
      const { secure_url } = await cloudinaryUpload("products", file.path);
      imageObj.images.push(secure_url);
    }
  }
  return imageObj;
};
