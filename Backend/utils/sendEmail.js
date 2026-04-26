const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "work.with.yuvraj.7@gmail.com",   // ✅ YOUR REAL EMAIL
    pass: "ehlgbvqhzrbjgsfm"           // ✅ app password (no spaces is safer)
  }
});

const sendEmail = async (to, link) => {
  await transporter.sendMail({
    from: '"Code Arena" <work.with.yuvraj.7@gmail.com>',
    to,
    subject: "You're invited 🚀",
    html: `
      <h2>Join the coding room</h2>
      <p>Click below:</p>
      <a href="${link}">Accept Invite</a>
    `
  });
};

module.exports = sendEmail;