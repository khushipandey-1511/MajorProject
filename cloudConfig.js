const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_key:process.env.CLOUD_API_KEY,
    cloud_secret:process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderlust_DEV',
      allowedformat: ["png","jpg","jpeg"]
    },
  });

  module.exports={
    cloudinary,
    storage
  }