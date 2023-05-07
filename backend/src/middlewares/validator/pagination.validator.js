const { query } = require("express-validator");

exports.pagging = [
	(req, res, next) => {
		console.log("pagging middleware");
		req.query.page = req.query.page || 1;
		req.query.limit = req.query.limit || 10;
		req.query.sortBy = req.query.sortBy || "createdAt";
		req.query.reverse = req.query.reverse || "0";
		return next();
	},
	query("page").optional().default(1).toInt(),
	query("limit").optional().default(5).toInt(),
	query("sortBy").isIn(["email", "createdAt", "updatedAt"]).withMessage("the given sortBy type not available"),
	query("reverse").toBoolean()
];
