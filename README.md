# Aetheria | Cosmic Pythagorean Numerology Calculator

Aetheria is an interactive, premium, and visually stunning web application designed to compute and present Western (Pythagorean) Numerology reports based on name and date of birth variables. Built with Vite, React, and Tailwind CSS v4, it features client-side PDF export, a reading history dashboard, and rich, spiritual/psychological interpretations.

---

## 🌌 Features

1. **Intuitive Input Form**: Input fields with validations preventing future date selections, invalid characters, or incorrect emails.
2. **Pythagorean Calculation Engine**: Robust calculations with correct digit reductions and Master Number exemptions (11, 22, 33).
3. **Interactive Cosmic Dashboard**: Beautiful radial energy gauges and tab-based card selections detailing Life Path, Destiny, Soul Urge, and Personality traits.
4. **Reading History**: Seamless synchronization with the browser's `localStorage` to save, view, and delete past numerological reports.
5. **Instant PDF Exports**: Client-side document assembly using `html2pdf.js`, styled like a high-end mystical manual.
6. **Social & Email Sharing**: Options to copy a direct sharing link or dispatch mock emails to client accounts.

---

## 🧮 Core Calculations & Algorithms

Pythagorean numerology maps every letter in the alphabet to a digit from 1 to 9:
- **1**: A, J, S
- **2**: B, K, T
- **3**: C, L, U
- **4**: D, M, V
- **5**: E, N, W
- **6**: F, O, X
- **7**: G, P, Y
- **8**: H, Q, Z
- **9**: I, R

### 1. Digit Reduction Rule
Numbers are reduced by adding their component digits until they reach a single digit (1–9). However, if at any stage of calculation you reach **11, 22, or 33**, do not reduce further (as these are Master Numbers).

### 2. Formulas
- **Life Path Number**: Month, Day, and Year of birth are reduced separately to single digits/Master Numbers first. These three values are summed and reduced again to a final single digit/Master Number.
- **Destiny (Expression) Number**: Converts all letters of the birth name into numbers, sums them, and reduces the sum to a single digit/Master Number.
- **Soul Urge Number**: Sums and reduces the values of only the name's vowels (`A, E, I, O, U`).
- **Personality Number**: Sums and reduces the values of only the name's consonants.

---

## 🛠️ Technical Stack & Dependencies

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin and `@import` layout declarations)
- **Icons**: Lucide React
- **Export Library**: html2pdf.js

---

## 🚀 Getting Started

### 1. Install Dependencies
Run this in the root folder:
```bash
npm install
```

### 2. Run Local Development Server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Verify Calculations (Node.js Test Runner)
Run the script to verify Pythagorean algorithms:
```bash
node test-calculations.js
```

### 4. Build for Production
Build the compiled assets into `/dist`:
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```
