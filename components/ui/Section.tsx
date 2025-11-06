
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h2>
      {children}
    </section>
  );
};
