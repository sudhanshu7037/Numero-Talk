import React from 'react';
import { Sun, Moon, Heart, User, Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function Home({ setCurrentTab }) {
  const coreNumbers = [
    {
      title: "Life Path",
      subtitle: "Lifetime Trajectory",
      icon: Sun,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Derived from your birth date, it maps your primary lifetime trajectory, main lessons, and the core path you walk."
    },
    {
      title: "Destiny",
      subtitle: "Innate Potential",
      icon: Moon,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      description: "Calculated from your full birth name, it reveals your natural capabilities, talents, and what you are destined to build."
    },
    {
      title: "Soul Urge",
      subtitle: "Inner Desires",
      icon: Heart,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      description: "Determined by vowels in your name, it represents your deepest desires, silent motivations, and what feeds your inner self."
    },
    {
      title: "Personality",
      subtitle: "Outer Vibration",
      icon: User,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
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
    <div className="w-full space-y-16 animate-fade-in text-center">
      
      {/* Hero Section Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 sm:py-12 glass-panel rounded-3xl border border-mystic-gold/15 overflow-hidden shadow-2xl pulse-gold-glow bg-gradient-to-b from-mystic-purple/20 via-mystic-dark/10 to-transparent p-6 sm:p-10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Left Side: Text and CTA (sliding in from the left) */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10 animate-slide-in-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mystic-gold/10 border border-mystic-gold/30 text-[10px] font-semibold text-mystic-gold uppercase tracking-[0.25em] animate-pulse">
            <Sparkles className="h-3 w-3" />
            Pythagorean Esoteric Engine
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-wider leading-tight">
            Unlock the Mysteries of Your <span className="text-mystic-gold glow-gold block sm:inline">Cosmic Code</span>
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
            Every name and birth date vibrates with a hidden mathematical signature. Aetheria calculates your cosmic configurations to align your character, desires, and actions with the universe.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setCurrentTab('form')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-mystic-gold/25 cursor-pointer border-t border-amber-300"
            >
              <Compass className="h-5 w-5 animate-spin-slow group-hover:rotate-45 transition-transform" />
              Begin Your Calculation
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Right Side: Celestial Orbit Graphic (sliding in from the right) */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[280px] sm:h-[340px] pointer-events-none select-none animate-slide-in-right z-10">
          {/* Orbital Core Sphere */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-mystic-gold via-amber-400 to-yellow-300 blur-[2px] shadow-[0_0_40px_rgba(245,158,11,0.8)] z-20 flex items-center justify-center animate-float">
            <span className="font-serif text-mystic-dark font-black text-2xl">9</span>
          </div>

          {/* Orbit Line 1 (Inner Gold) */}
          <div className="absolute w-36 h-36 border border-dashed border-mystic-gold/30 rounded-full animate-orbit-3 z-10 flex items-center justify-center">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-mystic-gold text-mystic-dark font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-yellow-350">1</div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-mystic-gold text-mystic-dark font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-yellow-350">7</div>
          </div>

          {/* Orbit Line 2 (Middle Purple) */}
          <div className="absolute w-56 h-56 border border-double border-violet-500/20 rounded-full animate-orbit-2 z-10 flex items-center justify-center">
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-violet-950/80 border border-violet-500/40 text-violet-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">11</div>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-950/80 border border-violet-500/40 text-violet-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">22</div>
          </div>

          {/* Orbit Line 3 (Outer Gold Dot) */}
          <div className="absolute w-[280px] h-[280px] border border-dotted border-mystic-gold/15 rounded-full animate-orbit-1 z-0 flex items-center justify-center">
            <div className="absolute top-1/4 right-0 transform translate-x-1/2 bg-amber-955/80 border border-mystic-gold/40 text-mystic-gold font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">33</div>
            <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2 bg-amber-955/80 border border-mystic-gold/40 text-mystic-gold font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">3</div>
          </div>
        </div>
      </section>

      {/* Core Blueprints Cards Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            The Four Core Blueprints
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Discover the mathematical building blocks of your spiritual character
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreNumbers.map((number, idx) => {
            const IconComponent = number.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-white/5 bg-mystic-purple/10 flex flex-col justify-between items-start transition-all duration-500 hover:border-mystic-gold/30 hover:bg-mystic-purple/20 hover:-translate-y-2 group shadow-xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="space-y-4 text-left">
                  <div className={`p-3 rounded-2xl border shrink-0 w-fit ${number.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-mystic-gold transition-colors">
                      {number.title}
                    </h4>
                    <span className="text-[9px] font-semibold text-violet-300 uppercase tracking-wider block font-mono">
                      {number.subtitle}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] leading-relaxed font-sans">
                    {number.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works / Alignment Workflow Map */}
      <section className="space-y-8 py-4">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Cosmic Alignment Map
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            The mathematical journey to map your frequency configurations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto px-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center space-y-4 group">
              {/* Connecting animated line for desktop */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-[28px] left-[60%] w-[80%] border-t border-dashed border-mystic-gold/20 z-0 pointer-events-none group-hover:border-mystic-gold/45 transition-colors duration-500" />
              )}
              
              <div className="relative z-10 w-14 h-14 rounded-full border border-white/10 bg-mystic-dark flex items-center justify-center font-serif text-lg font-black text-mystic-gold-light group-hover:border-mystic-gold/50 shadow-md group-hover:scale-105 transition-all duration-300">
                {step.num}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white tracking-wide group-hover:text-mystic-gold transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[240px] mx-auto font-sans">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Interactive Master Numbers Flip Cards */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Sacred Master Vibrations
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Hover over the master configurations to flip and reveal their deeper meanings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {masterCards.map((card, idx) => (
            <div key={idx} className="flip-card w-full h-[220px]">
              <div className="flip-card-inner w-full h-full">
                
                {/* Front Side */}
                <div className="flip-card-front w-full h-full flex flex-col justify-center items-center border border-white/5 bg-mystic-purple/20 glass-panel p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-mystic-gold/2 to-transparent pointer-events-none" />
                  <span className="font-serif text-5xl font-black text-mystic-gold glow-gold mb-2 block">
                    {card.number}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-white tracking-wider uppercase">
                    {card.archetype}
                  </h4>
                  <span className="text-[10px] text-violet-300 tracking-widest uppercase mt-2 font-mono">
                    {card.frontDesc}
                  </span>
                </div>

                {/* Back Side */}
                <div className="flip-card-back w-full h-full flex flex-col justify-center items-center border border-mystic-gold/30 bg-mystic-purple/50 glass-panel p-6 shadow-2xl">
                  <h4 className="text-xs font-serif font-bold text-mystic-gold tracking-widest uppercase mb-2">
                    {card.archetype}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-gray-300 font-sans">
                    {card.backText}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Quote Banner */}
      <section className="glass-panel p-8 rounded-3xl border border-white/5 text-center relative overflow-hidden bg-gradient-to-r from-mystic-indigo/10 to-mystic-purple/10 max-w-2xl mx-auto pulse-purple-glow">
        <div className="max-w-xl mx-auto space-y-4">
          <p className="font-serif text-base sm:text-lg italic text-violet-300">
            "Numbers rule the universe. They are the symbols of divine order, aligning the soul with the harmony of the spheres."
          </p>
          <span className="block text-[10px] uppercase tracking-widest text-mystic-gold font-bold">
            — Pythagoras of Samos
          </span>
        </div>
      </section>

    </div>
  );
}
