const argon = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();





exports.hash = async (text) => {
	return await argon.hash(text);
};

exports.verify = async (hashed, text) => {
	return await argon.verify(hashed, text);
};

exports.signJWT = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

exports.verifyJWT = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

exports.randomString = async (length, customCharacter) => {
	const { customAlphabet } = await import("nanoid");
	const character = customCharacter ?? "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const nanoId = customAlphabet(character, 10);
	return nanoId(length);
};
