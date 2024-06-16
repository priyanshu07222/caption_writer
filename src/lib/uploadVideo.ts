import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export const uploadOnCloudinary = async (fileBuffer: Buffer) => {
     return new Promise(async (resolve, reject) => {
      cloudinary.uploader.upload_stream(
       { resource_type: "video" },
       (error, result) => {
         if (error) reject(error.message);
         resolve(result)
        //  console.log(result)
       }).end(fileBuffer);
      })
}