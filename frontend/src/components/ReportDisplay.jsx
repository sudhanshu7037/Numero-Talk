import React, { useState, useRef } from 'react';
import { Download, Mail, ArrowLeft, Check, Eye, Heart, User, Sun, Moon } from 'lucide-react';
import { translations } from '../utils/translations';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import DetailedReportTemplate from './DetailedReportTemplate';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ReportDisplay({ reportData, onBack }) {
  const { firstName, middleName, lastName, dob, email, calculations } = reportData;
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('lifePath');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [etherealUrl, setEtherealUrl] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const reportRef = useRef(null);
  const detailedReportRef = useRef(null);

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

  // Core function: renders each .pdf-page div individually → avoids browser canvas size limits
  const generatePdfBlob = async () => {
    const sourceElement = detailedReportRef.current;
    if (!sourceElement) throw new Error('Report template not found');

    // Deep-clone the element and mount directly on body so there
    // are no parent overflow/clip constraints.
    const clone = sourceElement.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.cssText = [
      'position: fixed',
      'left: -9999px',  /* Off-screen - user can\'t see it */
      'top: 0',
      'width: 794px',   /* 210mm @ 96 dpi */
      'height: auto',
      'overflow: visible',
      'opacity: 1',
      'z-index: 99999',
      'pointer-events: none',
      'background: white',
    ].join('; ');
    document.body.appendChild(clone);

    // Give the browser time to lay out fonts + Tailwind styles
    await new Promise(r => setTimeout(r, 600));

    try {
      const pages = Array.from(clone.querySelectorAll('.pdf-page'));
      if (!pages.length) throw new Error('No .pdf-page elements found in clone');

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const A4_W = 210;
      const A4_H = 297;

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        // Each page is captured as its own canvas → no combined size limit
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          letterRendering: true,
          logging: false,
          width: 794,
          height: 1123, /* 297mm @ 96 dpi */
          scrollX: 0,
          scrollY: 0,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_W, A4_H);
      }

      document.body.removeChild(clone);
      return pdf;
    } catch (err) {
      if (document.body.contains(clone)) document.body.removeChild(clone);
      throw err;
    }
  };

  const handleDownloadPDF = async () => {
    setPdfGenerating(true);
    try {
      const pdf = await generatePdfBlob();
      pdf.save(`${fullName.replace(/\s+/g, '_')}_Detailed_Numerology_Report.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setPdfGenerating(false);
    }
  };


  const handleEmailReport = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    setEmailError(null);
    setEtherealUrl(null);

    try {
      const pdf = await generatePdfBlob();
      const base64Pdf = pdf.output('datauristring').split(',')[1];

      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (!response.ok) throw new Error(data.error || 'Failed to dispatch email');

      setSendingEmail(false);
      setEmailSent(true);
      if (data.isEthereal && data.previewUrl) setEtherealUrl(data.previewUrl);

    } catch (err) {
      console.error('Failed to email report:', err);
      setEmailError(err.message || 'Error occurred while connecting to the email server.');
      setSendingEmail(false);
    }
  };


  const getModalTitle = () => {
    switch (language) {
      case 'hi': return 'अहवाल पूर्वावलोकन एवं डाउनलोड';
      case 'gu': return 'રિપોર્ટ પૂર્વાવલોકન અને ડાઉનલોડ';
      case 'mr': return 'अहवाल पूर्वावलोकन आणि डाउनलोड';
      default: return 'Report Preview & Download';
    }
  };

  const getCloseText = () => {
    switch (language) {
      case 'hi': return 'पूर्वावलोकन बंद करें';
      case 'gu': return 'પૂર્વાવલોકન બંધ કરો';
      case 'mr': return 'पूर्वावलोकन बंद करा';
      default: return 'Close Preview';
    }
  };

  const getCancelText = () => {
    switch (language) {
      case 'hi': return 'रद्द करें';
      case 'gu': return 'રદ કરો';
      case 'mr': return 'रद्द करा';
      default: return 'Cancel';
    }
  };

  const getDownloadText = () => {
    switch (language) {
      case 'hi': return pdfGenerating ? 'पीडीएफ संकलित किया जा रहा है...' : 'पीडीएफ दस्तावेज़ डाउनलोड करें';
      case 'gu': return pdfGenerating ? 'પીડીએફ સંકલિત થઈ રહી છે...' : 'પીડીએફ દસ્તાવેજ ડાઉનલોડ કરો';
      case 'mr': return pdfGenerating ? 'पीडीएफ संकलित केली जात आहे...' : 'पीडीएफ दस्तऐवज डाउनलोड करा';
      default: return pdfGenerating ? 'Compiling PDF...' : 'Download PDF Document';
    }
  };

  const getPagesInfoText = () => {
    switch (language) {
      case 'hi': return 'वैदिक निर्देशांक ग्रिड • 20 पृष्ठ • A4 पोर्ट्रेट';
      case 'gu': return 'વૈદિક કોઓર્ડિનેટ્સ ગ્રીડ • 20 પૃષ્ઠ • A4 પોટ્રેટ';
      case 'mr': return 'वैदिक निर्देशांक ग्रिड • 20 पाने • A4 पोर्ट्रेट';
      default: return 'Vedic Coordinates Grid • 20 Pages • A4 Portrait';
    }
  };

  const getLoadingTitleText = () => {
    switch (language) {
      case 'hi': return 'पीडीएफ रिपोर्ट तैयार की जा रही है';
      case 'gu': return 'પીડીએફ રિપોર્ટ તૈયાર થઈ રહ્યો છે';
      case 'mr': return 'पीडीएफ अहवाल तयार केला जात आहे';
      default: return 'Generating PDF Report';
    }
  };

  const getLoadingDescText = () => {
    switch (language) {
      case 'hi': return 'उच्च-रिज़ॉल्यूशन वेक्टर टेक्स्ट, कैनवास निर्देशांक और वैदिक चार्ट रेंडर किए जा रहे हैं। इसमें कुछ सेकंड लग सकते हैं...';
      case 'gu': return 'ઉચ્ચ-રિઝોલ્યુશન વેક્ટર ટેક્સ્ટ, કેનવાસ કોઓર્ડિનેટ્સ અને વૈદિક ચાર્ટ રેન્ડર થઈ રહ્યા છે. આમાં થોડી સેકંડ લાગી શકે છે...';
      case 'mr': return 'उच्च-रिझोल्यूशन वेक्टर मजकूर, कॅनव्हास निर्देशांक आणि वैदिक चार्ट रेंडर केले जात आहेत. यात काही सेकंद लागू शकतात...';
      default: return 'Rendering high-resolution vector text, canvas coordinates, and Vedic charts. This may take a few seconds...';
    }
  };

  const tabsConfig = [
    { id: 'lifePath', label: currentLabels.lifePath, val: calculations.lifePath, icon: Sun },
    { id: 'destiny', label: currentLabels.destiny, val: calculations.destiny, icon: Moon },
    { id: 'soulUrge', label: currentLabels.soulUrge, val: calculations.soulUrge, icon: Heart },
    { id: 'personality', label: currentLabels.personality, val: calculations.personality, icon: User },
  ];

    <div className="w-full space-y-4 sm:space-y-8 animate-fade-in">
      {/* Action Panel — stacks on mobile */}
      <div className="no-print flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 py-3 sm:py-4 border-b border-gray-200">
        {/* Row 1 on mobile: Back + Language */}
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">Back to Calculator</span>
            <span className="xs:hidden">Back</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1.5 rounded-xl border border-gray-200">
            <span className="text-[10px] sm:text-xs text-gray-600 font-medium font-sans hidden sm:inline">Language:</span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-xs text-gray-900 border border-gray-300 rounded focus:ring-1 focus:ring-amber-600 cursor-pointer py-1 px-1.5 font-sans focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="gu">ગુજરાતી</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
        </div>

        {/* Row 2 on mobile: Buttons full width */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer"
          >
            <Mail className="h-4 w-4 text-amber-700" />
            Email Report
          </button>

          <button
            onClick={() => setShowPreviewModal(true)}
            disabled={pdfGenerating}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {pdfGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Main Report Document Container (Flat layout, No Card Wrapper) */}
      <div 
        ref={reportRef} 
        id="numerology-report-root" 
        className="w-full relative overflow-hidden text-left py-6"
      >
        {/* Report Header */}
        <div className="border-b border-gray-200 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-amber-700">
              {currentLabels.engine}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wider mt-1">
              {currentLabels.analysis}
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              {currentLabels.generatedOn} {new Date().toLocaleDateString(language === 'en' ? 'en-US' : language, { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex flex-col items-start min-w-[200px] text-xs py-2 border-l border-gray-250 pl-4">
            <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-1">
              {currentLabels.profile}
            </span>
            <span className="text-gray-900 font-semibold truncate max-w-[180px]">{fullName}</span>
            <span className="text-gray-600">{formatDOB(dob)}</span>
            <span className="text-gray-500 font-mono mt-1 text-[10px]">{email}</span>
          </div>
        </div>

        {/* Scrollable Horizontal Tab list — mobile friendly */}
        <div className="flex overflow-x-auto gap-1 sm:gap-3 py-3 sm:py-4 border-b border-gray-200 no-scrollbar">
          {tabsConfig.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 cursor-pointer px-3 py-2 sm:p-3 rounded-xl transition-all shrink-0 ${
                  activeTab === item.id 
                    ? 'bg-amber-50 border border-amber-200 shadow-xs' 
                    : 'hover:bg-gray-100 border border-transparent'
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg ${activeTab === item.id ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="text-left">
                  <span className="text-xl sm:text-2xl font-black text-gray-900 block leading-none mb-0.5">{item.val}</span>
                  <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Interpretation */}
        <div className="pt-6 sm:pt-8 animate-fade-in-up">
          <div className="flex flex-col gap-2 mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                {currentLabels.detailedAnalysis}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                {tabsConfig.find(t => t.id === activeTab)?.label} {currentLabels.vibration}: {calculations[activeTab]}
              </h3>
            </div>
            <span className="text-xs italic text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 self-start">
              "{activeMeaning.title}"
            </span>
          </div>

          <div className="space-y-4 py-4 border-t border-b border-gray-200 w-full">
            <p className="text-sm leading-relaxed text-gray-700">
              {activeMeaning.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 border-t border-gray-200">
              <div className="flex-1 space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  {currentLabels.strengths}
                </span>
                <p className="text-xs text-gray-650 leading-relaxed">
                  {activeMeaning.strengths}
                </p>
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  {currentLabels.challenges}
                </span>
                <p className="text-xs text-gray-655 leading-relaxed">
                  {activeMeaning.challenges}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Signature */}
        <div className="mt-12 flex justify-between items-center text-[10px] text-gray-500 border-t border-gray-200 pt-4 font-mono">
          <span>{currentLabels.version}</span>
          <span>{currentLabels.verifiedMath}</span>
        </div>
      </div>

      {/* Simulated Email Report Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-fade-in">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl border border-gray-250 shadow-2xl relative animate-fade-in-up text-left">
            <div className="text-center mb-6">
              <Mail className="h-10 w-10 text-amber-600 mx-auto mb-2" />
              <h3 className="font-serif text-xl font-bold text-gray-900">Send Report via Email</h3>
              <p className="text-xs text-gray-500 mt-1">
                Deliver your personalized report directly to your inbox.
              </p>
            </div>

            {emailSent ? (
              <div className="py-8 text-center flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-semibold">Report Sent!</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    We have dispatched your cosmic report to <strong className="text-gray-700">{email}</strong>.
                  </p>
                </div>
                {etherealUrl && (
                  <div className="pt-2 w-full text-center">
                    <p className="text-[10px] text-amber-700 mb-2 font-mono">
                      [Testing Mode] Ethereal preview is ready:
                    </p>
                    <a
                      href={etherealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all"
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
                  className="px-5 py-1.5 rounded-xl text-xs font-semibold bg-gray-150 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailReport} className="space-y-4">
                {emailError && (
                  <div className="text-xs text-red-500 bg-red-50 border border-red-200 p-3 rounded-xl leading-relaxed">
                    <strong>Error:</strong> {emailError}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-550 mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed opacity-70"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailError(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-505 hover:text-gray-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingEmail}
                    className="px-6 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {sendingEmail ? 'Dispatching...' : 'Dispatch Email'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Hidden Detailed 20-Page PDF Template */}
      <div 
        ref={detailedReportRef} 
        id="detailed-report-template-root" 
        style={{ 
          position: 'absolute', 
          left: '0', 
          top: '0', 
          width: '210mm', 
          height: '1px', 
          overflow: 'hidden', 
          opacity: 0.02, 
          pointerEvents: 'none', 
          background: 'white' 
        }}
      >
        <DetailedReportTemplate reportData={reportData} language={language} />
      </div>

      {/* Premium Report Preview Modal — full-screen on mobile */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 overflow-hidden animate-fade-in no-print">
          <div className="bg-neutral-900 w-full h-full sm:max-w-5xl sm:h-[82vh] flex flex-col sm:rounded-2xl border-0 sm:border border-neutral-800 shadow-2xl overflow-hidden relative animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-neutral-950 border-b border-neutral-800">
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-lg font-bold text-amber-500 flex items-center gap-2">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 shrink-0" />
                  <span className="truncate">{getModalTitle()}</span>
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-400 font-sans mt-0.5 hidden sm:block">
                  {language === 'en' ? 'Review your detailed 20-page Vedic Numerology analysis.' : 'अपने विस्तृत 20-पृष्ठ वैदिक अंकशास्त्र विश्लेषण की समीक्षा करें।'}
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowPreviewModal(false);
                  setPdfGenerating(false);
                }}
                className="text-neutral-400 hover:text-white hover:bg-neutral-800 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all cursor-pointer font-sans text-xs font-semibold shrink-0 ml-2"
              >
                {getCloseText()}
              </button>
            </div>

            {/* Modal Controls Bar */}
            <div className="flex flex-wrap gap-3 items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="text-[10px] sm:text-xs text-neutral-400 font-sans font-medium">
                {getPagesInfoText()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadPDF()}
                  disabled={pdfGenerating}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {getDownloadText()}
                </button>
              </div>
            </div>

            {/* Scrollable Preview Container */}
            <div 
              id="preview-modal-scroll-area" 
              className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 bg-neutral-950 flex justify-center scroll-smooth"
            >
              <div className="w-full overflow-x-auto py-2 sm:py-4">
                <div 
                  id="preview-report-template-root" 
                  className="preview-mode bg-white text-gray-900 shadow-2xl mx-auto"
                  style={{ width: '210mm', minWidth: '210mm' }}
                >
                  <DetailedReportTemplate reportData={reportData} language={language} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Generation Progress Overlay */}
      {pdfGenerating && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-4 z-[100000] animate-fade-in no-print">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h4 className="font-serif text-lg font-semibold text-amber-500">{getLoadingTitleText()}</h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed font-sans px-4">
              {getLoadingDescText()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
