import { 
  reduceToSingleDigit, 
  calculateLifePath, 
  calculateDestiny, 
  calculateSoulUrge, 
  calculatePersonality 
} from './src/utils/numerologyCalc.js';

console.log("=== Testing Numerology Calculations ===");

// Test reduceToSingleDigit
const testReductions = [
  { input: 20, expected: 2 },
  { input: 14, expected: 5 },
  { input: 11, expected: 11 }, // Master Number
  { input: 22, expected: 22 }, // Master Number
  { input: 33, expected: 33 }, // Master Number
  { input: 29, expected: 11 }, // Reduces to 11 and stops
  { input: 38, expected: 11 }  // Reduces to 11 and stops
];

console.log("\n--- Testing Reduction Rule ---");
testReductions.forEach(test => {
  const result = reduceToSingleDigit(test.input);
  const passed = result === test.expected;
  console.log(`Input: ${test.input} | Expected: ${test.expected} | Got: ${result} | ${passed ? '✅ PASS' : '❌ FAIL'}`);
});

// Test Example cases
console.log("\n--- Testing Document Examples ---");

// Example 1: Born Oct 12, 1990 -> 1990-10-12
const lifePathResult = calculateLifePath("1990-10-12");
const lpPassed = lifePathResult === 5;
console.log(`Life Path (1990-10-12) | Expected: 5 | Got: ${lifePathResult} | ${lpPassed ? '✅ PASS' : '❌ FAIL'}`);

// Example 2: Name "JOHN"
const destinyResult = calculateDestiny("JOHN");
const destPassed = destinyResult === 2;
console.log(`Destiny (JOHN) | Expected: 2 | Got: ${destinyResult} | ${destPassed ? '✅ PASS' : '❌ FAIL'}`);


const soulUrgeResult = calculateSoulUrge("JOHN");
const suPassed = soulUrgeResult === 6;
console.log(`Soul Urge (JOHN) | Expected: 6 | Got: ${soulUrgeResult} | ${suPassed ? '✅ PASS' : '❌ FAIL'}`);

const personalityResult = calculatePersonality("JOHN");
const pPassed = personalityResult === 5;
console.log(`Personality (JOHN) | Expected: 5 | Got: ${personalityResult} | ${pPassed ? '✅ PASS' : '❌ FAIL'}`);

console.log("\n=== Testing Complete ===");
