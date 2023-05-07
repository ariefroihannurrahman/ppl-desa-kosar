const { body, query } = require("express-validator");

exports.basicCreds = [
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
	body("password")
		.isStrongPassword({ minNumbers: 1 })
		.withMessage("Password must contain at least 1 number")
		.isStrongPassword({ minLength: 8 })
		.withMessage("Password must 8 character or more")
		.isStrongPassword({ minLowercase: 1 })
		.withMessage("Password must contain at least 1 lowercase")
		.isStrongPassword({ minUppercase: 1 })
		.withMessage("Password must contain at least 1 uppercase")
		.isStrongPassword({ minSymbols: 1 })
		.withMessage("Password must contain at least 1 symbol")
];

exports.passwordOnlyCreds = [
	body("password")
		.isStrongPassword({ minNumbers: 1 })
		.withMessage("Password must contain at least 1 number")
		.isStrongPassword({ minLength: 8 })
		.withMessage("Password must 8 character or more")
		.isStrongPassword({ minLowercase: 1 })
		.withMessage("Password must contain at least 1 lowercase")
		.isStrongPassword({ minUppercase: 1 })
		.withMessage("Password must contain at least 1 uppercase")
		.isStrongPassword({ minSymbols: 1 })
		.withMessage("Password must contain at least 1 symbol")
];

exports.resetPasswordCreds = [
	body("code").notEmpty().withMessage("code is required"),
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
	body("newPassword")
		.isStrongPassword({ minNumbers: 1 })
		.withMessage("Password must contain at least 1 number")
		.isStrongPassword({ minLength: 8 })
		.withMessage("Password must 8 character or more")
		.isStrongPassword({ minLowercase: 1 })
		.withMessage("Password must contain at least 1 lowercase")
		.isStrongPassword({ minUppercase: 1 })
		.withMessage("Password must contain at least 1 uppercase")
		.isStrongPassword({ minSymbols: 1 })
		.withMessage("Password must contain at least 1 symbol"),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.newPassword) {
			throw new Error("confirm password does not match password");
		}
		return true;
	}),
];

exports.emailOnlyCreds = [
	body("email").isEmail().normalizeEmail().withMessage("Email is invalid"),
];

exports.search = [
	(req, res, next) => {
		req.query.searchBy = req.query.searchBy || "email";
		req.query.search = req.query.search || "";
		return next();
	},
	query("searchBy").isIn(["email"]).withMessage("the given sortBy type not available"),
	query("search").optional().trim(),
];
