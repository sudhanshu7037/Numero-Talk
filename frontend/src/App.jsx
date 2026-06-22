import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ReportDisplay from './components/ReportDisplay';
import HistoryList from './components/HistoryList';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Auth from './components/Auth';
import NameCorrection from './components/NameCorrection';
import MobileNumerology from './components/MobileNumerology';
import { 
  calculateLifePath, 
  calculateDestiny, 
  calculateSoulUrge, 
  calculatePersonality 
} from './utils/numerologyCalc';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [prefilledDob, setPrefilledDob] = useState('');

  // Session State — initialize from localStorage so refresh doesn't log out user
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('numerotalk_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [token, setToken] = useState(localStorage.getItem('numerotalk_token') || null);
  const [loading, setLoading] = useState(false); // No blocking loading screen on refresh

  // Fetch session & history when token changes
  useEffect(() => {
    if (token) {
      // Silently validate token in the background — do NOT block UI
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.status === 401) {
          // Token is invalid or expired — force logout
          localStorage.removeItem('numerotalk_token');
          localStorage.removeItem('numerotalk_user');
          setToken(null);
          setUser(null);
          return null;
        }
        if (!res.ok) throw new Error('Network/server error');
        return res.json();
      })
      .then(data => {
        if (data) {
          // Refresh user info from server and keep localStorage in sync
          setUser(data.user);
          localStorage.setItem('numerotalk_user', JSON.stringify(data.user));
        }
      })
      .catch(() => {
        // Network error / backend down — keep existing cached user, do NOT logout
        console.warn('Could not reach server to validate token. Using cached session.');
      });

      // Fetch user's report history from MongoDB
      fetch(`${API_BASE_URL}/reports`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        const formattedHistory = data.reports.map(r => ({
          id: r._id,
          timestamp: r.timestamp,
          firstName: r.firstName,
          middleName: r.middleName,
          lastName: r.lastName,
          dob: r.dob,
          email: r.email,
          mobileNumber: r.mobileNumber || '',
          calculations: r.calculations
        }));
        setHistory(formattedHistory);
      })
      .catch(err => {
        console.error("Failed to load reports from backend:", err);
      });

    } else {
      setUser(null);
      // Load history from localStorage for guests
      try {
        const savedHistory = localStorage.getItem('numerotalk_history');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error("Failed to load history from localStorage:", err);
      }
    }
  }, [token]);

  const handleGenerateReport = async (formData) => {
    const { firstName, middleName, lastName, dob, email, mobileNumber } = formData;
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

    const lifePath = calculateLifePath(dob);
    const destiny = calculateDestiny(fullName);
    const soulUrge = calculateSoulUrge(fullName);
    const personality = calculatePersonality(fullName);

    const calculations = {
      lifePath,
      destiny,
      soulUrge,
      personality
    };

    const newReport = {
      firstName,
      middleName,
      lastName,
      dob,
      email,
      mobileNumber: mobileNumber || '',
      calculations
    };

    if (token) {
      // Save report in MongoDB
      try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newReport)
        });
        const data = await response.json();
        if (response.ok && data.success) {
          const savedReport = {
            id: data.report._id,
            timestamp: data.report.timestamp,
            firstName: data.report.firstName,
            middleName: data.report.middleName,
            lastName: data.report.lastName,
            dob: data.report.dob,
            email: data.report.email,
            mobileNumber: data.report.mobileNumber || '',
            calculations: data.report.calculations
          };
          setHistory(prev => [savedReport, ...prev]);
          setActiveReport(savedReport);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error("Failed to save report to MongoDB:", err);
        // Fallback locally
        const fallbackReport = { id: Date.now().toString(), timestamp: Date.now(), ...newReport };
        setActiveReport(fallbackReport);
      }
    } else {
      // Save report in LocalStorage for guest users
      const guestReport = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...newReport
      };
      const updatedHistory = [guestReport, ...history];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('numerotalk_history', JSON.stringify(updatedHistory));
      } catch (err) {
        console.error("Failed to save history to localStorage:", err);
      }
      setActiveReport(guestReport);
    }
    navigate('/calculator');
  };

  const handleLoadReport = (reportItem) => {
    setActiveReport(reportItem);
    navigate('/calculator');
  };

  const handleDeleteHistoryItem = async (id) => {
    if (token) {
      // Delete from MongoDB
      try {
        const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setHistory(prev => prev.filter(item => item.id !== id));
        }
      } catch (err) {
        console.error("Failed to delete report on backend:", err);
      }
    } else {
      // Delete from LocalStorage
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      try {
        localStorage.setItem('numerotalk_history', JSON.stringify(updatedHistory));
      } catch (err) {
        console.error("Failed to delete history item:", err);
      }
    }

    if (activeReport && activeReport.id === id) {
      setActiveReport(null);
    }
  };

  const handleBackToForm = () => {
    setActiveReport(null);
  };

  const handleBeginWithDob = (dob) => {
    setPrefilledDob(dob);
    navigate('/calculator');
  };

  const handleAuthSuccess = (userData, userToken, mode) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('numerotalk_user', JSON.stringify(userData));
    if (mode === 'register') {
      navigate('/');
    } else {
      navigate('/calculator');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('numerotalk_token');
    localStorage.removeItem('numerotalk_user');
    setToken(null);
    setUser(null);
    setHistory([]);
    navigate('/');
  };

  // No blocking loading screen — user is loaded instantly from localStorage

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ zIndex: 999999 }}
        toastStyle={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}
      />
    <div className="relative min-h-screen flex flex-col z-10">
      
      {/* Navigation Header */}
      <Header user={user} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-6 sm:px-12 md:px-16 py-8 sm:py-12 relative z-10 flex flex-col justify-center">
        <Routes>
          <Route path="/" element={<Home onBeginWithDob={handleBeginWithDob} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={
            <HistoryList
              history={history}
              onLoadReport={handleLoadReport}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onBackToForm={handleBackToForm}
            />
          } />
          <Route path="/signup" element={
            <Auth onAuthSuccess={handleAuthSuccess} onBackToHome={() => navigate('/')} />
          } />
          <Route path="/calculator" element={
            user ? (
              activeReport ? (
                <ReportDisplay 
                  reportData={activeReport} 
                  onBack={handleBackToForm} 
                />
              ) : (
                <InputForm onGenerate={handleGenerateReport} prefilledDob={prefilledDob} user={user} />
              )
            ) : (
              <Navigate to="/signup" replace />
            )
          } />
          <Route path="/name-correction" element={
            user ? <NameCorrection /> : <Navigate to="/signup" replace />
          } />
          <Route path="/mobile-numerology" element={
            user ? <MobileNumerology /> : <Navigate to="/signup" replace />
          } />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>

    {/* Global Floating WhatsApp Button - Bottom Right */}
    <a
      href="https://wa.me/919079175403"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
      style={{ zIndex: 999998 }}
      className="fixed bottom-6 right-6 bg-[#25d366] text-white p-3.5 rounded-full shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
    </>
  );
}
