const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// Route to send emails
router.post("/send-email", async (req, res, next) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      // auth: {
      //   user: "amriteshverma921@gmail.com",
      //   pass: "Bakari98!",
      // },
    });
    console.log(transporter);
    const response = await transporter.sendMail({
      from: "amriteshverma129@gmail.com",
      to: "ashishgupta300896@gmail.com",
      subject: "Test Email",
      text: "This is a test email from My Email Service",
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

module.exports = router;
