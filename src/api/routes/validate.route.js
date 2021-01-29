const router = require("express").Router();
const controller = require("../controller/validate.controller");

router.post("/", controller.validateRule);

module.exports = router;
