import nodemailer from 'nodemailer';

// Helper to format DOB
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

  const { email, fullName, dob, calculations, activeMeaning, pdfAttachment, pdfLanguage } = req.body;

  if (!email || !fullName || !calculations) {
    return res.status(400).json({ error: "Missing required fields (email, fullName, calculations)" });
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

  // Translations for the Email Body to match the user's selected language
  const emailTranslations = {
    en: {
      subject: "Your Personalized Numerology Analysis",
      title: "AETHERIA",
      subTitle: "Cosmic Numerology Profile",
      greeting: "Hello",
      intro: "The universe has aligned to reveal your custom numerical configurations. Below is your Pythagorean core frequency profile based on your birth name and date of birth:",
      lifePath: "Life Path",
      destiny: "Destiny",
      soulUrge: "Soul Urge",
      personality: "Personality",
      focus: "Current Primary Focus",
      vibration: "Vibration",
      closing: "Thank you for exploring your cosmic configurations with Aetheria.",
      sign: "Warm vibrations",
      guild: "The Aetheria Guild",
      dobLabel: "Date of Birth",
      engine: "Aetheria Esoteric Calculation Engine v1.0.0"
    },
    hi: {
      subject: "आपका व्यक्तिगत अंकशास्त्र विश्लेषण",
      title: "एथिरिया (AETHERIA)",
      subTitle: "ब्रह्मांडीय अंकशास्त्र विवरण",
      greeting: "नमस्ते",
      intro: "ब्रह्मांड आपके अद्वितीय अंकशास्त्रीय विन्यासों को प्रकट करने के लिए संरेखित हुआ है। नीचे आपके नाम और जन्म तिथि के आधार पर आपका पाइथागोरस कोर फ़्रीक्वेंसी प्रोफ़ाइल दिया गया है:",
      lifePath: "जीवन पथ",
      destiny: "भाग्य",
      soulUrge: "आंतरिक इच्छा",
      personality: "व्यक्तित्व",
      focus: "वर्तमान प्राथमिक ध्यान",
      vibration: "कंपन",
      closing: "एथिरिया के साथ अपने ब्रह्मांडीय विन्यासों की खोज करने के लिए धन्यवाद।",
      sign: "सस्नेह कंपन",
      guild: "एथिरिया गिल्ड",
      dobLabel: "जन्म तिथि",
      engine: "एथिरिया गूढ़ गणना इंजन v1.0.0"
    },
    gu: {
      subject: "તમારું વ્યક્તિગત અંકશાસ્ત્ર વિશ્લેષણ",
      title: "એથિરિયા (AETHERIA)",
      subTitle: "બ્રહ્માંડિય અંકશાસ્ત્ર પ્રોફાઇલ",
      greeting: "નમસ્તે",
      intro: "બ્રહ્માંડ તમારી અનન્ય સંખ્યાત્મક ગોઠવણીઓને પ્રગટ કરવા માટે ગોઠવાયું છે. તમારા જન્મના નામ અને જન્મ તારીખ પર આધારિત તમારી પાયથાગોરિયન મુખ્ય આવર્તન પ્રોફાઇલ નીચે મુજબ છે:",
      lifePath: "જીવન પથ",
      destiny: "ભાગ્ય",
      soulUrge: "આત્માની ઈચ્છા",
      personality: "વ્યક્તિત્વ",
      focus: "વર્તમાન પ્રાથમિક ધ્યાન",
      vibration: "કંપન",
      closing: "એથિરિયા સાથે તમારા બ્રહ્માંડિય વિન્યાસોની શોધ કરવા બદલ આભાર.",
      sign: "સસ્નેહ કંપન",
      guild: "એથિરિયા ગિલ્ડ",
      dobLabel: "જન્મ તારીખ",
      engine: "એથિરિયા ગૂઢ ગણતરી એન્જિન v1.0.0"
    },
    mr: {
      subject: "तुमचे वैयक्तिकृत अंकशास्त्र विश्लेषण",
      title: "एथिरिया (AETHERIA)",
      subTitle: "ब्रह्मांडीय अंकशास्त्र माहिती",
      greeting: "नमस्ते",
      intro: "विश्वाने तुमचे सानुकूल संख्यात्मक कॉन्फिगरेशन प्रकट करण्यासाठी संरेखित केले आहे. तुमच्या नावावर आणि जन्मतारीखेवर आधारित तुमचे पायथागोरियन मूळ वारंवारता प्रोफाइल खाली दिले आहे:",
      lifePath: "जीवन पथ",
      destiny: "भाग्य",
      soulUrge: "आत्म्याची इच्छा",
      personality: "व्यक्तिमत्व",
      focus: "सध्याचे प्राथमिक लक्ष",
      vibration: "कंपन",
      closing: "एथिरियासह आपल्या ब्रह्मांडीय रचनांचा शोध घेतल्याबद्दल धन्यवाद.",
      sign: "सस्नेह कंपन",
      guild: "एथिरिया गिल्ड",
      dobLabel: "जन्मतारीख",
      engine: "एथिरिया गूढ गणना इंजिन v1.0.0"
    }
  };

  const lang = pdfLanguage && emailTranslations[pdfLanguage] ? pdfLanguage : 'en';
  const t = emailTranslations[lang];

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${t.subject}</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f4fc; color: #374151; margin: 0; padding: 20px;">
        <div style="max-w: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #d97706; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #1e1b4b; font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 0;">${t.title}</h1>
            <div style="font-size: 10px; letter-spacing: 4px; color: #6d28d9; text-transform: uppercase; margin-top: 5px; font-weight: bold;">${t.subTitle}</div>
          </div>
          
          <!-- Greeting -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 25px;">
            ${t.greeting} <strong style="color: #1e1b4b;">${fullName}</strong>,<br><br>
            ${t.intro}
          </div>

          <!-- Vibrations Table -->
          <table style="width: 100%; margin: 25px 0; border-collapse: collapse;">
            <tr>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.lifePath}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">${t.lifePath}</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.destiny}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">${t.destiny}</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.soulUrge}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">${t.soulUrge}</div>
                </div>
              </td>
              <td style="width: 25%; padding: 5px;">
                <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 15px 10px; text-align: center;">
                  <div style="font-size: 26px; font-weight: bold; color: #d97706; margin-bottom: 5px;">${calculations.personality}</div>
                  <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; font-weight: bold;">${t.personality}</div>
                </div>
              </td>
            </tr>
          </table>

          <!-- Analysis Block -->
          ${activeMeaning ? `
          <div style="background-color: #fcfaff; border-left: 4px solid #d97706; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 30px; border-top: 1px solid #f3e8ff; border-right: 1px solid #f3e8ff; border-bottom: 1px solid #f3e8ff;">
            <h3 style="font-size: 16px; font-weight: bold; color: #1e1b4b; margin: 0 0 5px 0;">${t.focus}: ${activeMeaning.title || ''} (${t.vibration} ${calculations.lifePath})</h3>
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0 0 10px 0;">${activeMeaning.description || ''}</p>
            ${activeMeaning.strengths ? `<p style="font-size: 13px; line-height: 1.5; color: #047857; margin: 5px 0;"><strong>${t.lifePath === 'जीवन पथ' ? 'सकारात्मक शक्तियाँ' : t.lifePath === 'જીવન પથ' ? 'સકારાત્મક શક્તિઓ' : t.lifePath === 'जीवन पथ' ? 'सकारात्मक बाजू' : 'Strengths'}:</strong> ${activeMeaning.strengths}</p>` : ''}
            ${activeMeaning.challenges ? `<p style="font-size: 13px; line-height: 1.5; color: #b45309; margin: 5px 0;"><strong>${t.lifePath === 'जीवन पथ' ? 'विकास की चुनौतियाँ' : t.lifePath === 'જીવન પથ' ? 'વિકાસના પડકારો' : t.lifePath === 'जीवन पथ' ? 'विकासाची आव्हाने' : 'Challenges'}:</strong> ${activeMeaning.challenges}</p>` : ''}
          </div>
          ` : ''}

          <!-- Closing -->
          <div style="font-size: 15px; line-height: 1.6; color: #374151;">
            ${t.closing}<br><br>
            ${t.sign},<br>
            <strong style="color: #6d28d9;">${t.guild}</strong>
          </div>

          <!-- Footer/Meta -->
          <div style="font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; line-height: 1.5;">
            Subject: ${fullName} | ${t.dobLabel}: ${formatDOB(dob)}<br>
            ${t.engine}
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"${senderName}" <${senderEmail}>`,
    to: email,
    subject: `${t.subject} - ${fullName}`,
    html: htmlContent
  };

  if (pdfAttachment) {
    mailOptions.attachments = [
      {
        filename: `${fullName.replace(/\s+/g, '_')}_Numerology_Report.pdf`,
        content: pdfAttachment,
        encoding: 'base64'
      }
    ];
  }

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
