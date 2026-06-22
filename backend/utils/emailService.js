import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({

    host: 'smtp.gmail.com',

    port: 465,

    secure: true,

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,

    },

  });
};

export const sendEmail = async ({ to, subject, html }) => {

  const transporter = createTransporter();

  const from = `"NumeroTalk" <${process.env.EMAIL_USER}>`;

  try {

    const info = await transporter.sendMail({

      from,

      to,

      subject,

      html,

    });

    console.log(`[Email Sent] ${info.messageId}`);

    return { success: true };

  } catch (err) {

    console.error('[Email Error]', err);

    throw err;

  }

};