import nodemailer from 'nodemailer';

const createTransporter = () => nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const from = `"NumeroTalk" <${process.env.SMTP_USER}>`;
  try {
    const info = await transporter.sendMail({ from, to, subject, html });
    console.log(`[Email OK] To:${to} MsgID:${info.messageId}`);
    return { success: true };
  } catch (err) {
    console.error(`[Email FAIL] code=${err.code} cmd=${err.command} msg=${err.message}`);
    throw err;
  }
};