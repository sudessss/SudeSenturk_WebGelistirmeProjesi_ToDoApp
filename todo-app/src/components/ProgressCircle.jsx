import React from 'react';

const ProgressCircle = ({ percentage, title, completedCount, totalCount }) => {
  // SVG Hesaplamaları
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="lg:w-[35%] bg-white p-6 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center border border-white">
      <div className="relative w-28 h-28 flex items-center justify-center mb-3">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90" aria-label={`İlerleme: %${percentage}`}>
          <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
          <circle 
            cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            className="text-indigo-600 transition-all duration-1000 ease-out" 
            strokeLinecap="round" 
          />
        </svg>
        <span className="absolute text-xl font-black text-indigo-600 tabular-nums">%{percentage}</span>
      </div>
      <h2 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{title} Özeti</h2>
      <p className="text-sm font-extrabold text-gray-800">{completedCount} / {totalCount} Tamamlandı</p>
    </div>
  );
};

export default ProgressCircle;