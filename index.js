const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'sgautier.dev@gmail.com',
pass: '<YOUR_GMAIL_PASSWORD>'
}
});

app.post('/sendemail', (req, res) => {
const { name, email, message } = req.body;
const mailOptions = {
from: 'sgautier.dev@gmail.com',
to: email,
subject: 'New message from your portfolio website',
text: Name: ${name}\nEmail: ${email}\nMessage: ${message}
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(200).json({ message: 'Email sent successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
