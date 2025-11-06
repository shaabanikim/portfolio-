import React, { useState } from 'react';
import type { Portfolio, Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { Section } from './ui/Section';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface EditPaneProps {
  portfolio: Portfolio;
  setPortfolio: React.Dispatch<React.SetStateAction<Portfolio>>;
}

export const EditPane: React.FC<EditPaneProps> = ({ portfolio, setPortfolio }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPortfolio(prev => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPortfolio(prev => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  const handleAddNewProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };
  
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  }

  const handleDeleteProject = (projectId: string) => {
      if(window.confirm('Are you sure you want to delete this project?')) {
        setPortfolio(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== projectId)
        }));
      }
  }

  const handleSaveProject = (project: Project) => {
    setPortfolio(prev => {
        const existing = prev.projects.find(p => p.id === project.id);
        if(existing) {
            return {
                ...prev,
                projects: prev.projects.map(p => p.id === project.id ? project : p)
            }
        }
        return {
            ...prev,
            projects: [...prev.projects, project]
        }
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <Section title="Profile">
        <div className="space-y-4">
          <Input label="Name" name="name" value={portfolio.profile.name} onChange={handleProfileChange} />
          <Input label="Title" name="title" value={portfolio.profile.title} onChange={handleProfileChange} />
          <Textarea label="Biography" name="bio" value={portfolio.profile.bio} onChange={handleProfileChange} rows={5} />
          <Input label="Profile Image URL" name="profileImage" value={portfolio.profile.profileImage} onChange={handleProfileChange} />
        </div>
      </Section>
      
      <Section title="Projects">
        <div className="space-y-4">
          {portfolio.projects.map(project => (
            <div key={project.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center">
                <p className="font-medium truncate">{project.title}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleEditProject(project)} className="p-1 text-gray-500 hover:text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button onClick={() => handleDeleteProject(project.id)} className="p-1 text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                </div>
            </div>
          ))}
          <Button onClick={handleAddNewProject} fullWidth>Add New Project</Button>
        </div>
      </Section>

      <Section title="Contact Information">
        <div className="space-y-4">
          <Input label="Email" name="email" type="email" value={portfolio.contact.email} onChange={handleContactChange} />
          <Input label="Phone" name="phone" type="tel" value={portfolio.contact.phone} onChange={handleContactChange} />
          <Input label="Website" name="website" type="url" value={portfolio.contact.website} onChange={handleContactChange} />
          <Input label="Instagram Handle" name="instagram" type="text" value={portfolio.contact.instagram} onChange={handleContactChange} placeholder="your_handle"/>
        </div>
      </Section>

      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};