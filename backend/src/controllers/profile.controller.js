

const model = require("../models");


exports.getById = async (req, res) => {
	try {
		const result =
			await model.profile.findProfileById(req.params.id || req.user.id);
		if (!result.rows[0]) {
			throw new Error("profile not found");
		}
		const profile = result.rows[0];
		return res.json({
			success: true,
			message: "Get profile successfully",
			result: profile,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.updateById = async (req, res) => {
	try {
		console.log(req.file);
		if (req.file) {
			req.body.picture = req.file.path;
		} else {
			delete req.body["picture"];
		}
		const result =
			await model.profile.updateProfileById(req.params.id || req.user.id, req.body);
		if (!result.rows[0]) {
			throw new Error("profile not found");
		}
		const profile = result.rows[0];
		return res.json({
			success: true,
			message: "Update profile successfully",
			result: profile,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
