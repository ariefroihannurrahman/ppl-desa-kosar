const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
	connectionString: process.env.DB_URL,
	// ssl: {    /* <----- Add SSL option */
	// 	rejectUnauthorized: false,

	// },
});

module.exports = db;
