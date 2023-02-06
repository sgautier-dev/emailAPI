require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json()); //parse incoming data as JSON 

app.use(cors({
    origin: ['http://localhost:4200', 'https://www.sgautier.dev'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_PORT || !process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
    console.error('Missing environment variables. Please check if all required environment variables are set.');
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
    }
});

app.post('/sendEmail', (req, res) => {
    //console.log(req.body)
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        res.status(400).send({ error: "All fields are required" });
        return;
    }
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: 'New message from SGautier portfolio website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: 'Email sent successfully' });
    });

})

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});