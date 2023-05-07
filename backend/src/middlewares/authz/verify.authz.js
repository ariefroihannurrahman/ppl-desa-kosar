
const { verifyJWT } = require("../../utils");

module.exports = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer")) {
			throw new Error("request unauthorized");
		}
		const token = authHeader.slice(7);
		const payload = verifyJWT(token);
		req.user = payload;
		console.log(req.user);
		next();
	} catch (error) {
		res.status(500).json({
			success: false,
			message: `${error.message}`
		});
	}
};
