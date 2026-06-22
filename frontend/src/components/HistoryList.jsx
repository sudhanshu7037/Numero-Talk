import React from 'react';
import { Clock, Eye, Trash2, Calendar } from 'lucide-react';

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
      <div className="w-full text-center space-y-6 animate-fade-in-up py-12">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
          <Clock className="h-8 w-8 opacity-75" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-bold text-gray-900">No Cosmic Trails Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            You haven't generated any numerology reports in this session yet. Your records will appear here.
          </p>
        </div>
        <div>
          <button
            onClick={onBackToForm}
            className="bg-amber-600 text-white hover:bg-amber-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            Start First Reading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex items-center justify-between text-left pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-3xl font-bold text-gray-900">Your Reading History</h2>
          <p className="text-xs text-gray-500">Stored locally in this browser.</p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-250">
          {history.length} Saved {history.length === 1 ? 'Reading' : 'Readings'}
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {history.map((item) => {
          const fullName = [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' ');
          return (
            <div
              key={item.id}
              className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
            >
              <div className="space-y-1 text-left flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-bold text-gray-900 leading-tight">
                    {fullName}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-550">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-amber-750" />
                    Born {formatDOB(item.dob)}
                  </span>
                  <span>•</span>
                  <span>Computed {formatDate(item.timestamp)}</span>
                </div>

                {/* Vibration quick badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-200 font-mono">
                    LP: {item.calculations.lifePath}
                  </span>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200 font-mono">
                    DEST: {item.calculations.destiny}
                  </span>
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded border border-rose-200 font-mono">
                    SOUL: {item.calculations.soulUrge}
                  </span>
                  <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded border border-teal-200 font-mono">
                    PERS: {item.calculations.personality}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 shrink-0">
                <button
                  onClick={() => onLoadReport(item)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 text-amber-755 hover:bg-amber-600 hover:text-white border border-amber-200 transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Report
                </button>
                <button
                  onClick={() => onDeleteHistoryItem(item.id)}
                  className="flex items-center justify-center p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-650 hover:text-white border border-red-200 transition-all cursor-pointer"
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
