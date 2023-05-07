const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { randomString } = require("../../utils");
require("dotenv").config;

const extGenerator = (mimetype) => {
	const mime = ["image/jpeg", "image/png", "image/webp"];
	const exts = ["jpg", "png", "webp"];
	return exts[mime.indexOf(mimetype)];
};

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET

});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (req, file) => {
		const ext = extGenerator(file.mimetype);
		const randString = await randomString(20);
		return {
			folder: "public",
			format: ext,
			public_id: randString,
		};
	},
});

module.exports = storage;
