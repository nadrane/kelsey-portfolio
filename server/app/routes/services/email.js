const nodemailer = require("nodemailer");
const router = (module.exports = require("express").Router());

const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: "username@example.com",
    pass: "userpass"
  }
});

router.post("/", (req, res, next) => {
  let mailOptions = {
    from: req.body.email,
    to: "kelsey", // TODO secrets file
    subject: req.body.message.slice(0, 50),
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      error.status = 500;
      next(error);
    }
    res.sendStatus(200);
  });
});
