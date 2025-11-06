import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Architect AI</h1>
          </div>
          <div className="text-sm text-gray-500">
            Powered by Gemini
          </div>
        </div>
      </div>
    </header>
  );
};
