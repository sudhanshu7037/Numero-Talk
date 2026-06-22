import React, { useState } from 'react';
import { Sparkles, RefreshCw, Layers, Plus, Trash2, ArrowRight } from 'lucide-react';
import { 
  calculateDestiny, 
  suggestNameCorrections, 
  CHALDEAN_MAP, 
  PYTHAGOREAN_MAP 
} from '../utils/numerologyEngine';
import { planetaryLords } from '../utils/detailedInterpretations';

export default function NameCorrection() {
  const [name, setName] = useState('');
  const [system, setSystem] = useState('pythagorean');
  const [targetNumber, setTargetNumber] = useState(5);
  const [comparisons, setComparisons] = useState([]);
  const [compareName, setCompareName] = useState('');

  const currentVal = calculateDestiny(name, system);
  const suggestions = suggestNameCorrections(name, system, targetNumber);

  const handleAddComparison = (e) => {
    e.preventDefault();
    if (!compareName.trim()) return;
    
    const pythValue = calculateDestiny(compareName, 'pythagorean');
    const chaldValue = calculateDestiny(compareName, 'chaldean');
    
    setComparisons([
      ...comparisons,
      {
        id: Date.now().toString(),
        name: compareName,
        pythValue,
        chaldValue,
        pythLord: planetaryLords[pythValue]?.en || 'Unknown',
        chaldLord: planetaryLords[chaldValue]?.en || 'Unknown'
      }
    ]);
    setCompareName('');
  };

  const handleRemoveComparison = (id) => {
    setComparisons(comparisons.filter(c => c.id !== id));
  };

  return (
    <div className="w-full space-y-12 animate-fade-in text-left">
      <div className="border-b border-gray-200 pb-4">
        <span className="text-xs tracking-wider text-amber-700 uppercase font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Advanced Layout
        </span>
        <h2 className="font-serif text-3xl font-bold mt-3 text-gray-900 tracking-wide">
          Name Correction Module
        </h2>
        <p className="text-gray-500 text-xs mt-1.5">
          Calculate your name frequencies, verify alignments, and adjust spellings for lucky combinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input & Suggestions */}
        <div className="lg:col-span-7 space-y-6 bg-white/50 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                  Numerology System
                </label>
                <select
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all cursor-pointer font-sans"
                >
                  <option value="pythagorean">Pythagorean System</option>
                  <option value="chaldean">Chaldean System</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-655 mb-2">
                  Target Lucky Number
                </label>
                <select
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all cursor-pointer font-sans"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <option key={n} value={n}>Number {n} (Lord: {planetaryLords[n]?.en})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                Full Birth Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Alan Doe"
                className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all"
              />
            </div>
          </form>

          {name && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                    Current Vibration
                  </h4>
                  <span className="font-serif text-2xl font-bold text-gray-900 block mt-1">
                    Number {currentVal}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Planetary Ruler: {planetaryLords[currentVal]?.en || 'Unknown'}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    currentVal === targetNumber 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {currentVal === targetNumber ? 'Aligned' : 'Correction Needed'}
                  </span>
                </div>
              </div>

              {currentVal !== targetNumber && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                    Spelling Correction Suggestions
                  </h4>
                  <div className="space-y-2">
                    {suggestions.map((s, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl hover:border-amber-600/40 transition-all"
                      >
                        <div>
                          <strong className="text-sm font-semibold text-gray-900 font-sans tracking-wide block">{s.name}</strong>
                          <span className="text-[10px] text-gray-500 font-medium font-sans">{s.change}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-700 font-mono">Sum: {s.sum} &rarr; {s.reduced}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">Lucky</span>
                        </div>
                      </div>
                    ))}
                    {suggestions.length === 0 && (
                      <p className="text-xs text-gray-500 italic">No direct correction suggestions found. Try adjusting spacing.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Multi-Name Comparison Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Interactive Tools
            </span>
            <h3 className="font-serif text-2xl font-bold text-gray-900 tracking-wide">
              Compare Alternative Spellings
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Add multiple variations of your name to compare Pythagorean and Chaldean vibrations side-by-side to choose the perfect spelling.
            </p>
          </div>

          <form onSubmit={handleAddComparison} className="flex gap-2">
            <input
              type="text"
              value={compareName}
              onChange={(e) => setCompareName(e.target.value)}
              placeholder="e.g. Johnn Doe"
              className="flex-1 bg-white border border-gray-250 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </form>

          {comparisons.length > 0 && (
            <div className="border border-gray-250 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-xs shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-250">
                    <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-600">Name</th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 text-center">Pyth</th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 text-center">Chald</th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((c) => (
                    <tr key={c.id} className="hover:bg-white/70 transition-all text-xs">
                      <td className="p-3 font-semibold text-gray-900 truncate max-w-[120px]">{c.name}</td>
                      <td className="p-3 text-center font-bold text-gray-700">
                        {c.pythValue} <span className="text-[9px] text-gray-400 font-normal">({c.pythLord.split(' ')[0]})</span>
                      </td>
                      <td className="p-3 text-center font-bold text-gray-700">
                        {c.chaldValue} <span className="text-[9px] text-gray-400 font-normal">({c.chaldLord.split(' ')[0]})</span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRemoveComparison(c.id)}
                          className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
