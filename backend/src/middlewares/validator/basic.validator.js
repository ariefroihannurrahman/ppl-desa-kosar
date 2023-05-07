const { validationResult } = require("express-validator");


exports.check = (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array()
			});
		}
		return next();
	} catch (error) {
		return res.status(400).json({
			success: false,
			errors: error
		});
	}
};


