const db = require("../helpers/db.helper");
const table = "forgot_passwords";
const defaultReturns = ["*"];

exports.insertForgotPassword = (data, returns) => {
	returns = returns || defaultReturns;
	console.log(returns.join(", "));
	const sql = `INSERT INTO ${table} ("email", "userId", "code") VALUES ($1, $2, $3) RETURNING ${returns.join(", ")}`;
	const params = [data.email, data.userId, data.code];
	return db.query(sql, params);
};

exports.findForgotPassword = (id, returns) => {
	returns = returns || defaultReturns;
	const sql = `SELECT ${returns.join(", ")} FROM ${table} WHERE "userId" = $1 OR "code" = $1`;
	const params = [id];
	return db.query(sql, params);
};

exports.deleteForgotPassword = (id, returns) => {
	returns = returns || defaultReturns;
	const sql = `DELETE FROM ${table} WHERE "userId" = $1 OR "code" = $1 RETURNING ${returns.join(", ")}`;
	const params = [id];
	return db.query(sql, params);
};

exports.updateForgotPassword = (id, data, returns) => {
	returns = returns || defaultReturns;
	const column = Object.keys(data);
	const values = Object.values(data);
	const conditionalQuery = [];

	column.forEach((val, i) => {
		conditionalQuery.push(`"${val}" = $${2 + i}`);
	});
	const sql = `UPDATE ${table} SET ${conditionalQuery.join(", ")}  WHERE "userId" = $1 OR "code" = $1 RETURNING ${returns.join(", ")} `;
	const params = [id, ...values];
	return db.query(sql, params);
};
