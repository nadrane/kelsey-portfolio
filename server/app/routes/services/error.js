const router = (module.exports = require("express").Router());
const { logError } = require("../../../loggers");

router.post("/", (req, res, next) => {
  logError({ type: "client error", message: req.body })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});
