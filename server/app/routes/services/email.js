const router = (module.exports = require("express").Router());
const env = require("../../../../env");
const { logError } = require("./error/loggers");

var mailgun = require("mailgun-js")({
  apiKey: env.MAILGUN_API_KEY,
  domain: env.DOMAIN
});

router.post("/", function(req, res) {
  var data = {
    from: `${req.body.name} ${req.body.email}`,
    to: env.ADMIN_EMAIL,
    subject: "A message from your website! :)",
    text: req.body.message
  };

  res.sendStatus(202);

  mailgun.messages().send(data, function(err) {
    if (err) {
      logError({ type: "email error", message: err });
    }
  });
});
