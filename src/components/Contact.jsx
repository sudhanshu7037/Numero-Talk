import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in text-left">
      <div className="glass-panel p-8 rounded-3xl border border-mystic-gold/15 shadow-2xl relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05)_0%,transparent_50%)] pointer-events-none" />
        
        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 glow-purple animate-bounce">
              <Check className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                Message Dispatched to the Cosmos
              </h3>
              <p className="text-gray-300 text-sm max-w-sm mx-auto font-sans leading-relaxed">
                Your connection has been launched. Our cosmic numerology guild will align with your vibration and reach out shortly.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2 border-b border-white/5 pb-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Reach the Aetheria Guild
              </h2>
              <p className="text-gray-400 text-xs font-sans">
                Have questions about calculations, reports, or cosmic alignments? Drop us a signal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-mystic-dark border border-white/10 focus:border-mystic-gold/40 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-650 font-sans"
                />
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-mystic-dark border border-white/10 focus:border-mystic-gold/40 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-655 font-sans"
                />
              </div>

              {/* Subject field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Calculation assistance, partnership, etc."
                  className="w-full bg-mystic-dark border border-white/10 focus:border-mystic-gold/40 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-655 font-sans"
                />
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full bg-mystic-dark border border-white/10 focus:border-mystic-gold/40 rounded-xl px-4 py-3 text-sm text-gray-200 outline-none transition-all placeholder:text-gray-655 font-sans resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-mystic-gold/10 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Transmitting Signal...' : 'Transmit Message'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
