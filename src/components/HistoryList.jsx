import React from 'react';
import { Clock, Eye, Trash2, Calendar, Sparkles } from 'lucide-react';

export default function HistoryList({ history, onLoadReport, onDeleteHistoryItem, onBackToForm }) {
  const formatDOB = (dobStr) => {
    if (!dobStr) return '';
    const date = new Date(dobStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!history || history.length === 0) {
    return (
      <div className="glass-panel w-full max-w-2xl mx-auto p-12 rounded-3xl shadow-2xl border border-mystic-gold/10 text-center space-y-6 animate-fade-in-up">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-violet-300">
          <Clock className="h-8 w-8 text-mystic-gold opacity-50" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-white">No Cosmic Trails Yet</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            You haven't generated any numerology reports in this session yet. Your records will appear here.
          </p>
        </div>
        <div>
          <button
            onClick={onBackToForm}
            className="bg-mystic-gold text-mystic-dark hover:bg-mystic-gold-light px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Start First Reading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">Your Reading History</h2>
          <p className="text-xs text-gray-400">Stored locally in this browser.</p>
        </div>
        <span className="text-xs font-bold text-mystic-gold bg-mystic-gold/10 px-3 py-1 rounded-full border border-mystic-gold/20">
          {history.length} Saved {history.length === 1 ? 'Reading' : 'Readings'}
        </span>
      </div>

      <div className="space-y-4">
        {history.map((item) => {
          const fullName = [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' ');
          return (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-mystic-gold/25 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-bold text-white leading-tight">
                    {fullName}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-violet-300" />
                    Born {formatDOB(item.dob)}
                  </span>
                  <span>•</span>
                  <span>Computed {formatDate(item.timestamp)}</span>
                </div>

                {/* Vibration quick badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-semibold bg-violet-950/40 text-violet-300 px-2 py-0.5 rounded border border-violet-800/20">
                    LP: {item.calculations.lifePath}
                  </span>
                  <span className="text-[10px] font-semibold bg-blue-950/40 text-blue-300 px-2 py-0.5 rounded border border-blue-900/20">
                    DEST: {item.calculations.destiny}
                  </span>
                  <span className="text-[10px] font-semibold bg-pink-950/40 text-pink-300 px-2 py-0.5 rounded border border-pink-900/20">
                    SOUL: {item.calculations.soulUrge}
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-950/40 text-amber-300 px-2 py-0.5 rounded border border-amber-900/20">
                    PERS: {item.calculations.personality}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <button
                  onClick={() => onLoadReport(item)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-mystic-gold/15 text-mystic-gold hover:bg-mystic-gold hover:text-mystic-dark border border-mystic-gold/20 transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Report
                </button>
                <button
                  onClick={() => onDeleteHistoryItem(item.id)}
                  className="flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  title="Delete Reading"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
