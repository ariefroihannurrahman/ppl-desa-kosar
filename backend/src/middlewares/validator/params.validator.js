const { param } = require("express-validator");
exports.isUUID = [
	param("id").isUUID(4).withMessage("invalid params id")
];
