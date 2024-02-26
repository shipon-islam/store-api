//this file not use in this project because i can't not use localstorage
import fs from "fs/promises";
import path from "path";
const rootDir = path.resolve(__dirname, "../../public");
export const deleteFileFromLocal = async (folder: string, filename: string) => {
  try {
    await fs.unlink(path.join(rootDir, folder, filename));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
