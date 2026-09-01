const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, link) => {
  console.log("📨 Sending email to:", to);

  try {
    const { data, error } = await resend.emails.send({
      from: "Code Arena <onboarding@resend.dev>",
      to: [to],
      subject: "You're invited 🚀",

      html: `
        <h2>Join the coding room</h2>

        <p>You have been invited to join a coding room.</p>

        <p>
          <a href="${link}">
            Accept Invite
          </a>
        </p>

        <p>${link}</p>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully");
    console.log("Email ID:", data.id);

    return data;

  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;