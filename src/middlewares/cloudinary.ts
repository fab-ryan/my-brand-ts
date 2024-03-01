import cloudinary from "cloudinary";
import {envConfig} from "../config";
const { cloudinary_api_name, cloudinary_api_key, cloudinary_api_secret } =
envConfig;
cloudinary.v2.config({
  cloud_name: cloudinary_api_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
  secure: true,
});

export  {cloudinary};