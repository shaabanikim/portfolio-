import type { Portfolio } from './types';

export const PRESET_PORTFOLIO: Portfolio = {
  profile: {
    name: 'Ayub Shaban',
    title: 'Principal Architect & Urban Designer',
    bio: 'With over 15 years of experience, Ayub has led award-winning projects that blend sustainable practices with contemporary aesthetics. His work focuses on creating spaces that are not only visually striking but also deeply connected to their environment and community.',
    profileImage: 'https://picsum.photos/seed/ayubshaban/400/400',
  },
  projects: [
    {
      id: 'proj1',
      title: 'The Serenity House',
      category: 'Residential',
      description: 'A minimalist residential project that emphasizes natural light and materials. The design integrates the living space with the surrounding landscape, featuring large glass panels and a central courtyard that acts as the heart of the home.',
      images: [
        'https://picsum.photos/seed/project1a/800/600',
        'https://picsum.photos/seed/project1b/800/600',
        'https://picsum.photos/seed/project1c/800/600',
      ],
    },
    {
      id: 'proj2',
      title: 'Innovatech Corporate Campus',
      category: 'Commercial',
      description: 'A state-of-the-art corporate campus designed for collaboration and innovation. The building features flexible workspaces, green roofs, and advanced energy-efficient systems, reflecting the forward-thinking culture of the company it houses.',
      images: [
        'https://picsum.photos/seed/project2a/800/600',
        'https://picsum.photos/seed/project2b/800/600',
      ],
    },
  ],
  contact: {
    email: 'ayubshaaban040@gmail.com',
    phone: '+254707425282',
    website: 'www.ayubshaban.com',
    instagram: 'archneeds254',
  },
};