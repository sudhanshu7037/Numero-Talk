import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Resend } from 'resend';

const JWT_SECRET = process.env.JWT_SECRET || 'aetheria-cosmic-secret-key-999';
const OTP_EXPIRY_MS = 60 * 1000; // 60 seconds

// ── In-Memory OTP Store ──
const otpStore = new Map();

// ── Resend Client ──
const getResend = () => new Resend(process.env.RESEND_API_KEY);

// ── OTP Email HTML Builder ──
const buildOtpEmail = (otp, title, subtitle) => `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8"><title>${title} – NumeroTalk</title></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f7f4fc; margin:0; padding:20px;">
      <div style="max-width:480px; margin:20px auto; background:#fff; border:1px solid #d97706; border-radius:16px; padding:36px; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
        <div style="text-align:center; margin-bottom:28px;">
          <h1 style="font-size:26px; letter-spacing:3px; color:#1e1b4b; margin:0;">NUMERO TALK</h1>
          <p style="font-size:11px; letter-spacing:3px; color:#d97706; text-transform:uppercase; margin:4px 0 0;">${subtitle}</p>
        </div>
        <p style="font-size:15px; color:#374151; line-height:1.6; margin-bottom:24px;">
          ${title === 'Verify Your Email'
            ? "You're just one step away! Use the OTP below to verify your email and complete registration."
            : "We received a request to reset your NumeroTalk password. Use the OTP below to proceed."}
        </p>
        <div style="background:linear-gradient(135deg,#78350f,#d97706); border-radius:14px; padding:24px; text-align:center; margin-bottom:24px;">
          <p style="font-size:13px; color:#fde68a; margin:0 0 8px; letter-spacing:2px; text-transform:uppercase; font-weight:bold;">Your One-Time Password</p>
          <p style="font-size:42px; font-weight:900; color:#ffffff; letter-spacing:10px; margin:0;">${otp}</p>
        </div>
        <p style="font-size:13px; color:#6b7280; text-align:center; margin:0;">
          ⏳ This OTP expires in <strong>60 seconds</strong>. Do not share it with anyone.
        </p>
        <div style="border-top:1px solid #e5e7eb; margin-top:28px; padding-top:16px; text-align:center; font-size:11px; color:#9ca3af;">
          If you didn't request this, please ignore this email.<br>
          <strong style="color:#d97706;">The NumeroTalk Team</strong>
        </div>
      </div>
    </body>
  </html>
`;

// ── Send OTP (Registration) ──
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ error: 'Email already registered.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(`register:${email.toLowerCase()}`, { otp, expiresAt: Date.now() + OTP_EXPIRY_MS });

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: 'NumeroTalk <onboarding@resend.dev>',
      to: email,
      subject: 'Your NumeroTalk Registration OTP',
      html: buildOtpEmail(otp, 'Verify Your Email', 'Email Verification'),
    });

    if (error) throw new Error(error.message);
    res.json({ success: true, message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('OTP email error:', err);
    res.status(500).json({ error: 'Failed to send OTP email. Please try again.' });
  }
};

// ── Verify OTP (Registration) ──
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required.' });

  const key = `register:${email.toLowerCase()}`;
  const record = otpStore.get(key);
  if (!record) return res.status(400).json({ error: 'OTP not found. Please request a new one.' });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }
  if (record.otp !== otp.trim()) return res.status(400).json({ error: 'Incorrect OTP. Please try again.' });

  otpStore.delete(key);
  res.json({ success: true, message: 'OTP verified.' });
};

// ── Send Forgot Password OTP ──
export const sendForgotOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'No account found with this email.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(`forgot:${email.toLowerCase()}`, { otp, expiresAt: Date.now() + OTP_EXPIRY_MS });

    const resend = getResend();
    const { error } = await resend.emails.send({
      from: 'NumeroTalk <onboarding@resend.dev>',
      to: email,
      subject: 'NumeroTalk Password Reset OTP',
      html: buildOtpEmail(otp, 'Reset Your Password', 'Password Reset'),
    });

    if (error) throw new Error(error.message);
    res.json({ success: true, message: 'OTP sent to your registered email.' });
  } catch (err) {
    console.error('Forgot OTP error:', err);
    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
};

// ── Reset Password ──
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).json({ error: 'All fields are required.' });

  const key = `forgot:${email.toLowerCase()}`;
  const record = otpStore.get(key);
  if (!record) return res.status(400).json({ error: 'OTP not found. Please request a new one.' });
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }
  if (record.otp !== otp.trim()) return res.status(400).json({ error: 'Incorrect OTP. Please try again.' });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: hashedPassword }
    );
    otpStore.delete(key);
    res.json({ success: true, message: 'Password reset successfully! You can now login.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password.', details: err.message });
  }
};

// ── Register User ──
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing required fields (name, email, password)" });

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ error: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email: email.toLowerCase(), password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user account.", details: err.message });
  }
};

// ── Login User ──
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Please enter email and password." });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password." });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed.", details: err.message });
  }
};

// ── Get User Profile ──
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user session.", details: err.message });
  }
};
