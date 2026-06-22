import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function Header({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getTab = (path) => {
    if (path === '/') return 'home';
    if (path === '/calculator') return 'form';
    if (path === '/signup') return 'auth';
    return path.substring(1);
  };
  const currentTab = getTab(location.pathname);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'form', label: 'Calculator', path: '/calculator' },
    { id: 'name-correction', label: 'Name Correction', path: '/name-correction' },
    { id: 'mobile-numerology', label: 'Mobile Numerology', path: '/mobile-numerology' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
    { id: 'history', label: 'History', path: '/history' },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 w-full px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Logo on Left */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav('/')}
        >
          <div className="relative">
            <img 
              src={logo} 
              alt="Numero Talk Logo" 
              className="h-10 w-10 object-cover rounded-full border border-gray-250 transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
            </span>
          </div>
          <div className="text-left">
            <h1 className="font-serif text-xl font-bold tracking-widest text-amber-700 m-0 p-0 leading-none">
              NUMERO TALK
            </h1>
            <span className="text-[9px] tracking-wider text-gray-500 font-sans uppercase font-medium">
              Vadic Cosmic Numerology
            </span>
          </div>
        </div>

        {/* Hamburger Menu Toggle on Right for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
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
                onClick={() => handleNav(item.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-xs'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Auth State Button */}
          {user ? (
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-3">
              <span className="text-xs text-gray-700 font-medium font-sans">
                Hi, {user.name ? user.name.split(' ')[0] : 'User'}
              </span>
              <button
                onClick={onLogout}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-105 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer border border-gray-250"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav('/signup')}
              className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ml-2 bg-amber-600 text-white hover:bg-amber-700"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav className="lg:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-gray-150 animate-fade-in-up">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'text-gray-605 hover:text-gray-950 hover:bg-gray-50 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Mobile Auth Options */}
          <div className="pt-2 mt-2 border-t border-gray-150 px-4 flex items-center justify-between">
            {user ? (
              <>
                <span className="text-xs text-gray-750 font-medium">
                  Logged in as: {user.name ? user.name.split(' ')[0] : 'User'}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-250 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNav('/signup')}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 cursor-pointer"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
