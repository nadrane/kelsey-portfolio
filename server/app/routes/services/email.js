const router = (module.exports = require("express").Router());
const env = require("../../../../env");

var mailgun = require("mailgun-js")({
  apiKey: env.MAILGUN_API_KEY,
  domain: env.DOMAIN
});

router.post("/", function(req, res, next) {
  var data = {
    from: req.body.name,
    to: env.ADMIN_EMAIL,
    subject: "A message from your website! :)",
    text: req.body.message
  };

  mailgun.messages().send(data, function(err, body) {
    if (err) next(err);
    console.log(body);
  });
});
