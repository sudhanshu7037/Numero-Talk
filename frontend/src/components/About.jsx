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
    <div className="w-full space-y-10 animate-fade-in text-left">
      
      {/* Intro Section - Full Width, No Card Enclosure */}
      <section className="w-full relative overflow-hidden py-6">
        <div className="absolute top-0 right-0 p-8 text-gray-100 pointer-events-none">
          <BookOpen className="h-40 w-40" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-4">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-700">
              About Numero Talk
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gray-900 tracking-wide">
              Decoding the Language of the Universe
            </h2>
            <p className="text-gray-650 text-base sm:text-lg leading-relaxed">
              <strong>Numero Talk</strong> is a premium cosmic calculator and analysis platform designed to unlock the secrets of your life using Pythagorean numerology. We believe that numbers are not merely symbols of quantity, but carriers of deep cosmic frequencies and patterns that structure our reality.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              By translating the letters of your name and the alignments of your birth date, Numero Talk decrypts your spiritual blueprint. Our platform delivers detailed explanations of your Life Path, Destiny, Soul Urge, and Personality numbers, helping you understand your inner motivations and outer potential. We aim to make these ancient mathematical teachings simple, intuitive, and accessible for everyone.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="flex-shrink-0 md:w-1/3 flex justify-center">
            <img
              src={aboutImg}
              alt="Numero Talk Cosmic Geometry"
              className="rounded-full border border-gray-200 shadow-xs w-full h-auto object-cover max-w-[260px] transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* Pythagorean Chart & Master Numbers - Full Width flat sections */}
      <section className="space-y-8 w-full">
        {/* Calculation Table */}
        <div className="flex flex-col md:flex-row gap-8 items-center py-6 border-t border-b border-gray-200 w-full">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Compass className="h-5 w-5" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 tracking-wide">
                The Letter-to-Number System
              </h3>
            </div>
            <p className="text-gray-650 text-base leading-relaxed">
              Letters are converted to numbers 1 through 9 using the Pythagorean grid. Master numbers are preserved, and all others are reduced to a single digit:
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              This grid maps alphabetical characters to their cosmic vibrations, allowing us to accurately sum the numbers representing your birth name details.
            </p>
          </div>

          {/* Right Side: Grid Table */}
          <div className="flex-shrink-0 md:w-1/2 overflow-x-auto w-full">
            <div className="grid grid-cols-9 gap-1 text-center font-mono text-[10px] border border-gray-200 rounded-xl overflow-hidden bg-gray-50 min-w-[340px] sm:min-w-0">
              {/* Header numbers */}
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-amber-50 text-amber-700 font-bold py-1.5 border-b border-r border-gray-200">
                  {i + 1}
                </div>
              ))}
              {/* Rows of letters */}
              {["A B C D E F G H I", "J K L M N O P Q R", "S T U V W X Y Z"].map((row, rIdx) => {
                const letters = row.split(" ");
                return Array.from({ length: 9 }).map((_, cIdx) => {
                  const char = letters[cIdx] || "";
                  return (
                    <div key={`${rIdx}-${cIdx}`} className="py-2 text-gray-700 border-r border-gray-200 border-b last:border-b-0">
                      <span className="font-bold text-xs">{char}</span>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>

        {/* Master Numbers */}
        <div className="space-y-4 py-6 border-b border-gray-200 w-full">
          <div className="flex items-center gap-2 text-amber-700">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 tracking-wide">
              The Presence of Master Numbers
            </h3>
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            In numerology, double digits of the same number (specifically 11, 22, and 33) are called <strong>Master Numbers</strong>. These are not reduced to a single digit during calculations because they carry a high-frequency spiritual potential.
          </p>
          <div className="space-y-3 pt-2">
            {masterNumbers.map((mn, idx) => (
              <div key={idx} className="flex gap-3 items-start border-l-2 border-amber-600 pl-3">
                <span className="font-serif text-lg font-black text-amber-700 leading-none">
                  {mn.number}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{mn.name}</h4>
                  <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{mn.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrity Row - Flat */}
      <section className="py-6 flex gap-4 items-center">
        <div className="p-3 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 shrink-0">
          <Shield className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-emerald-800 uppercase tracking-wider">
            Pythagorean Mathematical Integrity
          </h4>
          <p className="text-sm text-emerald-700 leading-relaxed">
            Numerology follows pure Pythagorean mathematics. Our engine parses birth names and birth dates strictly, ensuring that reductions and master number structures follow validated metaphysical criteria.
          </p>
        </div>
      </section>
    </div>
  );
}
