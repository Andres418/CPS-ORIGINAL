import React from 'react';
import { useStore } from '../context/StoreContext';
import { Play } from 'lucide-react';
import ReactPlayer from 'react-player';

export const TutorialSection: React.FC = () => {
  const { settings } = useStore();

  if (!settings.tutorials || settings.tutorials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Tutoriales y Promociones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.tutorials.map((tutorial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative aspect-video">
                <ReactPlayer
                  url={tutorial.url}
                  width="100%"
                  height="100%"
                  light={true}
                  playIcon={
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  }
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                <p className="text-gray-600">{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};