const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    console.log("Email send request received:", req.body);

    // Create SMTP transporter
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,      // e.g. smtp.gmail.com
        port: process.env.SMTP_PORT,      // usually 465 for SSL, 587 for TLS
        secure: process.env.SMTP_PORT == 465, // true for SSL, false for TLS
        auth: {
            user: process.env.SMTP_USER,  // full email address
            pass: process.env.SMTP_PASS   // SMTP password or app password
        }
    });

    try {
        await transporter.sendMail({
            from: `"Mailer" <${process.env.SMTP_USER}>`,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("SMTP Error:", error);
        res.status(500).json({ message: "Failed to send email.", error: error.message });
    }
});

app.listen(5000, () => console.log("Service running on port 5000"));
