// Using Brevo HTTP API instead of SMTP (Render free tier blocks all SMTP ports)
export const sendEmail = async ({ to, subject, html }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.SENDER_NAME || 'NumeroTalk';
  const senderEmail = process.env.SENDER_EMAIL || 'tomarsudhanshu7037@gmail.com';

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Brevo API error: ${JSON.stringify(data)}`);
    }

    console.log(`[Email OK] To:${to} MsgID:${data.messageId}`);
    return { success: true };
  } catch (err) {
    console.error(`[Email FAIL] msg=${err.message}`);
    throw err;
  }
};