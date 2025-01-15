import dotenv from "dotenv";
dotenv.config({ path: './.env.development' });

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const FOLDER_TO_UPLOAD = process.env.FOLDER_TO_UPLOAD