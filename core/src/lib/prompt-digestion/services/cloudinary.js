// const path = require("path");
const cloudinary = require("cloudinary").v2;
const debugMe = require("../utils/debug-me");

// const contentFolder = path.join(__dirname, "../../../../../content");
// const integrations = require(contentFolder + "/settings/integrations.json");
// const env = path.join(__dirname, "../../../../.env");
// require("dotenv").config({
//   path: env,
// });
// Configuração do Cloudinary

/**
 * Uploads a list of image URLs to Cloudinary and returns the URLs of the images stored on Cloudinary.
 *
 * @param {Array} gptImgsUrl - Array of URLs for the images generated by GPT.
 * @param {boolean} debug - Indicates if debug mode is enabled for logging additional information.
 * @returns {Array} Array of URLs for the images stored on Cloudinary.
 */
async function uploadCloudinary(
  gptImgsUrl,
  folderName,
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinarySecret,
  debug
) {
  let cloudinaryImgsUrl = [];
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinarySecret,
  });
  // Iiterate over the image URLs, ensuring each upload is processed correctly
  for (let [index, element] of gptImgsUrl.entries()) {
    try {
      // Upload the image to Cloudinary "subfolder/image.ext"
      const cloudinaryResponse = await cloudinary.uploader.upload(element, {
        folder: `${folderName || "boilerplate-times"}/ai`, // Sets the destination folder in Cloudinary
      });

      debugMe(
        debug,
        "Cloudinary Upload Succeed",
        cloudinaryResponse.secure_url
      );

      // Store the image URL in the array, differentiating between the main image and heading images
      if (index === 0) {
        cloudinaryImgsUrl.push({
          mainImg: cloudinaryResponse.secure_url,
        });
      } else {
        cloudinaryImgsUrl.push({
          headingsImgs: cloudinaryResponse.secure_url,
        });
      }
    } catch (error) {
      console.log("Cloudinary Upload Fail:", error);
    }
  }

  debugMe(debug, "Cloudinary Images URL", cloudinaryImgsUrl);

  // Return the URLs of the images stored on Cloudinary
  return cloudinaryImgsUrl;
}

module.exports = uploadCloudinary;
