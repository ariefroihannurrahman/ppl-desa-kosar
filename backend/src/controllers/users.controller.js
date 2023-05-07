const model = require("../models");

exports.create = async (req, res) => {
	try {
		const insert = await model.user.insertUser(req.body);
		const user = insert.rows[0];
		return res.json({
			success: true,
			message: "Create user successfully",
			results: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		req.query.offset = (req.query.page - 1) * req.query.limit;
		const users = await model.user.findAllUsers(req.query);
		const totalRecord = await model.user.selectAll(req.query);
		const pageInfo = {
			page: req.query.page,
			previousPage: (req.query.page > 1 ? req.query.page - 1 : null),
			nextPage: (req.query.page < Math.ceil(totalRecord.rowCount / req.query.limit) ? req.query.page + 1 : null),
			totalPage: Math.ceil(totalRecord.rowCount / req.query.limit),
		};
		return res.json({
			success: true,
			message: "Read all users successfully",
			page: pageInfo,
			results: users.rows,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.delete = async (req, res) => {
	try {
		const user = await model.user.deleteUserById(req.params);
		return res.json({
			success: true,
			message: "delete successfully",
			results: user.rows[0],
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
exports.readById = async (req, res) => {
	try {
		const user = await model.user.findUserById(req.params);
		if (!user.rows[0]) {
			throw new Error("User not found");
		}
		return res.json({
			success: true,
			message: "read user successfully",
			results: user.rows[0],
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.update = async (req, res) => {
	try {
		const { id } = req.params;
		const { email, password } = req.body;
		const user = await model.user.updateUserById(id, email, password);
		return res.json({
			success: true,
			message: "updated user successfully",
			results: user.rows,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

