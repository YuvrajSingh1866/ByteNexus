const nodemailer = require("nodemailer");
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection AFTER transporter is created
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP Ready");
  }
});

const sendEmail = async (to, link) => {
  console.log("📨 Sending email to:", to);

  const info = await transporter.sendMail({
    from: `"Code Arena" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You're invited 🚀",
    html: `
      <h2>Join the coding room</h2>
      <p>Click below to accept the invite:</p>
      <a href="${link}">${link}</a>
    `,
  });

  console.log("✅ Email sent!");
  console.log("Message ID:", info.messageId);
};

module.exports = sendEmail;