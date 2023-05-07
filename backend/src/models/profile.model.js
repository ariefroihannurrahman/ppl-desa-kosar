const db = require("../helpers/db.helper");


const table = "profile";


exports.updatePasswordById = (id, data) => {
	const sql = `UPDATE ${table} SET "password" = $2 WHERE id = $1 RETURNING *`;
	console.log(`update data : ${data.password}`);
	const params = [id, data.password];
	return db.query(sql, params);
};

exports.insertProfile = (data) => {
	const sql = `INSERT INTO ${table} ("fullName", "picture", "birthDate", "userId") VALUES ($1, $2, $3, $4) RETURNING *`;
	const params = [data.fullName, data.picture, data.birthDate, data.userId];
	return db.query(sql, params);
};

exports.findProfileById = (id) => {
	const sql = `SELECT * FROM ${table} WHERE "id" = $1 OR "userId" = $1`;
	const params = [id];
	return db.query(sql, params);
};

exports.findProfileByUserId = (id) => {
	const sql = `SELECT * FROM ${table} WHERE "userId" = $1`;
	const params = [id];
	return db.query(sql, params);
};

exports.updateProfileById = (id, data) => {

	const column = Object.keys(data);
	const values = Object.values(data);
	const conditionalQuery = [];

	column.forEach((val, i) => {
		conditionalQuery.push(`"${val}" = $${2 + i}`);
	});
	const sql = `UPDATE ${table} SET ${conditionalQuery.join(", ")} WHERE "userId" = $1 OR "id" = $1 RETURNING *`;
	const params = [id, ...values];
	return db.query(sql, params);
};

exports.deleteProfileById = (data) => {
	const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
	const params = [data.id];
	return db.query(sql, params);
};
