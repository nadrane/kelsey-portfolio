const router = (module.exports = require("express").Router());

router.use("/auth", require("./auth"));
router.use("/email", require("./email"));
router.use("/error", require("./error"));
