const router = (module.exports = require("express").Router());

router.use('/api', require("./api"));
router.use('/services', require("./services"));
