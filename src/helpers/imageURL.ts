import path from "path";

export const findImageFromURL = (folder: string, url: string) => {
  const splitUrl = url.split("/").pop() as string;
  const extname = path.extname(splitUrl);
  const public_id = `store-api/${folder}/${splitUrl?.replace(extname, "")}`;
  return { splitUrl, public_id };
};
