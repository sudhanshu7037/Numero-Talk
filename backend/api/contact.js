import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields (name, email, subject, message)" });
  }

  const isPlaceholder = (val) => {
    return !val || val.includes("your-gmail-address") || val.includes("your-gmail-app-password");
  };

  let transporter;
  let isEthereal = false;

  // Set up transporter based on credentials
  if (process.env.SMTP_USER && process.env.SMTP_PASS && !isPlaceholder(process.env.SMTP_USER) && !isPlaceholder(process.env.SMTP_PASS)) {
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
    // Generate Ethereal testing account as fallback if variables aren't configured in Vercel
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
    } catch (err) {
      return res.status(500).json({ error: "SMTP credentials not configured, and failed to generate Ethereal fallback.", details: err.message });
    }
  }

  const senderName = process.env.SENDER_NAME || 'Numerology';
  const senderEmail = process.env.SENDER_EMAIL || (isEthereal ? transporter.options.auth.user : 'no-reply@aetheria.com');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Aetheria Guild Confirmation</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f4fc; color: #374151; margin: 0; padding: 20px;">
        <div style="max-w: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #d97706; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1e1b4b; font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 0;">AETHERIA</h1>
            <div style="font-size: 10px; letter-spacing: 4px; color: #6d28d9; text-transform: uppercase; margin-top: 5px; font-weight: bold;">Cosmic Numerology Guild</div>
          </div>
          
          <!-- Greeting -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
            Hello <strong style="color: #1e1b4b;">${name}</strong>,<br><br>
            Thank you for reaching out to the Aetheria Cosmic Guild. We have successfully received your message and our numerologists will align with your vibration shortly.
          </div>

          <!-- Message Details -->
          <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <h4 style="font-size: 14px; font-weight: bold; color: #1e1b4b; margin: 0 0 10px 0; border-bottom: 1px solid #e9d5ff; padding-bottom: 5px;">Your Inquiry Details</h4>
            <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <tr>
                <td style="width: 80px; font-weight: bold; color: #6d28d9; padding: 5px 0;">Subject:</td>
                <td style="color: #374151; padding: 5px 0;">${subject}</td>
              </tr>
              <tr>
                <td style="vertical-align: top; font-weight: bold; color: #6d28d9; padding: 5px 0;">Message:</td>
                <td style="color: #4b5563; padding: 5px 0; line-height: 1.5;">${message}</td>
              </tr>
            </table>
          </div>

          <!-- Closing -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151;">
            If you have any further questions in the meantime, feel free to reply directly to this email.<br><br>
            Warm vibrations,<br>
            <strong style="color: #6d28d9;">The Aetheria Guild</strong>
          </div>

          <!-- Footer -->
          <div style="font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            Aetheria Esoteric Support v1.0.0
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: email,
    subject: `We have received your message: ${subject}`,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    let previewUrl = null;
    if (isEthereal) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    return res.status(200).json({
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
      isEthereal: isEthereal
    });
  } catch (err) {
    let userMessage = "Failed to dispatch email";
    if (err.code === 'EAUTH') {
      userMessage = "Invalid SMTP credentials. Please check your Vercel Environment Variables.";
    }
    return res.status(500).json({ error: userMessage, details: err.message });
  }
}
