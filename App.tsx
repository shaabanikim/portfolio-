import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { EditPane } from './components/EditPane';
import { PreviewPane } from './components/PreviewPane';
import { ProjectModal } from './components/ProjectModal';
import type { Portfolio, Project } from './types';
import { PRESET_PORTFOLIO } from './constants';
import { updatePortfolioWithAI } from './services/geminiService';

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio>(PRESET_PORTFOLIO);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePortfolioChange = useCallback((updatedPortfolio: Partial<Portfolio>) => {
    setPortfolio(prev => ({ ...prev, ...updatedPortfolio }));
  }, []);

  const handleGenerateWithAI = useCallback(async (prompt: string) => {
    setIsGenerating(true);
    try {
      const updatedPortfolio = await updatePortfolioWithAI(portfolio, prompt);
      setPortfolio(updatedPortfolio);
    } catch (error) {
      console.error("Failed to update portfolio with AI:", error);
      alert("An error occurred while using AI. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [portfolio]);

  const openProjectModal = (project: Project) => setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 overflow-hidden">
        <EditPane
          portfolio={portfolio}
          onPortfolioChange={handlePortfolioChange}
          onGenerateWithAI={handleGenerateWithAI}
          isGenerating={isGenerating}
        />
        <PreviewPane
          portfolio={portfolio}
          onProjectClick={openProjectModal}
        />
      </main>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
}

export default App;
