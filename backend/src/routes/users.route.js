const usersRouter = require("express").Router();

const controller = require("../controllers");
const { users, params, check, pagination } = require("../middlewares/validator");
const { pagging } = pagination;
const { basicCreds, search } = users;
const { isUUID } = params;


usersRouter.get("/", pagging, search, check, controller.user.readAll);
usersRouter.post("/", basicCreds, check, controller.user.create);
usersRouter.get("/:id", isUUID, check, controller.user.readById);
usersRouter.delete("/:id", isUUID, check, controller.user.delete);
usersRouter.put("/:id", isUUID, basicCreds, check, controller.user.update);

module.exports = usersRouter;
