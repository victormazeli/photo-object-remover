const fs = require("fs");
const axios = require("axios");
const path = require("path");
const cloudinary = require('../config/cloudinary');
const mime = require('mime-types')
const photAI = require('../config/photAI')


// Helper function to convert file to base64 with data URL prefix
const convertToDataURL = async (filePath) => {
	const mimeType = mime.lookup(filePath);
	const fileBuffer = fs.readFileSync(filePath);
	const base64Data = fileBuffer.toString('base64');
	return `data:${mimeType};base64,${base64Data}`;
  };


const removeObject = async (req, res, next) => {
  try {
    const sourceFile = req.files['source'][0];
    const objectFile = req.files['object'][0];

       // Upload source image to Cloudinary
	   const uploadResult = await cloudinary.uploader.upload(sourceFile.path);

	   const sourceFileName = path.basename(sourceFile.originalname);
	   const maskImage = await convertToDataURL(objectFile.path);

   
	   const data = {
		 file_name: sourceFileName,
		 input_image_link: uploadResult.secure_url, // Use Cloudinary URL
		 mask_image: maskImage,
	   };

    const response = await axios.post(photAI.phot_ai_api_url, data, {
      headers: {
        'x-api-key': photAI.phot_ai_api_key,
        'Content-Type': 'application/json',
      },
    });

    fs.unlinkSync(sourceFile.path);
    fs.unlinkSync(objectFile.path);

    res.status(200).json(response.data);
  } catch (error) {
	console.log(error)
    next(error);
  }
};

module.exports = {
  removeObject,
};
