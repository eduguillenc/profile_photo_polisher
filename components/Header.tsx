
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">LinkedIn Polisher</h1>
            <p className="text-xs text-gray-500 font-medium">AI Profile Enhancement</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-500 italic">"First impressions last forever"</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
