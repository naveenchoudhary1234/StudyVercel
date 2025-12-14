const nodemailer = require("nodemailer");
require("dotenv").config();


const mailSender = async (email, title, body) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
      const payload = {
        from: fromEmail,
        to: email,
        subject: title,
        html: body,
      };

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Resend sendMail error:", data);
        // Don't throw for OTP flows; log and continue
        return { error: data };
      }
      console.log("Resend email sent:", data);
      return data;
    }

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
      timeout: 20000,
      connectionTimeout: 10000,
    });

    let info = await transporter.sendMail({
      from: 'StudyNotion || Codewithjaat - by Naveen Choudhary',
      to: email,
      subject: title,
      html: body,
    });

    console.log("SMTP email sent:", info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = mailSender;
