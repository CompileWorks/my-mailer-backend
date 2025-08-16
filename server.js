const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
    console.log("Email send request received:", req.body); // LOGGING

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

app.listen(5000, () => console.log("Service running on port 5000"));
