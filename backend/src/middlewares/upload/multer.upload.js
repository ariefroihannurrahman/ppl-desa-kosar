const multer = require("multer");
const path = require("path");
const { randomString } = require("../../utils");
// const cloudinaryStorage = require("./cloudinary.upload");

const extGenerator = (mimetype) => {
	const mime = ["image/jpeg", "image/png", "image/webp"];
	const exts = ["jpg", "png", "webp"];
	return exts[mime.indexOf(mimetype)];
};

// eslint-disable-next-line no-unused-vars
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join("var", "task", "assets", "uploads"));
	},
	filename: async (req, file, cb) => {
		const ext = extGenerator(file.mimetype);
		const randString = await randomString(20);
		cb(null, `${randString}.${ext}`);
	}
});

const fileFilter = (req, file, cb) => {
	const ext = extGenerator(file.mimetype);
	if (ext) {
		cb(null, true);
	} else {
		cb("file extension not supported", false);
	}
};

const limits = {
	fileSize: 1 * 1000 * 1000
};

const mult = multer({ storage: storage, fileFilter, limits });

const upload = (field) => {
	const up = mult.single(field);
	return (req, res, next) => {
		up(req, res, (err) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err.message
				});
			}
			next();
		});
	};
};



module.exports = upload;
