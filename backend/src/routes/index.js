const routes = require("express").Router();

routes.use("/users", require("../routes/users.route"));
routes.use("/auth", require("../routes/auth.route"));
routes.use("/profile", require("../routes/profile.route"));

module.exports = routes;
