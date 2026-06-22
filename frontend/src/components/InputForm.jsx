import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, AlertCircle } from 'lucide-react';

export default function InputForm({ onGenerate, prefilledDob, user }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: prefilledDob || '',
    email: '',
    mobileNumber: ''
  });

  useEffect(() => {
    if (user) {
      const nameParts = (user.name || '').trim().split(/\s+/);
      const computedFirstName = nameParts[0] || '';
      let computedMiddleName = '';
      let computedLastName = '';
      if (nameParts.length === 2) {
        computedLastName = nameParts[1];
      } else if (nameParts.length > 2) {
        computedMiddleName = nameParts.slice(1, -1).join(' ');
        computedLastName = nameParts[nameParts.length - 1];
      }
      setFormData({
        firstName: computedFirstName,
        middleName: computedMiddleName,
        lastName: computedLastName,
        dob: '',
        email: '',
        mobileNumber: ''
      });
    } else {
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: prefilledDob || '',
        email: '',
        mobileNumber: ''
      });
    }
  }, [user, prefilledDob]);

  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (!/^[A-Za-z\s\-']+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only letters.';
    }

    if (formData.middleName.trim() && !/^[A-Za-z\s\-']+$/.test(formData.middleName)) {
      newErrors.middleName = 'Middle name must contain only letters.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (!/^[A-Za-z\s\-']+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only letters.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required.';
    } else {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(selectedDate.getTime())) {
        newErrors.dob = 'Please enter a valid date.';
      } else if (selectedDate > today) {
        newErrors.dob = 'Birthdate cannot be in the future.';
      } else if (selectedDate.getFullYear() < 1900) {
        newErrors.dob = 'Please enter a birth year after 1900.';
      }
    }

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

    setTimeout(() => {
      setIsCalculating(false);
      onGenerate(formData);
    }, 1800);
  };

  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-amber-600/20 rounded-full animate-spin" />
          <Sparkles className="h-8 w-8 text-amber-600 animate-pulse" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-amber-700 mb-2 tracking-wide uppercase">
          Aligning Cosmic Vibrations
        </h3>
        <p className="text-gray-500 text-sm max-w-sm">
          Decrypting your Pythagorean frequencies from name and date of birth...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in-up text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Calculator (Form) */}
        <div className="lg:col-span-7 space-y-6 bg-white/50 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs tracking-wider text-amber-700 uppercase font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Personal Numerology Report
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-3 text-gray-900 tracking-wide">
              Cosmic Calculator
            </h2>
            <p className="text-gray-500 text-xs mt-1.5">
              Enter your details to generate your personalized analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. John"
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all ${
                    errors.firstName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-250 focus:border-amber-600 focus:ring-amber-600/10'
                  }`}
                />
                {errors.firstName && (
                  <span className="flex items-center gap-1 text-xs text-red-550 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                  Middle Name <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="e.g. Alan"
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all ${
                    errors.middleName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-250 focus:border-amber-600 focus:ring-amber-600/10'
                  }`}
                />
                {errors.middleName && (
                  <span className="flex items-center gap-1 text-xs text-red-555 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.middleName}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-655 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Doe"
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all ${
                    errors.lastName 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-250 focus:border-amber-600 focus:ring-amber-600/10'
                  }`}
                />
                {errors.lastName && (
                  <span className="flex items-center gap-1 text-xs text-red-550 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all ${
                    errors.dob 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-250 focus:border-amber-600 focus:ring-amber-600/10'
                  }`}
                />
                {errors.dob && (
                  <span className="flex items-center gap-1 text-xs text-red-555 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.dob}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-655 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john.doe@example.com"
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-250 focus:border-amber-600 focus:ring-amber-600/10'
                  }`}
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-xs text-red-555 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-2">
                  Mobile Number <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9898360504"
                  className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 transition-all focus:border-amber-600 focus:ring-amber-600/10"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm border border-amber-600"
              >
                <Sparkles className="h-5 w-5" />
                Reveal Cosmic Destiny
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Calculator related Heading and Content */}
        <div className="lg:col-span-5 space-y-6 lg:mt-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Metaphysical Science
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">
              Why Calculate Your Numerology?
            </h3>
            <p className="text-gray-650 text-sm leading-relaxed">
              Pythagorean Numerology is the study of the vibrational frequencies of numbers and letters. Every name and birth date holds a unique cosmic imprint that governs personality, life lessons, and soul desires.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h4 className="font-serif text-base font-bold text-gray-800">
              Your Report Will Reveal:
            </h4>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700 border border-amber-200">1</span>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Life Path Number</h5>
                  <p className="text-xs text-gray-500 mt-0.5">Calculated from your birthdate. It reveals your life's path, main purpose, and the challenges you will encounter.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700 border border-amber-200">2</span>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Destiny Number</h5>
                  <p className="text-xs text-gray-500 mt-0.5">Derived from your complete birth name. It outlines your natural talents, capabilities, and outward expression.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700 border border-amber-200">3</span>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Soul Urge Number</h5>
                  <p className="text-xs text-gray-500 mt-0.5">Drawn from the vowels of your birth name. It uncovers your hidden motivations, inner desires, and true self.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700 border border-amber-200">4</span>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Personality Number</h5>
                  <p className="text-xs text-gray-500 mt-0.5">Formed from the consonants of your name. It represents the outer persona and the first impression you make on others.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
