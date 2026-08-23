const nodemailer = require("nodemailer");
const dns = require("dns");
const { promisify } = require("util");

const resolve4 = promisify(dns.resolve4);

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

let transporterPromise = null;

// Resolve smtp.gmail.com to an IPv4 address ourselves and connect directly
// to that IP. This avoids Node/Nodemailer falling back to an IPv6 address
// that Render's network can't route (ENETUNREACH).
async function getTransporter() {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    let host = "smtp.gmail.com";

    try {
      const addresses = await resolve4("smtp.gmail.com");
      if (addresses && addresses.length > 0) {
        host = addresses[0];
        console.log("✅ Resolved smtp.gmail.com to IPv4:", host);
      }
    } catch (err) {
      console.error("⚠️ Could not resolve IPv4 for smtp.gmail.com, falling back to hostname:", err.message);
    }

    const transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      family: 4,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Required when connecting via raw IP so Gmail's certificate
        // still validates against the real hostname.
        servername: "smtp.gmail.com",
      },
    });

    // Verify once when first created
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ SMTP Error:", error);
      } else {
        console.log("✅ SMTP Ready");
      }
    });

    return transporter;
  })();

  return transporterPromise;
}

const sendEmail = async (to, link) => {
  console.log("📨 Sending email to:", to);

  const transporter = await getTransporter();

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