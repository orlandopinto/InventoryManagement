import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config.js'

const options = { folder: 'ProductImages' }

if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET)
     console.error("Environment variables not set");

cloudinary.config({
     cloud_name: CLOUDINARY_NAME,
     api_key: CLOUDINARY_API_KEY,
     api_secret: CLOUDINARY_API_SECRET
});

if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret)
     console.error("Cloudinary config not set up");

// const cloudName = cloudinary.config().cloud_name;
// const apiKey = cloudinary.config().api_key;
// const api_secret = cloudinary.config().api_secret;
// console.log({ cloudName, apiKey, api_secret })

export async function uploadProductImage(filePath) {
     try {
          return await cloudinary.uploader.upload(filePath, options)
     } catch (error) {
          console.log('error:', error)
     }
}