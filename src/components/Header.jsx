import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Header({ currentTab, setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'form', label: 'Calculator' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'history', label: 'History' },
  ];

  return (
    <header className="glass-panel w-full px-6 py-4 sticky top-0 z-50 shadow-lg border-b border-mystic-gold/10">
      <div className="flex items-center justify-between w-full">
        {/* Logo on Left */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            setCurrentTab('home');
            setIsOpen(false);
          }}
        >
          <div className="relative">
            <img 
              src={logo} 
              alt="Aetheria Logo" 
              className="h-10 w-10 object-cover rounded-full border border-mystic-gold/30 glow-gold group-hover:rotate-12 transition-transform duration-500"
            />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mystic-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mystic-gold"></span>
            </span>
          </div>
          <div className="text-left">
            <h1 className="font-serif text-2xl font-bold tracking-widest text-mystic-gold-light m-0 p-0 leading-none">
             VADIC
            </h1>
            <span className="text-[10px] tracking-[0.25em] text-violet-300 font-sans uppercase font-medium">
              Cosmic Numerology
            </span>
          </div>
        </div>

        {/* Hamburger Menu Toggle on Right for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-mystic-gold/20 text-mystic-gold border border-mystic-gold/40 shadow-sm shadow-mystic-gold/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav className="lg:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-white/5 animate-fade-in-up">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-mystic-gold/20 text-mystic-gold border border-mystic-gold/40'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}

