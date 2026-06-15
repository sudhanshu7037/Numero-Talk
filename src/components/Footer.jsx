import React from 'react';

const quotes = [
  "\"Numbers rule the universe.\" — Pythagoras",
  "\"The numbers are the key to the universe.\" — Pythagoras",
  "\"Mathematics is the alphabet with which God has written the universe.\" — Galileo Galilei",
  "\"In the divine order of the universe, numbers are the vibrational nodes of destiny.\""
];

export default function Footer() {
  // Get a pseudo-random quote based on the day of the month or just pick one
  const quoteIndex = new Date().getDate() % quotes.length;
  const selectedQuote = quotes[quoteIndex];

  return (
    <footer className="w-full py-8 mt-auto px-6 border-t border-white/5 bg-mystic-bg text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <p className="font-serif italic text-violet-300/75 text-sm sm:text-base tracking-wide">
          {selectedQuote}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-gray-500 mt-4 gap-2">
          <p>© {new Date().getFullYear()} Numerology. All spiritual calculations reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-mystic-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-mystic-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
