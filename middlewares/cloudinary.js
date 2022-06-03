require("dotenv").config();
const { default: axios } = require("axios");

const upload_Url = process.env.CLOUDINARY_URL;

async function upload(req, res, next) {
  const { mainImage, pictureOne, pictureTwo, pictureThree } = req;

  if (mainImage) {
    const mainImageUrl = await uploadToCloudinary(mainImage);
    req.mainImage = mainImageUrl;
  }
  if (pictureOne) {
    const pictureOneUrl = await uploadToCloudinary(pictureOne);
    req.pictureOne = pictureOneUrl;
  }
  if (pictureTwo) {
    const pictureTwoUrl = await uploadToCloudinary(pictureTwo);
    req.pictureTwo = pictureTwoUrl;
  }
  if (pictureThree) {
    const pictureThreeUrl = await uploadToCloudinary(pictureThree);
    req.pictureThree = pictureThreeUrl;
  }

  next();
}

async function uploadToCloudinary(image) {
  axios
    .post(upload_Url, {
      file: image,
      upload_preset: "iqrukcui",
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
    .then((response) => {
      const imageUrl = response.data.url;
      return imageUrl;
    });
}

module.exports = {
  upload,
};
