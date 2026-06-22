import React, { useState, useEffect } from 'react';
import { Send, Check, Clock, Phone, MessageCircle, Mail, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export default function Contact() {
  // Dynamic Math Captcha
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(5);
  const [captchaInput, setCaptchaInput] = useState('');
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate random captcha on load or reset
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate captcha
    if (parseInt(captchaInput) !== num1 + num2) {
      setError(`Captcha validation failed. ${num1} + ${num2} is not equal to ${captchaInput || 'empty'}.`);
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: `Vedic Inquiry from ${formState.mobile || 'customer'}`,
          message: formState.message
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch contact query');
      }

      setLoading(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
      generateCaptcha();
    } catch (err) {
      console.error("Failed to submit contact query:", err);
      setError(err.message || "An error occurred while transmitting your query.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full animate-fade-in text-left relative py-8 px-4 sm:px-6 md:px-8">
      
      {/* Background Dotted World Map */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden z-0">
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-full object-contain max-w-5xl text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="3 15">
            {/* North America */}
            <path d="M 100 120 C 130 90, 180 80, 230 100 C 270 120, 310 80, 330 110 C 320 150, 290 190, 260 210 C 230 235, 190 260, 160 280 C 145 260, 130 220, 100 120 Z" />
            {/* South America */}
            <path d="M 240 300 C 270 310, 290 350, 280 400 C 270 440, 240 470, 230 480 C 210 460, 210 410, 220 360 C 230 330, 230 310, 240 300 Z" />
            {/* Greenland */}
            <path d="M 330 70 C 360 50, 390 60, 380 90 C 350 110, 320 100, 330 70 Z" />
            {/* Africa */}
            <path d="M 460 230 C 510 210, 550 230, 560 270 C 570 310, 540 360, 510 400 C 480 420, 470 395, 460 355 C 450 315, 440 275, 460 230 Z" />
            {/* Europe & Asia */}
            <path d="M 460 150 C 510 110, 610 100, 710 90 C 810 80, 910 100, 930 130 C 910 170, 860 200, 810 220 C 760 240, 690 250, 610 250 C 530 240, 490 210, 460 150 Z" />
            {/* Australia */}
            <path d="M 770 340 C 820 330, 850 360, 830 400 C 810 420, 760 410, 760 380 C 760 360, 760 350, 770 340 Z" />
            {/* Additional Islands / Details */}
            <path d="M 660 230 L 670 245 L 680 230 Z" />
            <path d="M 850 150 Q 860 170 870 190" />
            <path d="M 740 270 Q 760 290 780 300" />
          </g>
        </svg>
      </div>

      {/* Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Customer Care */}
          <div className="space-y-2 text-left">
            <h4 className="text-base font-bold text-gray-950 uppercase tracking-wide">
              Customer Care
            </h4>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#d2691e]" />
              <span className="text-sm font-semibold text-[#d2691e]">10 AM to 7 PM</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Phone */}
          <div className="space-y-2 text-left">
            <h4 className="text-base font-bold text-gray-950 uppercase tracking-wide">
              Phone
            </h4>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#d2691e] rotate-90" />
              <a href="tel:+919975392372" className="text-sm font-semibold text-gray-700 hover:text-[#d2691e] transition-colors">
                +91 9975392372
              </a>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Whatsapp Customer Care */}
          <div className="space-y-2 text-left">
            <h4 className="text-base font-bold text-gray-950 uppercase tracking-wide">
              Whatsapp Customer Care
            </h4>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-[#d2691e]" />
              <a 
                href="https://wa.me/9975392372" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold text-gray-700 hover:text-[#d2691e] transition-colors"
              >
                +91 9975392372
              </a>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Email */}
          <div className="space-y-2 text-left">
            <h4 className="text-base font-bold text-gray-950 uppercase tracking-wide">
              Email
            </h4>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#d2691e]" />
              <a href="mailto:info@numerotalk.com" className="text-sm font-semibold text-gray-700 hover:text-[#d2691e] transition-colors">
                info@numerotalk.com
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide">
              Let's Talk About Your Idea
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              We are here to help you with all of your queries related to astrology problems
            </p>
            <div className="w-12 h-[3px] bg-[#d2691e] rounded mt-2" />
          </div>

          {submitted ? (
            <div className="py-8 text-left flex items-start gap-4 bg-emerald-50 border border-emerald-200 p-5 rounded animate-fade-in">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-gray-900 leading-tight">
                  Message Transmitted Successfully
                </h4>
                <p className="text-gray-650 text-sm leading-relaxed font-normal">
                  Thank you for reaching out to Vedic Pandit. We have received your query and will align with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#d2691e] hover:underline mt-2 cursor-pointer block"
                >
                  Send another query
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded flex items-center gap-2 leading-relaxed animate-fade-in">
                  <AlertCircle className="h-4 w-4 text-red-650 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-white border border-gray-200 focus:border-[#d2691e] rounded px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              {/* Email & Mobile side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className="w-full bg-white border border-gray-200 focus:border-[#d2691e] rounded px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    name="mobile"
                    value={formState.mobile}
                    onChange={handleChange}
                    placeholder="Mobile No."
                    className="w-full bg-white border border-gray-200 focus:border-[#d2691e] rounded px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-sans"
                  />
                </div>
              </div>

              {/* Textarea message */}
              <div className="space-y-1">
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell Us About Project *"
                  className="w-full bg-white border border-gray-200 focus:border-[#d2691e] rounded px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-sans resize-none"
                />
              </div>

              {/* Captcha */}
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Captcha {num1} + {num2} = *
                </label>
                <input
                  type="number"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter Captcha Value"
                  className="w-full bg-white border border-gray-200 focus:border-[#d2691e] rounded px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 font-sans"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-left">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded text-sm font-bold bg-[#d2691e] text-white hover:bg-[#b85816] transition-all cursor-pointer disabled:opacity-50 uppercase shadow-xs tracking-wider"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>


    </div>
  );
}
