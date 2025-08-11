// src/utils/cloudinary.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // load .env first

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
//   console.log("In cloudinary: ", localFilePath);
  try {
    if (!localFilePath) return null;

    const absolutePath = path.resolve(localFilePath);
    const response = await cloudinary.uploader.upload(absolutePath, {
        folder: "avatars",
        resource_type: "auto",
    });

    console.log("Cloudinary upload success:", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
