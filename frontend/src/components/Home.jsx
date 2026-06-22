import React from 'react';
import { Sun, Moon, Heart, User, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../assets/hero_illustration.png';

export default function Home() {
  const navigate = useNavigate();
  const coreNumbers = [
    {
      title: "Life Path",
      subtitle: "Lifetime Trajectory",
      icon: Sun,
      color: "text-amber-600 bg-amber-100 border-amber-200",
      description: "Derived from your birth date, it maps your primary lifetime trajectory, main lessons, and the core path you walk."
    },
    {
      title: "Destiny",
      subtitle: "Innate Potential",
      icon: Moon,
      color: "text-indigo-600 bg-indigo-100 border-indigo-200",
      description: "Calculated from your full birth name, it reveals your natural capabilities, talents, and what you are destined to build."
    },
    {
      title: "Soul Urge",
      subtitle: "Inner Desires",
      icon: Heart,
      color: "text-rose-600 bg-rose-100 border-rose-200",
      description: "Determined by vowels in your name, it represents your deepest desires, silent motivations, and what feeds your inner self."
    },
    {
      title: "Personality",
      subtitle: "Outer Vibration",
      icon: User,
      color: "text-teal-600 bg-teal-100 border-teal-200",
      description: "Extracted from consonants, it shows how you present yourself to the world and how others perceive your vibration."
    }
  ];

  const masterCards = [
    {
      number: "11",
      archetype: "The Intuitive Messenger",
      frontDesc: "Psychic Gateway & Vision",
      backText: "The 11 vibration acts as a bridge between the spiritual and physical realms. It holds deep intuitive awareness, spiritual illumination, and a high sensitivity to energy."
    },
    {
      number: "22",
      archetype: "The Master Builder",
      frontDesc: "Manifestation & Practical Mastery",
      backText: "The 22 vibration merges the intuitive dreams of the 11 with the disciplined form of the 4, enabling the materialization of large-scale ideals and global goals."
    },
    {
      number: "33",
      archetype: "The Master Teacher",
      frontDesc: "Pure Devotion & Divine Guidance",
      backText: "The 33 vibration represents the teacher of teachers. It is centered around ultimate spiritual protection, unconditional compassion, healing, and artistic devotion."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Input Coordinates",
      desc: "Enter your full birth name letters and exact date of birth coordinates."
    },
    {
      num: "02",
      title: "Decrypt Frequencies",
      desc: "Our Pythagorean engine maps the letters and numbers into core vibrational grids."
    },
    {
      num: "03",
      title: "Align & Manifest",
      desc: "Receive your PDF analysis and email confirmation detailing your cosmic blueprints."
    }
  ];

  return (
    <div className="w-full space-y-16 animate-fade-in">
      
      {/* Full-width Hero Section (No Card Border or Enclosure) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 relative overflow-hidden w-full">
        {/* Cosmic Background Constellations */}
        <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden -z-10">
          <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-rose-400 rounded-full animate-pulse-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/2 left-5 w-1 h-1 bg-teal-400 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
          {/* Subtle line links */}
          <svg className="absolute top-1/4 left-1/4 w-32 h-32 text-amber-500/10" viewBox="0 0 100 100">
            <line x1="10" y1="10" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="80" x2="90" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="50" cy="80" r="2" fill="currentColor" />
            <circle cx="90" cy="20" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Left Side: Content */}
        <div className="md:col-span-7 space-y-6 text-left relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            Pythagorean Esoteric Engine
          </div>
          
          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-wider leading-tight">
            Unlock the Mysteries of Your <span className="text-amber-600 block">Cosmic Code</span>
          </h2>
          
          <p className="text-gray-650 text-base sm:text-lg leading-relaxed max-w-2xl">
            Every name and birth date vibrates with a hidden mathematical signature. Numero Talk calculates your cosmic configurations to align your character, desires, and actions with the universe.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/calculator')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold bg-amber-600 text-white hover:bg-amber-700 hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Compass className="h-5 w-5" />
              Begin Your Calculation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Animated Image & Graphic overlays */}
        <div className="md:col-span-5 flex justify-center items-center relative py-6">
          {/* Background rotating cosmic mandala */}
          <div className="absolute inset-0 m-auto w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] pointer-events-none opacity-25 animate-spin-slow -z-10">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="text-amber-500 w-full h-full">
              <circle cx="100" cy="100" r="95" strokeWidth="0.5" strokeDasharray="3 5" />
              <circle cx="100" cy="100" r="85" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="65" strokeWidth="0.75" />
              <path d="M100 5v190M5 100h190" strokeWidth="0.5" strokeDasharray="2 4" />
              <path d="M32.8 32.8l134.4 134.4M32.8 167.2L167.2 32.8" strokeWidth="0.5" strokeDasharray="2 4" />
              <polygon points="100,15 125,75 185,100 125,125 100,185 75,125 15,100 75,75" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Floating cosmic numbers */}
          <span className="absolute top-2 left-6 font-serif text-5xl font-black text-amber-500/20 select-none pointer-events-none animate-float-reverse">7</span>
          <span className="absolute bottom-2 right-6 font-serif text-5xl font-black text-indigo-500/25 select-none pointer-events-none animate-float">11</span>
          <span className="absolute top-8 right-2 font-serif text-4xl font-black text-rose-500/20 select-none pointer-events-none animate-pulse-slow">3</span>
          <span className="absolute bottom-8 left-2 font-serif text-4xl font-black text-teal-500/20 select-none pointer-events-none animate-float-reverse">9</span>

          {/* Main Hero Illustration */}
          <div className="relative animate-float">
            <img 
              src={heroIllustration} 
              alt="Numerology Wheel Geometry" 
              className="w-full max-w-[280px] sm:max-w-[360px] h-auto object-contain rounded-full shadow-md border border-gray-200 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Flat List: The Four Core Blueprints (No Grid Cards / Spans Full Width) */}
      <section className="space-y-8 w-full pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 tracking-wide">
            The Four Core Blueprints
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Discover the mathematical building blocks of your spiritual character
          </p>
          <div className="w-12 h-[3px] bg-[#d2691e] mx-auto mt-3 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {coreNumbers.map((number, idx) => {
            const IconComponent = number.icon;
            return (
              <div
                key={idx}
                className="group flex gap-5 p-6 items-start transition-all duration-300 rounded hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-transparent hover:border-gray-100"
              >
                <div className={`p-4 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${number.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="space-y-1 text-left flex-1">
                  <h4 className="font-serif text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#d2691e]">
                    {number.title}
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block font-mono">
                    {number.subtitle}
                  </span>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">
                    {number.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Flat List: Cosmic Alignment Map (No Grid Cards / Spans Full Width) */}
      <section className="space-y-8 w-full pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 tracking-wide">
            Cosmic Alignment Map
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            The mathematical journey to map your frequency configurations
          </p>
          <div className="w-12 h-[3px] bg-[#d2691e] mx-auto mt-3 rounded" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* Dotted Connection Line (visible on desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] border-t-2 border-dashed border-gray-200 -z-10" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#d2691e] text-white flex items-center justify-center font-bold text-lg shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#b85816]">
                {step.num}
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#d2691e]">
                  {step.title}
                </h4>
                <p className="text-gray-650 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flat List: Sacred Master Vibrations (No Grid Cards / Spans Full Width) */}
      <section className="space-y-8 w-full pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 tracking-wide">
            Sacred Master Vibrations
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Deeper frequency configurations and their cosmic meanings
          </p>
          <div className="w-12 h-[3px] bg-[#d2691e] mx-auto mt-3 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {masterCards.map((card, idx) => (
            <div
              key={idx}
              className={`flex flex-col text-left space-y-3 ${idx > 0 ? 'md:pl-8' : ''} pt-6 md:pt-0`}
            >
              <div className="space-y-1">
                <span className="font-serif text-6xl sm:text-7xl font-black text-[#d2691e] block tracking-tight leading-none opacity-85">
                  {card.number}
                </span>
                <h4 className="text-lg font-serif font-bold text-gray-900 uppercase tracking-wide pt-1">
                  {card.archetype}
                </h4>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest block font-mono">
                  {card.frontDesc}
                </span>
              </div>
              <p className="text-gray-650 text-sm sm:text-base leading-relaxed pt-1">
                {card.backText}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flat Banner (Spans Full Width) */}
      <section className="py-8 text-center w-full border-t border-b border-gray-250">
        <p className="font-serif text-lg sm:text-2xl italic text-gray-700 max-w-3xl mx-auto">
          "Numbers rule the universe. They are the symbols of divine order, aligning the soul with the harmony of the spheres."
        </p>
        <span className="block text-[10px] uppercase tracking-widest text-[#d2691e] font-bold mt-4">
          — Pythagoras of Samos
        </span>
      </section>

    </div>
  );
}
