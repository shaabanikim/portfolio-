import React, { useState } from 'react';
import type { Portfolio, Profile, Project, Contact, Resource } from '../types';
import { Section } from './ui/Section';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface EditPaneProps {
  portfolio: Portfolio;
  onPortfolioChange: (updatedPortfolio: Partial<Portfolio>) => void;
  onGenerateWithAI: (prompt: string) => void;
  isGenerating: boolean;
}

export const EditPane: React.FC<EditPaneProps> = ({ portfolio, onPortfolioChange, onGenerateWithAI, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleProfileChange = (field: keyof Profile, value: string) => {
    onPortfolioChange({ profile: { ...portfolio.profile, [field]: value } });
  };
  
  const handleContactChange = (field: keyof Contact, value: string) => {
    onPortfolioChange({ contact: { ...portfolio.contact, [field]: value } });
  };

  const handleProjectChange = (projectId: string, field: keyof Omit<Project, 'id' | 'images'>, value: string) => {
    const updatedProjects = portfolio.projects.map(p => 
      p.id === projectId ? { ...p, [field]: value } : p
    );
    onPortfolioChange({ projects: updatedProjects });
  };
  
  const handleResourceChange = (resourceId: string, field: keyof Omit<Resource, 'id'>, value: string) => {
    const updatedResources = portfolio.resources.map(r =>
      r.id === resourceId ? { ...r, [field]: value } : r
    );
    onPortfolioChange({ resources: updatedResources });
  };

  const addResource = () => {
    const newResource: Resource = {
      id: `res${Date.now()}`,
      title: 'New Resource Title',
      description: 'A brief description of the resource.',
      fileUrl: '#',
    };
    onPortfolioChange({ resources: [...(portfolio.resources || []), newResource] });
  };
  
  const removeResource = (resourceId: string) => {
    const updatedResources = portfolio.resources.filter(r => r.id !== resourceId);
    onPortfolioChange({ resources: updatedResources });
  };

  const handleAIButtonClick = () => {
    if (prompt.trim()) {
      onGenerateWithAI(prompt);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
      <div className="space-y-6">
        <Section title="AI Assistant">
          <div className="space-y-2">
            <Textarea
              label="Describe the changes you want to make"
              placeholder="e.g., 'Make the tone more professional', 'Rewrite the bio for a senior architect', 'Change the project descriptions to be more concise'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              disabled={isGenerating}
            />
            <Button onClick={handleAIButtonClick} disabled={isGenerating || !prompt.trim()} fullWidth>
              {isGenerating ? 'Generating...' : 'Update with AI'}
            </Button>
          </div>
        </Section>
        
        <Section title="Profile">
          <div className="space-y-4">
            <Input label="Name" value={portfolio.profile.name} onChange={e => handleProfileChange('name', e.target.value)} />
            <Input label="Title" value={portfolio.profile.title} onChange={e => handleProfileChange('title', e.target.value)} />
            <Textarea label="Bio" value={portfolio.profile.bio} onChange={e => handleProfileChange('bio', e.target.value)} rows={5} />
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-6">
            {portfolio.projects.map(project => (
              <div key={project.id} className="border p-4 rounded-md space-y-3">
                <Input label="Project Title" value={project.title} onChange={e => handleProjectChange(project.id, 'title', e.target.value)} />
                <Input label="Category" value={project.category} onChange={e => handleProjectChange(project.id, 'category', e.target.value)} />
                <Textarea label="Description" value={project.description} onChange={e => handleProjectChange(project.id, 'description', e.target.value)} rows={4} />
              </div>
            ))}
          </div>
        </Section>
        
        <Section title="Resources">
          <div className="space-y-6">
            {(portfolio.resources || []).map(resource => (
              <div key={resource.id} className="border p-4 rounded-md space-y-3 relative">
                <button
                    onClick={() => removeResource(resource.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Remove resource"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                <Input label="Resource Title" value={resource.title} onChange={e => handleResourceChange(resource.id, 'title', e.target.value)} />
                <Textarea label="Description" value={resource.description} onChange={e => handleResourceChange(resource.id, 'description', e.target.value)} rows={2} />
                <Input label="File URL" placeholder="e.g., /downloads/guide.pdf" value={resource.fileUrl} onChange={e => handleResourceChange(resource.id, 'fileUrl', e.target.value)} />
              </div>
            ))}
          </div>
          <Button onClick={addResource} variant="secondary" className="mt-4">
            + Add Resource
          </Button>
        </Section>

        <Section title="Contact Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" value={portfolio.contact.email} onChange={e => handleContactChange('email', e.target.value)} />
            <Input label="Phone" type="tel" value={portfolio.contact.phone} onChange={e => handleContactChange('phone', e.target.value)} />
            <Input label="Website" type="url" value={portfolio.contact.website} onChange={e => handleContactChange('website', e.target.value)} />
            <Input label="Instagram" value={portfolio.contact.instagram} onChange={e => handleContactChange('instagram', e.target.value)} />
          </div>
        </Section>
      </div>
    </div>
  );
};
