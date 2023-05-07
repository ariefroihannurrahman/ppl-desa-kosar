

module.exports = {
	...require("./basic.validator"),
	params: require("./params.validator"),
	users: require("./users.validator"),
	pagination: require("./pagination.validator")
};
