import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Lock, User, Sparkles, Star, BookOpen, TrendingUp, Shield, KeyRound, RefreshCw, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── 60s Countdown Timer ──
function OtpCountdown({ onExpire }) {
  const [seconds, setSeconds] = useState(60);
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
    setSeconds(60);
    const id = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(id);
          if (!expiredRef.current) { expiredRef.current = true; onExpire(); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const pct = (seconds / 60) * 100;
  const color = seconds > 30 ? '#16a34a' : seconds > 10 ? '#d97706' : '#dc2626';
  const circumference = 2 * Math.PI * 26;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}>
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <svg width="72" height="72" style={{ transform: 'rotate(-90deg)', display: 'block' }}>
          <circle cx="36" cy="36" r="26" fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle
            cx="36" cy="36" r="26" fill="none"
            stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{seconds}</span>
        </div>
      </div>
      <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>seconds remaining</p>
    </div>
  );
}

export default function Auth({ onAuthSuccess, onBackToHome }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [registerStep, setRegisterStep] = useState('details'); // 'details' | 'otp'
  const [forgotStep, setForgotStep] = useState('email'); // 'email' | 'otp'
  const [loading, setLoading] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0); // force remount countdown

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const resetAll = () => {
    setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
    setOtp(''); setNewPassword(''); setNewConfirmPassword('');
    setRegisterStep('details'); setForgotStep('email');
    setOtpExpired(false);
  };

  const switchMode = (m) => { resetAll(); setMode(m); };

  const handleOtpExpire = useCallback(() => setOtpExpired(true), []);

  // ── LOGIN ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      toast.success('Welcome back! Signed in successfully 🎉');
      localStorage.setItem('numerotalk_token', data.token);
      localStorage.setItem('numerotalk_user', JSON.stringify(data.user));
      setTimeout(() => onAuthSuccess(data.user, data.token, 'login'), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER: Send OTP ──
  const handleSendRegisterOtp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error('Passwords do not match.'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
      toast.success(`OTP sent to ${email}! Check your inbox 📩`);
      setOtpExpired(false);
      setCountdownKey(k => k + 1);
      setOtp('');
      setRegisterStep('otp');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER: Verify OTP & Complete ──
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpRes = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) throw new Error(otpData.error || 'OTP verification failed.');

      const regRes = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) throw new Error(regData.error || 'Registration failed.');

      toast.success('Account created successfully! Welcome to NumeroTalk 🌟');
      localStorage.setItem('numerotalk_token', regData.token);
      localStorage.setItem('numerotalk_user', JSON.stringify(regData.user));
      setTimeout(() => onAuthSuccess(regData.user, regData.token, 'register'), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── FORGOT: Send OTP ──
  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
      toast.success(`Password reset OTP sent to ${email} 📩`);
      setOtpExpired(false);
      setCountdownKey(k => k + 1);
      setOtp('');
      setForgotStep('otp');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── FORGOT: Reset Password ──
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== newConfirmPassword) { toast.error('Passwords do not match.'); return; }
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed.');
      toast.success('Password reset successfully! You can now login 🔐');
      resetAll();
      setMode('login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Star className="h-5 w-5 text-amber-400" />, title: "Personalized Numerology", desc: "Discover your Life Path, Destiny & Soul numbers with deep insights" },
    { icon: <BookOpen className="h-5 w-5 text-amber-400" />, title: "Detailed Reports", desc: "Get comprehensive PDF reports tailored to your unique vibration" },
    { icon: <TrendingUp className="h-5 w-5 text-amber-400" />, title: "Name Correction", desc: "Align your name's energy with the universe for better outcomes" },
    { icon: <Shield className="h-5 w-5 text-amber-400" />, title: "Saved History", desc: "Access all your past readings anytime, anywhere securely" },
  ];

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500/20 transition-all";
  const labelClass = "block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5";
  const btnPrimary = "w-full py-2.5 rounded-xl font-semibold bg-amber-600 text-white hover:bg-amber-700 active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-50 text-sm flex items-center justify-center gap-2";

  // Heading per mode/step
  const getHeading = () => {
    if (mode === 'login') return { h: 'Welcome Back 👋', s: 'Enter your credentials to access your account' };
    if (mode === 'forgot') {
      if (forgotStep === 'email') return { h: 'Forgot Password 🔑', s: 'Enter your registered email to receive a reset OTP' };
      return { h: 'Reset Password 🔐', s: `OTP sent to ${email}` };
    }
    if (registerStep === 'details') return { h: 'Create Account ✨', s: 'Join NumeroTalk to unlock your cosmic reports' };
    return { h: 'Verify Email 📩', s: `We sent a 6-digit OTP to ${email}` };
  };
  const { h: heading, s: subheading } = getHeading();

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch" style={{ minHeight: '520px' }}>

        {/* ── LEFT BRANDING ── */}
        <div
          className="lg:w-1/2 flex flex-col justify-between p-8 sm:p-10 relative overflow-hidden rounded-2xl shadow-xl"
          style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 40%, #b45309 75%, #d97706 100%)' }}
        >
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-7 w-7 text-amber-300" />
              <span className="text-white font-serif text-2xl font-bold tracking-wide">NumeroTalk</span>
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-serif font-bold leading-snug mb-3">
              Decode Your<br /><span className="text-amber-300">Cosmic Blueprint</span>
            </h2>
            <p className="text-amber-100/80 text-sm leading-relaxed max-w-xs">
              Every number in your life tells a story. Join thousands who've unlocked the ancient wisdom of numerology to live with purpose and clarity.
            </p>
          </div>

          <div className="relative z-10 mt-8 space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-white/10 shrink-0">{f.icon}</div>
                <div>
                  <p className="text-white text-sm font-semibold">{f.title}</p>
                  <p className="text-amber-100/70 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
            <p className="text-amber-200/70 text-xs italic leading-relaxed">
              "Numbers are the universal language offered by the deity to humans as confirmation of the truth."
            </p>
            <p className="text-amber-300/60 text-xs mt-1 font-medium">— St. Augustine of Hippo</p>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 sm:p-10 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100/60">
          <div className="space-y-5 text-left">

            {/* Heading */}
            <div className="border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-gray-900 tracking-wide">{heading}</h2>
              <p className="text-xs text-gray-500 mt-1">{subheading}</p>
            </div>

            {/* ═══ LOGIN ═══ */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => switchMode('forgot')}
                    className="text-xs text-amber-700 hover:text-amber-900 hover:underline font-semibold cursor-pointer transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  {loading ? 'Signing In...' : 'Login'}
                </button>
              </form>
            )}

            {/* ═══ REGISTER STEP 1 ═══ */}
            {mode === 'register' && registerStep === 'details' && (
              <form onSubmit={handleSendRegisterOtp} className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="password" required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className={inputClass} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  <Mail className="h-4 w-4" />
                  {loading ? 'Sending OTP...' : 'Send OTP to Email'}
                </button>
              </form>
            )}

            {/* ═══ REGISTER STEP 2: OTP ═══ */}
            {mode === 'register' && registerStep === 'otp' && (
              <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <KeyRound className="h-6 w-6 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-amber-800">OTP sent to <strong>{email}</strong></p>
                </div>

                {otpExpired ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-red-700 font-bold">⏰ OTP Expired!</p>
                    <p className="text-xs text-red-500 mt-0.5">Please go back and request a new OTP.</p>
                  </div>
                ) : (
                  <OtpCountdown key={countdownKey} onExpire={handleOtpExpire} />
                )}

                <div>
                  <label className={labelClass}>Enter 6-digit OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" inputMode="numeric" required maxLength={6}
                      value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="_ _ _ _ _ _"
                      className={`${inputClass} text-center text-2xl font-bold tracking-[0.5em]`}
                      autoFocus disabled={otpExpired} />
                  </div>
                </div>

                <button type="submit" disabled={loading || otp.length !== 6 || otpExpired} className={btnPrimary}>
                  {loading ? 'Creating Account...' : 'Verify OTP & Register'}
                </button>

                <button type="button"
                  onClick={() => { setRegisterStep('details'); setOtp(''); setOtpExpired(false); }}
                  className="w-full text-xs text-amber-700 hover:underline font-semibold cursor-pointer flex items-center justify-center gap-1 mt-1">
                  <RefreshCw className="h-3 w-3" /> Change email / Resend OTP
                </button>
              </form>
            )}

            {/* ═══ FORGOT STEP 1: Email ═══ */}
            {mode === 'forgot' && forgotStep === 'email' && (
              <form onSubmit={handleSendForgotOtp} className="space-y-4">
                <div>
                  <label className={labelClass}>Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your registered email" className={inputClass} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  <Mail className="h-4 w-4" />
                  {loading ? 'Sending OTP...' : 'Send Reset OTP'}
                </button>
                <button type="button" onClick={() => switchMode('login')}
                  className="w-full text-xs text-gray-500 hover:text-gray-800 font-semibold cursor-pointer flex items-center justify-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Back to Login
                </button>
              </form>
            )}

            {/* ═══ FORGOT STEP 2: OTP + New Password ═══ */}
            {mode === 'forgot' && forgotStep === 'otp' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <KeyRound className="h-6 w-6 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-amber-800">Reset OTP sent to <strong>{email}</strong></p>
                </div>

                {otpExpired ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-red-700 font-bold">⏰ OTP Expired!</p>
                    <p className="text-xs text-red-500 mt-0.5">Please go back and request a new OTP.</p>
                  </div>
                ) : (
                  <OtpCountdown key={countdownKey} onExpire={handleOtpExpire} />
                )}

                <div>
                  <label className={labelClass}>Enter 6-digit OTP</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" inputMode="numeric" required maxLength={6}
                      value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="_ _ _ _ _ _"
                      className={`${inputClass} text-center text-2xl font-bold tracking-[0.5em]`}
                      autoFocus disabled={otpExpired} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="password" required minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 characters" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="password" required minLength={6} value={newConfirmPassword} onChange={e => setNewConfirmPassword(e.target.value)} placeholder="Re-enter new password" className={inputClass} />
                  </div>
                </div>

                <button type="submit" disabled={loading || otp.length !== 6 || otpExpired} className={btnPrimary}>
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>

                <button type="button"
                  onClick={() => { setForgotStep('email'); setOtp(''); setOtpExpired(false); }}
                  className="w-full text-xs text-amber-700 hover:underline font-semibold cursor-pointer flex items-center justify-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Resend OTP
                </button>
              </form>
            )}

            {/* Footer links */}
            {mode !== 'forgot' && (
              <div className="text-center text-xs text-gray-500 pt-1">
                {mode === 'login' ? (
                  <p>Don't have an account?{' '}
                    <button onClick={() => switchMode('register')} className="text-amber-700 hover:underline font-semibold cursor-pointer ml-1">Sign Up</button>
                  </p>
                ) : (
                  <p>Already have an account?{' '}
                    <button onClick={() => switchMode('login')} className="text-amber-700 hover:underline font-semibold cursor-pointer ml-1">Sign In</button>
                  </p>
                )}
              </div>
            )}

            <div className="text-center">
              <button onClick={onBackToHome} className="text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                ← Back to Home
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
