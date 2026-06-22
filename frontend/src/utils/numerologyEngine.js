/**
 * Core Numerology Calculation Engine
 */

export const CHALDEAN_MAP = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

export const PYTHAGOREAN_MAP = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

// Reduces any number to a single digit (1-9) or a Master Number (11, 22, 33)
export function reduceToSingleDigit(num) {
  if (num === 0) return 0;
  while (num > 9) {
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Reduce strictly to a single digit (1-9), ignoring Master Numbers
export function reduceToStrictSingle(num) {
  if (num === 0) return 0;
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Calculates Moolank (Birth Number) from DOB day
export function calculateMoolank(dob) {
  if (!dob) return 0;
  const parts = dob.split('-');
  if (parts.length !== 3) return 0;
  const day = parseInt(parts[2], 10);
  if (isNaN(day)) return 0;
  return reduceToStrictSingle(day);
}

// Calculates Bhagyank (Life Path Number) from DOB
export function calculateBhagyank(dob) {
  if (!dob) return 0;
  const parts = dob.split('-');
  if (parts.length !== 3) return 0;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return 0;

  const reducedMonth = reduceToSingleDigit(month);
  const reducedDay = reduceToSingleDigit(day);
  const reducedYear = reduceToSingleDigit(year);

  const totalSum = reducedMonth + reducedDay + reducedYear;
  return reduceToSingleDigit(totalSum);
}

// Sanitize name
function sanitizeName(name) {
  return name ? name.toLowerCase().replace(/[^a-z]/g, '') : '';
}

// Generic name calculator based on map
export function calculateNameValue(name, map) {
  const sanitized = sanitizeName(name);
  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    sum += map[sanitized[i]] || 0;
  }
  return sum;
}

// Destiny/Expression Number
export function calculateDestiny(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const rawSum = calculateNameValue(fullName, map);
  return reduceToSingleDigit(rawSum);
}

// Soul Urge
export function calculateSoulUrge(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const sanitized = sanitizeName(fullName);
  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    if (VOWELS.has(char)) {
      sum += map[char] || 0;
    }
  }
  return reduceToSingleDigit(sum);
}

// Personality
export function calculatePersonality(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const sanitized = sanitizeName(fullName);
  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    if (!VOWELS.has(char)) {
      sum += map[char] || 0;
    }
  }
  return reduceToSingleDigit(sum);
}

// Suggestions for name correction to match target number
export function suggestNameCorrections(fullName, system = 'pythagorean', targetNumber) {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const currentSum = calculateNameValue(fullName, map);
  const currentReduced = reduceToStrictSingle(currentSum);
  
  if (currentReduced === targetNumber) {
    return []; // Already matching
  }

  const vowelList = ['a', 'e', 'i', 'o', 'u', 'y'];
  const suggestions = [];

  // Try adding/doubling vowels in name parts
  const nameParts = fullName.split(/\s+/);
  
  for (let pIdx = 0; pIdx < nameParts.length; pIdx++) {
    const part = nameParts[pIdx];
    // Find vowels in this part
    for (let cIdx = 0; cIdx < part.length; cIdx++) {
      const char = part[cIdx].toLowerCase();
      if (vowelList.includes(char)) {
        // Double this letter
        const correctedPart = part.substring(0, cIdx + 1) + char + part.substring(cIdx + 1);
        const tempParts = [...nameParts];
        tempParts[pIdx] = correctedPart;
        const proposedFullName = tempParts.join(' ');
        
        const proposedSum = calculateNameValue(proposedFullName, map);
        const proposedReduced = reduceToStrictSingle(proposedSum);
        
        if (proposedReduced === targetNumber) {
          suggestions.push({
            name: proposedFullName,
            original: fullName,
            change: `Double '${char}' in "${part}"`,
            sum: proposedSum,
            reduced: proposedReduced
          });
        }
      }
    }
  }

  // Fallback: Append a letter at the end if doubling doesn't yield results
  if (suggestions.length === 0) {
    for (const char of vowelList) {
      const proposedFullName = fullName + char.toUpperCase();
      const proposedSum = calculateNameValue(proposedFullName, map);
      const proposedReduced = reduceToStrictSingle(proposedSum);
      if (proposedReduced === targetNumber) {
        suggestions.push({
          name: proposedFullName,
          original: fullName,
          change: `Add '${char}' at the end of name`,
          sum: proposedSum,
          reduced: proposedReduced
        });
      }
    }
  }

  return suggestions.slice(0, 5); // Return top 5 suggestions
}

// Analyze Mobile Number
export function analyzeMobileNumber(mobileNumber) {
  const cleanNum = mobileNumber.replace(/[^0-9]/g, '');
  if (!cleanNum) return { sum: 0, reduced: 0, digitsCount: {} };
  
  const sum = cleanNum.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  const reduced = reduceToStrictSingle(sum);

  const digitsCount = {};
  for (const digit of cleanNum) {
    digitsCount[digit] = (digitsCount[digit] || 0) + 1;
  }

  return {
    sum,
    reduced,
    digitsCount,
    totalDigits: cleanNum.length
  };
}

// Check Mobile Compatibility with DOB Mulank & Bhagyank
export function checkMobileCompatibility(mobileReduced, moolank, bhagyank) {
  // Compatibility grid mapping (1-9)
  // Friendly: 1, Neutral: 0, Unfriendly: -1
  const compatibilityGrid = {
    1: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 1, 8: -1, 9: 1 },
    2: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 0, 7: 1, 8: -1, 9: -1 },
    3: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: -1, 7: 1, 8: 0, 9: 1 },
    4: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 1, 7: 1, 8: 0, 9: 0 },
    5: { 1: 1, 2: 0, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 0 },
    6: { 1: -1, 2: -1, 3: -1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 },
    7: { 1: 1, 2: 1, 3: 1, 4: 0, 5: 1, 6: 1, 7: 1, 8: 0, 9: 1 },
    8: { 1: -1, 2: -1, 3: 0, 4: 0, 5: 1, 6: 1, 7: 0, 8: 1, 9: -1 },
    9: { 1: 1, 2: -1, 3: 1, 4: 0, 5: 0, 6: 1, 7: 1, 8: -1, 9: 1 }
  };

  const moolankScore = compatibilityGrid[moolank]?.[mobileReduced] ?? 0;
  const bhagyankScore = compatibilityGrid[bhagyank]?.[mobileReduced] ?? 0;

  const totalScore = moolankScore + bhagyankScore;
  let status = 'Neutral';
  let percentage = 70;

  if (totalScore >= 2) {
    status = 'Highly Compatible';
    percentage = 95;
  } else if (totalScore === 1) {
    status = 'Compatible';
    percentage = 85;
  } else if (totalScore === 0) {
    status = 'Neutral';
    percentage = 68;
  } else if (totalScore === -1) {
    status = 'Unfriendly';
    percentage = 45;
  } else {
    status = 'Highly Incompatible / Need Change';
    percentage = 30;
  }

  return { status, percentage };
}
