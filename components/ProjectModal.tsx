import React, { useState, useCallback, useRef } from 'react';
import type { Project } from '../types';
import { generateDescription } from '../services/geminiService';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface ProjectModalProps {
  project: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onSave, onClose }) => {
  const [currentProject, setCurrentProject] = useState<Project>(
    project || {
      id: project?.id || `proj_${Date.now()}`,
      title: '',
      category: '',
      description: '',
      images: [],
    }
  );
  const [aiKeywords, setAiKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [images, setImages] = useState<string[]>(currentProject.images.length > 0 ? [...currentProject.images] : ['']);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  
  const handleAddImage = () => {
      setImages(prev => [...prev, '']);
  }
  
  const handleRemoveImage = (index: number) => {
      setImages(prev => prev.filter((_, i) => i !== index));
  }

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
      return;
    }
    const newImages = [...images];
    const draggedItemContent = newImages.splice(dragItem.current, 1)[0];
    newImages.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(newImages);
  };

  const handleGenerateDescription = useCallback(async () => {
    if (!aiKeywords) return;
    setIsGenerating(true);
    try {
      const description = await generateDescription(aiKeywords);
      setCurrentProject(prev => ({ ...prev, description }));
    } catch (error) {
      console.error(error);
      // You might want to show an error to the user here
    } finally {
      setIsGenerating(false);
    }
  }, [aiKeywords]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = images.map(url => url.trim()).filter(Boolean);
    onSave({ ...currentProject, images: finalImages });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start pt-16 pb-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">{project ? 'Edit Project' : 'Add New Project'}</h2>
            <div className="space-y-4">
              <Input label="Project Title" name="title" value={currentProject.title} onChange={handleChange} required />
              <Input label="Category" name="category" value={currentProject.category} onChange={handleChange} placeholder="e.g., Residential, Commercial" required />
              
              <div className="p-4 border rounded-md bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Description Generator</label>
                <div className="flex gap-2">
                    <Input 
                        name="aiKeywords" 
                        value={aiKeywords} 
                        onChange={(e) => setAiKeywords(e.target.value)} 
                        placeholder="e.g., minimalist, concrete, natural light"
                    />
                    <Button type="button" onClick={handleGenerateDescription} disabled={isGenerating || !aiKeywords}>
                        {isGenerating ? <LoadingSpinner /> : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-2.707 2.707a1 1 0 000 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414L8.414 4.586V3a1 1 0 00-1-1H5zM15 5a1 1 0 00-1 1v1.586l-2.707 2.707a1 1 0 000 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414L16.414 7.586V6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                            </svg>
                        )}
                        Generate
                    </Button>
                </div>
              </div>

              <Textarea label="Project Description" name="description" value={currentProject.description} onChange={handleChange} rows={6} required />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Images</label>
                <div className="space-y-2">
                    {images.map((url, index) => (
                        <div 
                            key={index} 
                            className="flex items-center gap-2 p-2 border rounded-md bg-white hover:bg-gray-50 transition-colors"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <span className="cursor-grab text-gray-400" title="Drag to reorder">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </span>
                             <img
                                src={url || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                                alt={`Preview ${index + 1}`}
                                className="w-16 h-12 bg-gray-100 rounded object-cover border"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/150/F0F0F0/808080?Text=Invalid';
                                }}
                            />
                            <Input 
                                name={`image-${index}`}
                                placeholder="https://example.com/image.jpg"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="flex-grow"
                            />
                            <Button type="button" variant="secondary" onClick={() => handleRemoveImage(index)} className="px-2 py-2 !shadow-none" aria-label="Remove Image">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </Button>
                        </div>
                    ))}
                </div>
                 <Button type="button" variant="secondary" onClick={handleAddImage} className="mt-2">
                    Add Image
                </Button>
              </div>

            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
};