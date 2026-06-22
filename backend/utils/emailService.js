import nodemailer from 'nodemailer';

// ── Create Nodemailer transporter using Gmail App Password ──
const createTransporter = () => {
  return nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(process.env.SMTP_PORT),

    secure: process.env.SMTP_SECURE === 'true',

    auth: {

      user: process.env.SMTP_USER,

      pass: process.env.SMTP_PASS,

    },

    connectionTimeout: 30000,

    greetingTimeout: 30000,

    socketTimeout: 30000,

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