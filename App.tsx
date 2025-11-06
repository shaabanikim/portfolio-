
import React, { useState } from 'react';
import { EditPane } from './components/EditPane';
import { PreviewPane } from './components/PreviewPane';
import { Header } from './components/Header';
import type { Portfolio } from './types';
import { PRESET_PORTFOLIO } from './constants';

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>(PRESET_PORTFOLIO);
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header isEditMode={isEditMode} onToggleMode={() => setIsEditMode(!isEditMode)} />
      <main className="flex flex-col md:flex-row">
        <div 
          className={`w-full md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white border-r border-gray-200 p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${isEditMode ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative top-16 md:top-0 h-[calc(100vh-4rem)] md:h-auto md:min-h-[calc(100vh-4rem)] z-20`}
        >
          <EditPane portfolio={portfolio} setPortfolio={setPortfolio} />
        </div>
        <div className="w-full p-4 md:p-8 mt-16 md:mt-0">
          <PreviewPane portfolio={portfolio} />
        </div>
      </main>
    </div>
  );
};

export default App;
