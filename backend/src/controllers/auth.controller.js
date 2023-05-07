

const model = require("../models");
const { hash, verify, signJWT, randomString } = require("../utils");

const { sendEmail } = require("../helpers/smtp.helper");

const sendResetPassCodeToEmail = (receiver, code) => {
	return sendEmail({
		to: `${receiver}`,
		subject: "btek-backend-reset-password-code", // Subject line
		text: "Berikut adalah code yang bisa anda gunakan untuk melakukan reset password", // plain text body
		html: require("../htmls/verification_code.html").vcTemplate(code), // html body
	});
};

exports.login = async (req, res) => {
	try {
		const result = await model.user.findUserByEmail(req.body);
		if (!result.rows[0]) {
			throw new Error("login failed, email not found");
		}
		const user = result.rows[0];
		if (!await verify(user.password, req.body.password)) {
			throw new Error("login failed, wrong password");
		}
		const token = signJWT({ id: user.id, email: user.email });
		return res.json({
			success: true,
			message: "Logged in successfully",
			result: {
				...user,
				access_token: token
			},
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};


exports.register = async (req, res) => {
	try {
		const find = await model.user.findUserByEmail(req.body);
		if (find.rows[0]) {
			throw new Error("Email already taken");
		}
		req.body.password = await hash(req.body.password);
		const insert = await model.user.insertUser(req.body);
		if (!insert.rows[0]) {
			throw new Error("Failed To Create User");
		}
		await model.profile.insertProfile({ userId: insert.rows[0].id });
		const user = insert.rows[0];
		const token = signJWT({ id: user.id, email: user.email });
		return res.json({
			success: true,
			message: "User registerd successfully, please complete profile",
			result: {
				...user,
				access_token: token
			},

		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {

		const fp = await model.forgot_password.findForgotPassword(req.body.code);
		const forgotPassword = fp.rows[0];
		if (!forgotPassword) {
			throw new Error("invalid reset password code");
		}

		req.body.password = await hash(req.body.newPassword);
		const insert = await model.user.updatePasswordById(forgotPassword.userId, req.body);
		const user = insert.rows[0];
		console.log(insert);
		await model.forgot_password.deleteForgotPassword(req.body.code);

		return res.json({
			success: true,
			message: "password reset successfully",
			result: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.forgotPassword = async (req, res) => {
	try {
		const find = await model.user.findUserByEmail(req.body);
		if (!find.rows[0]) {
			throw new Error("User not found");
		}
		const user = find.rows[0];
		const code = await randomString(6, "123456789");
		const fp = await model.forgot_password.insertForgotPassword({ email: user.email, userId: user.id, code: code }, ["id", "email", "\"userId\""]);
		await sendResetPassCodeToEmail(user.email, code);
		return res.json({
			success: true,
			message: "we have send code to your email, please check your email",
			result: fp.rows[0],
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};

exports.migrateProfile = async (req, res) => {
	try {
		const find = await model.user.selectAllForMigrate();
		for (const row of find.rows) {
			await model.profile.insertProfile({ userId: row.id });
		}
		return res.json({
			success: true,
			message: "created profile successfully, please complete profile",

		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: `Error: ${err.message}`,
		});
	}
};
