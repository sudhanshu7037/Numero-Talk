import React, { useState, useRef } from 'react';
import { Download, Share2, Mail, ArrowLeft, Check, Copy, Heart, User, Sun, Moon } from 'lucide-react';
import { translations } from '../utils/translations';
import html2pdf from 'html2pdf.js';

function RadialGauge({ value, title, subLabel, vibrationLabel = "Vibration", max = 9 }) {
  const radius = 36;
  const stroke = 5;
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Track Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={stroke}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#goldGradient)"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
        {/* Core Value */}
        <div className="absolute text-center">
          <span className="text-3xl font-serif font-black text-mystic-gold glow-gold">
            {value}
          </span>
          <span className="block text-[8px] text-gray-400 uppercase tracking-widest leading-none">
            {vibrationLabel}
          </span>
        </div>
      </div>
      <h4 className="text-sm font-serif font-semibold text-white mt-2 text-center uppercase tracking-wider">
        {title}
      </h4>
      <span className="text-[10px] text-violet-300 font-sans tracking-wide">
        {subLabel}
      </span>
    </div>
  );
}

export default function ReportDisplay({ reportData, onBack }) {
  const { firstName, middleName, lastName, dob, email, calculations } = reportData;
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('lifePath');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [etherealUrl, setEtherealUrl] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const reportRef = useRef(null);

  // Format DOB beautifully
  const formatDOB = (dobStr) => {
    if (!dobStr) return '';
    const date = new Date(dobStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // keep YYYY-MM-DD literal format
    });
  };

  const currentLabels = translations[language]?.labels || translations.en.labels;
  const currentInterpretations = translations[language]?.interpretations || translations.en.interpretations;
  const activeMeaning = currentInterpretations[activeTab][calculations[activeTab]];

  const handleDownloadPDF = () => {
    setPdfGenerating(true);
    const element = reportRef.current;
    
    const opt = {
      margin:       [12, 12, 12, 12],
      filename:     `${fullName.replace(/\s+/g, '_')}_Numerology_Report.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#070510',
        letterRendering: true,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('numerology-report-root');
          if (el) {
            el.classList.add('pdf-export');
          }
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf
    html2pdf().set(opt).from(element).save().then(() => {
      setPdfGenerating(false);
    }).catch(err => {
      console.error("PDF generation error: ", err);
      setPdfGenerating(false);
    });
  };

  const handleEmailReport = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    setEmailError(null);
    setEtherealUrl(null);

    try {
      const element = reportRef.current;
      const opt = {
        margin:       [12, 12, 12, 12],
        filename:     `${fullName.replace(/\s+/g, '_')}_Numerology_Report.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          backgroundColor: '#070510',
          letterRendering: true,
          onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById('numerology-report-root');
            if (el) {
              el.classList.add('pdf-export');
            }
          }
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Generate client-side PDF as base64 string
      const pdfDataUri = await html2pdf().set(opt).from(element).output('datauristring');
      const base64Pdf = pdfDataUri.split(',')[1];

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName,
          dob,
          calculations,
          activeMeaning,
          pdfAttachment: base64Pdf,
          pdfLanguage: language
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch email');
      }

      setSendingEmail(false);
      setEmailSent(true);
      if (data.isEthereal && data.previewUrl) {
        setEtherealUrl(data.previewUrl);
      }
    } catch (err) {
      console.error("Failed to email report:", err);
      setEmailError(err.message || 'Error occurred while connecting to the email server.');
      setSendingEmail(false);
    }
  };

  const handleCopyLink = () => {
    const dummyUrl = `${window.location.origin}/report?name=${encodeURIComponent(fullName)}&dob=${dob}`;
    navigator.clipboard.writeText(dummyUrl).then(() => {
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    });
  };

  const tabsConfig = [
    { id: 'lifePath', label: currentLabels.lifePath, val: calculations.lifePath, sub: 'Birth Date Frequency', icon: Sun },
    { id: 'destiny', label: currentLabels.destiny, val: calculations.destiny, sub: 'Full Name Vibration', icon: Moon },
    { id: 'soulUrge', label: currentLabels.soulUrge, val: calculations.soulUrge, sub: 'Inner Desires', icon: Heart },
    { id: 'personality', label: currentLabels.personality, val: calculations.personality, sub: 'Outer Self', icon: User },
  ];


  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Action panel (buttons to print, email, share) - hidden in PDF print */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 glass-panel rounded-2xl border border-white/5 shadow-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Calculator
        </button>

        {/* Global Language Selector */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <span className="text-xs text-violet-300 font-medium font-sans">Language:</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#0f0a1e] text-xs text-white border-none rounded focus:ring-1 focus:ring-mystic-gold cursor-pointer py-1 px-2 font-sans focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Email button */}
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer"
          >
            <Mail className="h-4 w-4 text-violet-300" />
            Email Report
          </button>

          {/* Share button */}
          <div className="relative">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-200 hover:bg-white/10 transition-all cursor-pointer"
            >
              <Share2 className="h-4 w-4 text-cyan-300" />
              {showShareTooltip ? 'Copied!' : 'Share Link'}
            </button>
            {showShareTooltip && (
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-amber-500 text-mystic-dark text-[10px] font-bold px-2 py-1 rounded shadow-md animate-bounce">
                Link Copied!
              </span>
            )}
          </div>

          {/* Save PDF button */}
          <button
            onClick={handleDownloadPDF}
            disabled={pdfGenerating}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light transition-all shadow-md shadow-mystic-gold/15 cursor-pointer disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {pdfGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div 
        ref={reportRef} 
        id="numerology-report-root" 
        className="glass-panel p-4 sm:p-12 rounded-3xl border border-mystic-gold/10 shadow-2xl relative overflow-hidden text-left bg-[#070510]"
      >
        {/* Subtle geometric pattern backdrop inside the report */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,17,58,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Report Header Branding */}
        <div className="border-b border-mystic-gold/15 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-mystic-gold">
              {currentLabels.engine}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-wider mt-1">
              {currentLabels.analysis}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {currentLabels.generatedOn} {new Date().toLocaleDateString(language === 'en' ? 'en-US' : language, { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/5 flex flex-col items-start min-w-[200px] text-xs">
            <span className="text-[10px] uppercase tracking-wider text-violet-300 font-bold mb-1">
              {currentLabels.profile}
            </span>
            <span className="text-white font-semibold truncate max-w-[180px]">{fullName}</span>
            <span className="text-gray-400">{formatDOB(dob)}</span>
            <span className="text-gray-500 font-mono mt-1 text-[10px]">{email}</span>
          </div>
        </div>

        {/* Visual Gauges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-8 border-b border-mystic-gold/10">
          {tabsConfig.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`glass-panel rounded-2xl border transition-all duration-300 cursor-pointer text-center relative p-2 ${
                  activeTab === item.id
                    ? 'border-mystic-gold bg-mystic-purple/40 ring-1 ring-mystic-gold/40 shadow-lg shadow-mystic-gold/5'
                    : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="absolute top-3 left-3">
                  <IconComponent className={`h-4 w-4 ${activeTab === item.id ? 'text-mystic-gold' : 'text-gray-600'}`} />
                </div>
                <RadialGauge
                  value={item.val}
                  title={item.label}
                  subLabel={`${currentLabels.vibration} ${item.val}`}
                  vibrationLabel={currentLabels.vibration}
                  max={item.val > 9 ? 33 : 9}
                />
              </div>
            );
          })}
        </div>

        {/* Selected Parameter Interpretation Card */}
        <div className="pt-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-mystic-gold font-bold">
                {currentLabels.detailedAnalysis}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {tabsConfig.find(t => t.id === activeTab)?.label} {currentLabels.vibration}: {calculations[activeTab]}
              </h3>
            </div>
            <span className="text-xs italic text-violet-300/80 bg-violet-950/40 px-3 py-1.5 rounded-full border border-violet-800/30">
              "{activeMeaning.title}"
            </span>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-mystic-purple/10 space-y-4">
            <p className="text-sm leading-relaxed text-gray-300">
              {activeMeaning.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  {currentLabels.strengths}
                </span>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {activeMeaning.strengths}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block">
                  {currentLabels.challenges}
                </span>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {activeMeaning.challenges}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Signature */}
        <div className="mt-12 flex justify-between items-center text-[10px] text-gray-600 border-t border-white/5 pt-4">
          <span>{currentLabels.version}</span>
          <span>{currentLabels.verifiedMath}</span>
        </div>
      </div>

      {/* Simulated Email Report Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-mystic-gold/20 shadow-2xl relative animate-fade-in-up">
            <div className="text-center mb-6">
              <Mail className="h-10 w-10 text-mystic-gold mx-auto mb-2 glow-gold" />
              <h3 className="font-serif text-xl font-bold text-white">Send Report via Email</h3>
              <p className="text-xs text-gray-400 mt-1">
                Deliver your personalized report directly to your inbox.
              </p>
            </div>

            {emailSent ? (
              <div className="py-8 text-center flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Report Sent!</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    We have dispatched your cosmic report to <strong className="text-gray-200">{email}</strong>.
                  </p>
                </div>
                {etherealUrl && (
                  <div className="pt-2 w-full text-center">
                    <p className="text-[10px] text-amber-400 mb-2 font-mono">
                      [Testing Mode] Ethereal preview is ready:
                    </p>
                    <a
                      href={etherealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-mystic-gold/20 text-mystic-gold border border-mystic-gold/30 hover:bg-mystic-gold/30 transition-all"
                    >
                      View Sent Email
                    </a>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailSent(false);
                    setEtherealUrl(null);
                  }}
                  className="px-5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-gray-300 hover:text-white transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailReport} className="space-y-4">
                {emailError && (
                  <div className="text-xs text-red-400 bg-red-950/40 border border-red-900/30 p-3 rounded-xl leading-relaxed">
                    <strong>Error:</strong> {emailError}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    disabled
                    className="w-full bg-mystic-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 cursor-not-allowed opacity-70"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailError(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingEmail}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {sendingEmail ? 'Dispatching...' : 'Dispatch Email'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
