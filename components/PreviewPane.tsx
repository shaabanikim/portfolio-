import React from 'react';
import type { Portfolio } from '../types';

export const PreviewPane: React.FC<{ portfolio: Portfolio }> = ({ portfolio }) => {
  const { profile, projects, contact } = portfolio;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-lg rounded-lg">
      {/* Profile Section */}
      <header className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
        <img src={profile.profileImage} alt={profile.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md" />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{profile.name}</h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mt-2">{profile.title}</h2>
          <p className="mt-4 text-gray-700 max-w-2xl">{profile.bio}</p>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Featured Work</h3>
        <div className="space-y-12">
          {projects.map(project => (
            <article key={project.id}>
              <h4 className="text-2xl font-semibold text-gray-800">{project.title}</h4>
              <p className="text-md text-gray-500 mb-4">{project.category}</p>
              <p className="text-gray-700 mb-6">{project.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="aspect-w-4 aspect-h-3">
                    <img src={image} alt={`${project.title} - view ${index + 1}`} className="rounded-lg object-cover w-full h-full shadow-sm" />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer className="mt-12 pt-8 border-t text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-gray-700">
          <a href={`mailto:${contact.email}`} className="hover:text-gray-900 transition-colors">{contact.email}</a>
          <span className="hidden sm:inline">·</span>
          <p>{contact.phone}</p>
          <span className="hidden sm:inline">·</span>
          <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">{contact.website}</a>
          {contact.instagram && (
            <>
              <span className="hidden sm:inline">·</span>
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                {contact.instagram}
              </a>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};