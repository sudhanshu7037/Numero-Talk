import React from 'react';
import { Sun, Moon, Heart, User, Compass, Sparkles } from 'lucide-react';

export default function Home({ setCurrentTab }) {
  const coreNumbers = [
    {
      title: "Life Path Number",
      icon: Sun,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Derived from your birth date, it represents the primary trajectory of your lifetime, your core lesson, and the path you are destined to walk."
    },
    {
      title: "Destiny Number",
      icon: Moon,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      description: "Calculated from your full birth name, it reveals your natural capabilities, innate talents, and what you are destined to achieve in this world."
    },
    {
      title: "Soul Urge Number",
      icon: Heart,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      description: "Determined by the vowels in your name, it represents your deepest desires, hidden motivations, and what truly satisfies your inner self."
    },
    {
      title: "Personality Number",
      icon: User,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      description: "Extracted from the consonants in your name, it shows the outer self—how you present yourself to the world and how others perceive you."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center relative py-8 sm:py-16 glass-panel rounded-3xl border border-mystic-gold/10 overflow-hidden shadow-2xl bg-gradient-to-b from-mystic-purple/20 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative space-y-6 max-w-2xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mystic-gold/10 border border-mystic-gold/30 text-xs font-semibold text-mystic-gold uppercase tracking-[0.2em] animate-pulse">
            <Sparkles className="h-3 w-3" />
            Vibrational Mathematics
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-wider leading-tight">
            Unlock the Mysteries of Your <span className="text-mystic-gold glow-gold">Cosmic Code</span>
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
            Every number has a vibration. Aetheria decodes the numerical frequencies of your name and birth date using Pythagorean formula, bringing you in alignment with your true destiny and cosmic layout.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setCurrentTab('form')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light hover:scale-105 transition-all duration-300 shadow-lg shadow-mystic-gold/25 cursor-pointer"
            >
              <Compass className="h-5 w-5 animate-spin-slow" />
              Begin Your Calculation
            </button>
          </div>
        </div>
      </section>

      {/* Core Numbers Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            The Four Core Blueprints
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Discover the building blocks of your spiritual character
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreNumbers.map((number, idx) => {
            const IconComponent = number.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 bg-mystic-purple/10 flex gap-4 transition-all duration-300 hover:border-mystic-gold/30 hover:bg-mystic-purple/20 group"
              >
                <div className={`p-3 rounded-xl border shrink-0 h-fit ${number.color} group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-semibold text-white tracking-wide group-hover:text-mystic-gold transition-colors">
                    {number.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">
                    {number.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="glass-panel p-8 rounded-2xl border border-white/5 text-center relative overflow-hidden bg-gradient-to-r from-mystic-indigo/10 to-mystic-purple/10">
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
