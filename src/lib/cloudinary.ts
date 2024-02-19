import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDNARY_API_KEY,
  CLOUDNARY_CLOUD_NM,
  CLOUDNARY_SECRET,
} from "../secret";

cloudinary.config({
  cloud_name: CLOUDNARY_CLOUD_NM,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_SECRET,
});

export const cloudinaryUpload = async (folder: string, filePath: string) => {
  const newImage = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    folder: `store-api/${folder}/`,
    unique_filename: false,
    use_filename: true,
  });
  return newImage;
};

export const deleteCloudinaryImage = async (publicId: string) => {
  const deletedImage = await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
    resource_type: "image",
  });
  return deletedImage;
};
