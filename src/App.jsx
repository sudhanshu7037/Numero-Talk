import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ReportDisplay from './components/ReportDisplay';
import HistoryList from './components/HistoryList';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { 
  calculateLifePath, 
  calculateDestiny, 
  calculateSoulUrge, 
  calculatePersonality 
} from './utils/numerologyCalc';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'form', 'about', 'contact', or 'history'
  const [activeReport, setActiveReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [stars, setStars] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('aetheria_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error("Failed to load history from localStorage:", err);
    }

    // Generate random background stars
    const generatedStars = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`
    }));
    setStars(generatedStars);
  }, []);

  const handleGenerateReport = (formData) => {
    const { firstName, middleName, lastName, dob, email } = formData;
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

    const lifePath = calculateLifePath(dob);
    const destiny = calculateDestiny(fullName);
    const soulUrge = calculateSoulUrge(fullName);
    const personality = calculatePersonality(fullName);

    const newReport = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      firstName,
      middleName,
      lastName,
      dob,
      email,
      calculations: {
        lifePath,
        destiny,
        soulUrge,
        personality
      }
    };

    const updatedHistory = [newReport, ...history];
    setHistory(updatedHistory);
    try {
      localStorage.setItem('aetheria_history', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error("Failed to save history to localStorage:", err);
    }

    setActiveReport(newReport);
    setCurrentTab('form'); // remain on calculator view to render report
  };

  const handleLoadReport = (reportItem) => {
    setActiveReport(reportItem);
    setCurrentTab('form');
  };

  const handleDeleteHistoryItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    try {
      localStorage.setItem('aetheria_history', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
    // If deleted item was active, clear it
    if (activeReport && activeReport.id === id) {
      setActiveReport(null);
    }
  };

  const handleBackToForm = () => {
    setActiveReport(null);
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    // If shifting tabs to list of history, keep activeReport unchanged so they don't lose progress
  };

  return (
    <div className="relative min-h-screen flex flex-col z-10 select-none">
      {/* Background Starfield Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="twinkle-star bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--delay': star.delay
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <Header currentTab={currentTab} setCurrentTab={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 relative z-10 flex flex-col justify-center">
        {currentTab === 'home' ? (
          <Home setCurrentTab={handleTabChange} />
        ) : currentTab === 'about' ? (
          <About />
        ) : currentTab === 'contact' ? (
          <Contact />
        ) : currentTab === 'history' ? (
          <HistoryList
            history={history}
            onLoadReport={handleLoadReport}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onBackToForm={handleBackToForm}
          />
        ) : (
          /* Calculator View */
          activeReport ? (
            <ReportDisplay 
              reportData={activeReport} 
              onBack={handleBackToForm} 
            />
          ) : (
            <InputForm onGenerate={handleGenerateReport} />
          )
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
