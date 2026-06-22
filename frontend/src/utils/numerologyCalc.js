/**
 * Pythagorean Letter Mapping:
 * 1: A, J, S
 * 2: B, K, T
 * 3: C, L, U
 * 4: D, M, V
 * 5: E, N, W
 * 6: F, O, X
 * 7: G, P, Y
 * 8: H, Q, Z
 * 9: I, R
 */
const PYTHAGOREAN_MAP = {
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

/**
 * Reduces any number to a single digit (1-9) or a Master Number (11, 22, 33).
 * @param {number} num 
 * @returns {number}
 */
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

/**
 * Calculates the Life Path Number from a date string (YYYY-MM-DD or DD/MM/YYYY).
 * Splits into Month, Day, and Year, reduces each first, then sums and reduces the sum.
 * @param {string} dob - Format 'YYYY-MM-DD'
 * @returns {number}
 */
export function calculateLifePath(dob) {
  if (!dob) return 0;
  
  // Parse date parts
  // Input could be YYYY-MM-DD from HTML date picker
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

/**
 * Helper to sanitize name (lowercase, removing non-alphabetic characters).
 * @param {string} name 
 * @returns {string}
 */
function sanitizeName(name) {
  return name ? name.toLowerCase().replace(/[^a-z]/g, '') : '';
}

/**
 * Calculates the Destiny (Expression) Number.
 * Sums the Pythagorean values of all letters in the full name, then reduces.
 * @param {string} fullName 
 * @returns {number}
 */
export function calculateDestiny(fullName) {
  const sanitized = sanitizeName(fullName);
  if (!sanitized) return 0;

  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    sum += PYTHAGOREAN_MAP[char] || 0;
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculates the Soul Urge (Heart's Desire) Number.
 * Sums the Pythagorean values of only vowels (A, E, I, O, U), then reduces.
 * @param {string} fullName 
 * @returns {number}
 */
export function calculateSoulUrge(fullName) {
  const sanitized = sanitizeName(fullName);
  if (!sanitized) return 0;

  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    if (VOWELS.has(char)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  return reduceToSingleDigit(sum);
}

/**
 * Calculates the Personality Number.
 * Sums the Pythagorean values of only consonants, then reduces.
 * @param {string} fullName 
 * @returns {number}
 */
export function calculatePersonality(fullName) {
  const sanitized = sanitizeName(fullName);
  if (!sanitized) return 0;

  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    if (!VOWELS.has(char)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  return reduceToSingleDigit(sum);
}
