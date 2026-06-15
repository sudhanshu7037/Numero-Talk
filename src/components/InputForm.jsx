import React, { useState } from 'react';
import { Sparkles, Eye, AlertCircle } from 'lucide-react';

export default function InputForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (!/^[A-Za-z\s\-']+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only letters.';
    }

    // Middle Name validation (optional, but if present must be letters)
    if (formData.middleName.trim() && !/^[A-Za-z\s\-']+$/.test(formData.middleName)) {
      newErrors.middleName = 'Middle name must contain only letters.';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (!/^[A-Za-z\s\-']+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only letters.';
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      // Reset hours to compare dates only
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime())) {
        newErrors.dob = 'Please enter a valid date.';
      } else if (selectedDate > today) {
        newErrors.dob = 'Birthdate cannot be in the future.';
      } else if (selectedDate.getFullYear() < 1900) {
        newErrors.dob = 'Please enter a birth year after 1900.';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsCalculating(true);

    // Simulate aligning stars / calculating cosmic numbers
    setTimeout(() => {
      setIsCalculating(false);
      onGenerate(formData);
    }, 1800);
  };

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Animated concentric rings */}
          <div className="absolute inset-0 border-4 border-dashed border-mystic-gold/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2 border-2 border-mystic-gold/40 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute inset-6 border border-dashed border-violet-500/60 rounded-full animate-[spin_6s_linear_infinite]" />
          <Sparkles className="h-10 w-10 text-mystic-gold glow-gold animate-pulse" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-mystic-gold mb-2 tracking-widest uppercase">
          Aligning Cosmic Vibrations
        </h3>
        <p className="text-violet-300 text-sm max-w-sm animate-pulse">
          Decrypting your Pythagorean frequencies from name and date of birth...
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel w-full max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl border border-mystic-gold/15 relative overflow-hidden animate-fade-in-up">
      {/* Decorative starry glowing background element inside the card */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-mystic-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="text-center mb-8">
        <span className="text-xs tracking-[0.3em] text-mystic-gold uppercase font-bold bg-mystic-gold/10 px-3 py-1 rounded-full border border-mystic-gold/20">
          Personal Numerology Report
        </span>
        <h2 className="font-serif text-3xl font-bold mt-4 text-white tracking-wide">
          Unveil Your Cosmic Blueprint
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Enter your birth name and birth date to discover your personality traits, life purpose, and path.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. John"
              className={`w-full bg-mystic-dark/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.firstName 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-mystic-gold focus:ring-mystic-gold/20'
              }`}
            />
            {errors.firstName && (
              <span className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Middle Name <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="e.g. Alan"
              className={`w-full bg-mystic-dark/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.middleName 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-mystic-gold focus:ring-mystic-gold/20'
              }`}
            />
            {errors.middleName && (
              <span className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                {errors.middleName}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Doe"
              className={`w-full bg-mystic-dark/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.lastName 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-mystic-gold focus:ring-mystic-gold/20'
              }`}
            />
            {errors.lastName && (
              <span className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full bg-mystic-dark/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.dob 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-mystic-gold focus:ring-mystic-gold/20'
              }`}
            />
            {errors.dob && (
              <span className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                {errors.dob}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john.doe@example.com"
              className={`w-full bg-mystic-dark/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-mystic-gold focus:ring-mystic-gold/20'
              }`}
            />
            {errors.email && (
              <span className="flex items-center gap-1 text-xs text-red-400 mt-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-mystic-dark font-semibold text-base py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] border-t border-amber-300"
          >
            <Sparkles className="h-5 w-5 fill-mystic-dark" />
            Reveal Cosmic Destiny
          </button>
        </div>
      </form>
    </div>
  );
}
