import nodemailer from 'nodemailer';

// ── Create Nodemailer transporter using Gmail App Password ──
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// ── Send email helper ──
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = `"${process.env.SENDER_NAME || 'NumeroTalk'}" <${process.env.SMTP_USER}>`;

  try {
    const info = await transporter.sendMail({ from, to, subject, html });
    console.log(`[Email Sent] To: ${to} | MsgID: ${info.messageId}`);
    return { success: true };
  } catch (err) {
    console.error('[Email Error]', err.message);
    throw err;
  }
};