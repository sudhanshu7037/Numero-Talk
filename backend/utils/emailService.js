import nodemailer from 'nodemailer';

const createTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // Brevo uses STARTTLS on port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const senderName = process.env.SENDER_NAME || 'NumeroTalk';
  const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER;
  const from = `"${senderName}" <${senderEmail}>`;
  try {
    const info = await transporter.sendMail({ from, to, subject, html });
    console.log(`[Email OK] To:${to} MsgID:${info.messageId}`);
    return { success: true };
  } catch (err) {
    console.error(`[Email FAIL] code=${err.code} cmd=${err.command} msg=${err.message}`);
    throw err;
  }
};