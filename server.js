const cors = require('cors');
app.use(cors());
app.use(express.json());
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail', // you can change this to SMTP later
        auth: {
            user: 'YOUR_EMAIL@gmail.com',
            pass: 'YOUR_APP_PASSWORD'
        }
    });

    try {
        await transporter.sendMail({
            from: 'YOUR_EMAIL@gmail.com',
            to,
            subject,
            text
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});


app.listen(5000, () => console.log('Server running on port 5000'));
