import React from 'react';
import { Shield, Sparkles, BookOpen, Compass } from 'lucide-react';
import aboutImg from '../assets/about.png';

export default function About() {
  const masterNumbers = [
    {
      number: "11",
      name: "The Master Intuitive",
      description: "Represents psychic awareness, sensitivity, and spiritual illumination. Individuals with an 11 vibe are channels for higher wisdom."
    },
    {
      number: "22",
      name: "The Master Builder",
      description: "Combines intuitive vision with the practical capability to manifest large-scale projects. It represents power, system, and execution."
    },
    {
      number: "33",
      name: "The Master Teacher",
      description: "The highest vibration of spiritual devotion and compassion. It represents healing energy, guidance, and unconditional support."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 animate-fade-in text-left">
      {/* Intro Section */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-mystic-gold/10 relative overflow-hidden bg-gradient-to-r from-mystic-purple/10 to-transparent">
        <div className="absolute top-0 right-0 p-8 text-mystic-gold/5 pointer-events-none">
          <BookOpen className="h-40 w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-mystic-gold">
              Origins & Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Understanding Pythagorean Numerology
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              Pythagorean numerology is a western esoteric system founded by the ancient Greek philosopher and mathematician, Pythagoras. He believed that the universe is structured upon mathematical principles, and that numbers are the fundamental building blocks of all physical and spiritual reality.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
              By assigning numerical values to the letters in a name and summing the digits of a birth date, we can analyze the specific vibrational frequency of a person, revealing their soul lessons, outer character, and inner potential.
            </p>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <img
              src={aboutImg}
              alt="Numerology Sacred Geometry"
              className="rounded-2xl border border-mystic-gold/20 shadow-2xl w-full h-auto object-cover max-h-[300px] glow-purple transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* Pythagorean Chart Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calculation Table */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-mystic-gold">
            <Compass className="h-5 w-5" />
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              The Letter-to-Number System
            </h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed font-sans">
            Letters are converted to numbers 1 through 9 using the Pythagorean grid. Master numbers are preserved, and all others are reduced to a single digit:
          </p>
          <div className="overflow-x-auto w-full">
            <div className="grid grid-cols-9 gap-1 text-center font-mono text-[10px] mt-2 border border-white/10 rounded-xl overflow-hidden bg-mystic-dark/40 min-w-[340px] sm:min-w-0">
              {/* Header numbers */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-mystic-gold/10 text-mystic-gold font-bold py-1 border-b border-r border-white/10">
                  {i + 1}
                </div>
              ))}
              {/* Rows of letters */}
              {["A B C D E F G H I", "J K L M N O P Q R", "S T U V W X Y Z"].map((row, rIdx) => {
                const letters = row.split(" ");
                return Array.from({ length: 9 }).map((_, cIdx) => {
                  const char = letters[cIdx] || "";
                  return (
                    <div key={`${rIdx}-${cIdx}`} className="py-2 text-gray-300 border-r border-white/10 border-b last:border-b-0">
                      <span className="font-bold text-xs">{char}</span>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>

        {/* Master Numbers */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-mystic-gold">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              The Presence of Master Numbers
            </h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed font-sans">
            In numerology, double digits of the same number (specifically 11, 22, and 33) are called <strong>Master Numbers</strong>. These are not reduced to a single digit during calculations because they carry a high-frequency spiritual potential.
          </p>
          <div className="space-y-3 pt-2">
            {masterNumbers.map((mn, idx) => (
              <div key={idx} className="flex gap-3 items-start border-l border-mystic-gold/30 pl-3">
                <span className="font-serif text-lg font-black text-mystic-gold leading-none">
                  {mn.number}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{mn.name}</h4>
                  <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{mn.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrity Card */}
      <section className="glass-panel p-6 rounded-2xl border border-white/5 bg-mystic-purple/5 flex gap-4 items-center">
        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          <Shield className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Pythagorean Mathematical Integrity
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            Numerology follows pure Pythagorean mathematics. Our engine parses birth names and birth dates strictly, ensuring that reductions and master number structures follow validated metaphysical criteria.
          </p>
        </div>
      </section>
    </div>
  );
}
