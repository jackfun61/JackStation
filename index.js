const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_PASSWORD
  }
});

// Root route for testing
app.get('/', (req, res) => {
  res.send('JackStation Email Service is running!');
});

// Email verification route
app.post('/send-verification', async (req, res) => {
  const { email, code } = req.body;
  try {
    await transporter.sendMail({
      from: `"JackStation" <${process.env.OUTLOOK_EMAIL}>`,
      to: email,
      subject: "Verify your JackStation account",
      text: `Your verification code is: ${code}`
    });
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.send({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
