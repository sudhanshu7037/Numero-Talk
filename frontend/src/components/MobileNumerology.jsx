import React, { useState } from 'react';
import { Compass, Sparkles, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { 
  analyzeMobileNumber, 
  checkMobileCompatibility, 
  calculateMoolank, 
  calculateBhagyank 
} from '../utils/numerologyEngine';
import { planetaryLords, mobileNumberInterpretations } from '../utils/detailedInterpretations';

export default function MobileNumerology() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');

  const analysis = analyzeMobileNumber(mobileNumber);
  const moolank = calculateMoolank(dob);
  const bhagyank = calculateBhagyank(dob);
  const compatibility = dob && mobileNumber ? checkMobileCompatibility(analysis.reduced, moolank, bhagyank) : null;
  const meaning = mobileNumberInterpretations[analysis.reduced];

  return (
    <div className="w-full space-y-12 animate-fade-in text-left">
      <div className="border-b border-gray-200 pb-4">
        <span className="text-xs tracking-wider text-amber-700 uppercase font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Advanced Layout
        </span>
        <h2 className="font-serif text-3xl font-bold mt-3 text-gray-900 tracking-wide">
          Mobile Number Numerology
        </h2>
        <p className="text-gray-500 text-xs mt-1.5">
          Verify your phone number's vibration and compatibility with your cosmic coordinates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form & Basic Vibration */}
        <div className="lg:col-span-6 space-y-6 bg-white/50 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                maxLength={12}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 9898360504"
                className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 transition-all"
              />
            </div>
          </form>

          {mobileNumber && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                  Calculation Breakdown
                </h4>
                <div className="flex gap-4 items-baseline mt-2">
                  <span className="text-sm text-gray-500 font-sans">
                    Digits Sum: {mobileNumber.split('').join(' + ')} = <strong>{analysis.sum}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-700 font-bold">
                    Mobile Vibration
                  </h4>
                  <span className="font-serif text-2xl font-bold text-gray-900 block mt-1">
                    Number {analysis.reduced}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Planetary Ruler: {planetaryLords[analysis.reduced]?.en || 'Unknown'}
                  </span>
                </div>
              </div>

              {meaning && (
                <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1">
                  <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Meaning</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">{meaning.en}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Compatibility & Suggestions */}
        <div className="lg:col-span-6 space-y-6">
          {compatibility ? (
            <div className="bg-white/50 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Compatibility Matrix
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 tracking-wide mt-1">
                  DOB Compatibility Results
                </h3>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="relative h-20 w-20 flex items-center justify-center rounded-full border-4 border-amber-600/10">
                  <span className="text-xl font-black text-amber-700">{compatibility.percentage}%</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 font-medium">Status</span>
                  <div className="flex items-center gap-1.5">
                    {compatibility.percentage >= 70 ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-rose-500" />
                    )}
                    <strong className="text-sm font-bold text-gray-900 tracking-wide uppercase">
                      {compatibility.status}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Mulank (Birth Number)</span>
                  <span className="text-base font-bold text-gray-800 block">Number {moolank}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Bhagyank (Life Path Number)</span>
                  <span className="text-base font-bold text-gray-800 block">Number {bhagyank}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
                  Lucky recommendations
                </h4>
                <div className="space-y-2 text-xs leading-relaxed text-gray-600">
                  <p>&bull; <strong>Ideal phone sum</strong>: Choose a phone number that sums to <strong>3, 5, or 6</strong>, which aligns best with your cosmic birth details.</p>
                  <p>&bull; <strong>VIP Ending Patterns</strong>: Phone numbers ending with <strong>1339</strong> or <strong>3913</strong> act as supportive numbers for financial growth and career stability.</p>
                  <p>&bull; <strong>Digits to Avoid</strong>: Try to minimize the occurrence of numbers <strong>4 and 8</strong> in your phone digits to limit unexpected delays.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50/50 border border-amber-200 p-6 rounded-2xl flex items-start gap-3 leading-relaxed text-xs text-amber-800">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Enter Details:</strong> Fill in both your Date of Birth and Mobile Number to view detailed compatibility score card, lucky digit guidance, and recommendations.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
