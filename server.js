import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let transporter;
let isEthereal = false;

// Initialize Nodemailer transporter
async function initTransporter() {
  const isPlaceholder = (val) => {
    return !val || val.includes("your-gmail-address") || val.includes("your-gmail-app-password");
  };

  if (process.env.SMTP_USER && process.env.SMTP_PASS && !isPlaceholder(process.env.SMTP_USER) && !isPlaceholder(process.env.SMTP_PASS)) {
    console.log("Using custom SMTP configuration...");
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587/25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    isEthereal = false;
  } else {
    console.log("No SMTP credentials (or template placeholders detected) in environment variables. Generating Ethereal test account...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      isEthereal = true;
      console.log(`Generated Ethereal Test Account: ${testAccount.user}`);
    } catch (err) {
      console.error("Failed to generate Ethereal account, falling back to local simulation:", err);
    }
  }
}

initTransporter();

// Helper to format DOB beautifully
const formatDOB = (dobStr) => {
  if (!dobStr) return '';
  const date = new Date(dobStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

// POST endpoint to send numerology report email
app.post('/api/send-email', async (req, res) => {
  const { email, fullName, dob, calculations, activeMeaning } = req.body;

  if (!email || !fullName || !calculations) {
    return res.status(400).json({ error: "Missing required fields (email, fullName, calculations)" });
  }

  if (!transporter) {
    return res.status(500).json({ error: "Email transporter is not initialized yet. Try again in a few seconds." });
  }

  const senderName = process.env.SENDER_NAME || 'Numerology';
  const senderEmail = process.env.SENDER_EMAIL || (isEthereal ? transporter.options.auth.user : 'no-reply@aetheria.com');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Cosmic Numerology Analysis</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f4fc; color: #374151; margin: 0; padding: 20px;">
        <div style="max-w: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #d97706; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1e1b4b; font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 0;">AETHERIA</h1>
            <div style="font-size: 10px; letter-spacing: 4px; color: #6d28d9; text-transform: uppercase; margin-top: 5px; font-weight: bold;">Cosmic Numerology Profile</div>
          </div>
          
          <!-- Greeting -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
            Hello <strong style="color: #1e1b4b;">${fullName}</strong>,<br><br>
            The universe has aligned to reveal your custom numerical configurations. Below is your Pythagorean core frequency profile based on your birth name and date of birth:
          </div>

          <!-- Vibrations Table -->
          <table style="width: 100%; margin: 25px 0; border-collapse: collapse;">
            <tr>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.lifePath}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">Life Path</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.destiny}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">Destiny</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.soulUrge}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">Soul Urge</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.personality}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">Personality</div>
                </div>
              </td>
            </tr>
          </table>

          <!-- Analysis Block -->
          ${activeMeaning ? `
          <div style="background-color: #fcfaff; border-left: 4px solid #d97706; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 30px; border-top: 1px solid #f3e8ff; border-right: 1px solid #f3e8ff; border-bottom: 1px solid #f3e8ff;">
            <h3 style="font-size: 16px; font-weight: bold; color: #1e1b4b; margin: 0 0 5px 0;">Current Primary Focus: ${activeMeaning.name || 'Life Path'} (Vibration ${calculations.lifePath})</h3>
            <div style="font-style: italic; color: #6d28d9; font-size: 13px; margin-bottom: 12px;">"${activeMeaning.title || ''}"</div>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0;">${activeMeaning.description || ''}</p>
          </div>
          ` : ''}

          <!-- Closing -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151;">
            Thank you for exploring your cosmic configurations with Aetheria.<br><br>
            Warm vibrations,<br>
            <strong style="color: #6d28d9;">The Aetheria Guild</strong>
          </div>

          <!-- Footer/Meta -->
          <div style="font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; line-height: 1.5;">
            Subject: ${fullName} | Date of Birth: ${formatDOB(dob)}<br>
            Aetheria Esoteric Calculation Engine v1.0.0
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: email,
    subject: `Your Personalized Numerology Analysis - ${fullName}`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent to ${email}] Message ID: ${info.messageId}`);

    let previewUrl = null;
    if (isEthereal) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[Ethereal Preview] URL: ${previewUrl}`);
    }

    res.status(200).json({
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
      isEthereal: isEthereal
    });
  } catch (err) {
    console.error("Error sending email via Nodemailer:", err);
    let userMessage = "Failed to dispatch email";
    if (err.code === 'EAUTH') {
      userMessage = "Invalid SMTP credentials. Please check SMTP_USER and SMTP_PASS in your .env file.";
    }
    res.status(500).json({ error: userMessage, details: err.message });
  }
});

// Serve frontend if built (optional fallback)
app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log(`[Server Ready] Node mailer backend listening on http://localhost:${PORT}`);
});
