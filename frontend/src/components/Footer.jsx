import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (tab) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'form') navigate('/calculator');
    else if (tab === 'about') navigate('/about');
    else if (tab === 'contact') navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-12 pb-8 mt-auto px-6 border-t border-gray-200 bg-white text-left">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-150">
          
          {/* Column 1: Brand & Info */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-serif text-3xl font-black tracking-wider text-gray-900 uppercase">
              Numero Talk
            </h3>
            <p className="text-gray-650 text-md leading-relaxed max-w-[220px]">
              Aligning your name and birth coordinates with the mathematics of the universe. Decrypt your Life Path, Destiny, Soul Urge, and Personality configurations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-base">
              <li>
                <button onClick={() => handleNavigate('home')} className="text-gray-600 hover:text-[#d2691e] transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('form')} className="text-gray-600 hover:text-[#d2691e] transition-colors cursor-pointer text-left">
                  Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="text-gray-600 hover:text-[#d2691e] transition-colors cursor-pointer text-left">
                  About us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className="text-gray-600 hover:text-[#d2691e] transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-sans">
              Support & Address
            </h4>
            <ul className="space-y-2 text-base text-gray-650">
              <li>
                <span className="block font-semibold text-gray-900">Operating Hours</span>
                <span className="text-sm text-[#d2691e]">10 AM to 7 PM IST</span>
              </li>
              <li>
                <span className="block font-semibold text-gray-900">Support Email</span>
                <a href="mailto:info@numerotalk.com" className="hover:text-[#d2691e] transition-colors">
                  info@numerotalk.com
                </a>
              </li>
              <li>
                <span className="block font-semibold text-gray-900">Support Line</span>
                <a href="tel:+919079175403" className="hover:text-[#d2691e] transition-colors">
                  +91 9975392372
                </a>
              </li>
              <li>
                <span className="block font-semibold text-gray-900">Address</span>
                <span className="text-sm text-gray-500">Station Road, Nashik Maharashtra 422001</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us / Social Media */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-sans">
              Connect with Us
            </h4>
            <p className="text-gray-650 text-sm">
              Stay synchronized with our latest Vedic and cosmic updates.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* WhatsApp Social */}
              <a 
                href="https://wa.me/919975392372" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-[#25d366] hover:text-white hover:border-transparent transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Instagram Social */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube Social */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-[#ff0000] hover:text-white hover:border-transparent transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>

              {/* Facebook Social */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-[#1877f2] hover:text-white hover:border-transparent transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1h-3C10.5 1 9 2.5 9 5v3z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-sm text-gray-500 pt-8 gap-4">
          <p className='font-bold'>© {new Date().getFullYear()} Numero Talk. Design And Developed by Pushpendra Technology</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#d2691e] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#d2691e] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
