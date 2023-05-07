const profileRouter = require("express").Router();

const controller = require("../controllers");
const auth = require("../middlewares/authz");
const upload = require("../middlewares/upload/multer.upload");

profileRouter.get("/", auth.verify, controller.profile.getById);
profileRouter.get("/:id", auth.verify, controller.profile.getById);
profileRouter.put("/", auth.verify, upload("picture"), controller.profile.updateById);
profileRouter.put("/:id", auth.verify, upload("picture"), controller.profile.updateById);

module.exports = profileRouter;
