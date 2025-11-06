import React from 'react';
import type { Portfolio, Project } from '../types';

interface PreviewPaneProps {
  portfolio: Portfolio;
  onProjectClick: (project: Project) => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ portfolio, onProjectClick }) => {
  const { profile, projects, contact, resources } = portfolio;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
      <div className="max-w-4xl mx-auto text-gray-800">
        {/* Profile Section */}
        <header className="text-center mb-12">
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
          />
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p className="text-xl text-gray-600 mt-1">{profile.title}</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500">{profile.bio}</p>
        </header>

        {/* Projects Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project.id} className="group cursor-pointer" onClick={() => onProjectClick(project)}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
                <p className="text-gray-500">{project.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Resources</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {(resources || []).map(resource => (
              <div key={resource.id} className="p-6 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <p className="text-gray-600 mt-1">{resource.description}</p>
                </div>
                <a
                  href={resource.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors whitespace-nowrap"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <footer className="text-center mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="flex justify-center items-center space-x-6 text-gray-600">
            <a href={`mailto:${contact.email}`} className="hover:text-gray-900">{contact.email}</a>
            <span>&bull;</span>
            <a href={`tel:${contact.phone}`} className="hover:text-gray-900">{contact.phone}</a>
            <span>&bull;</span>
            <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">{contact.website}</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
