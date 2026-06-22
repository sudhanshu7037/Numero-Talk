import nodemailer from 'nodemailer';

// ── Create Nodemailer transporter using Gmail App Password ──
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// ── Send email helper ──
export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = `"NumeroTalk" <${process.env.EMAIL_USER}>`;

  try {
    const info = await transporter.sendMail({ from, to, subject, html });
    console.log(`[Email Sent] To: ${to} | MsgID: ${info.messageId}`);
    return { success: true };
  } catch (err) {
    console.error('[Email Error]', err.message);
    throw err;
  }
};
