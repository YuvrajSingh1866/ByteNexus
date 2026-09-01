const nodemailer = require("nodemailer");

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS =",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    minVersion: "TLSv1.2",
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP VERIFY ERROR:", error);
  } else {
    console.log("✅ SMTP READY:", success);
  }
});

const sendEmail = async (to, link) => {
  console.log("📨 Sending email to:", to);

  try {
   const info = await transporter.sendMail({
  from: {
    name: "Code Arena",
    address: process.env.EMAIL_USER
  },
  to,
  replyTo: process.env.EMAIL_USER,
  subject: "You're invited 🚀",

  html: `
    <h2>Join the coding room</h2>
    <p>You have been invited to join a coding room.</p>

    <p>
      <a href="${link}">Accept Invite</a>
    </p>

    <p>${link}</p>
  `
});

console.log("✅ SMTP accepted the email");
console.log("Message ID:", info.messageId);
console.log("Response:", info.response);
console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Envelope:", info.envelope);
return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;