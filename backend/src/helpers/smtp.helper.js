const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_APP_PASS,
	},
});

exports.sendEmail = (data) => {
	return transporter.sendMail({
		from: `"Berlian Dev" <${process.env.EMAIL}>`,
		...data
	});
};




