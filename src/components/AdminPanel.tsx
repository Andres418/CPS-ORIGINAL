import React, { useState } from 'react';
import { Settings, Image, Film, Package2, Save } from 'lucide-react';
import { CarouselManager } from './CarouselManager';
import { MovieManager } from './MovieManager';
import { ProductManager } from './ProductManager';
import { useAdmin } from '../context/AdminContext';

export const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'products' | 'carousel' | 'movies' | null>(null);
  const { logout } = useAdmin();

  const AdminButton = ({ icon: Icon, label, section, active }: { 
    icon: typeof Settings, 
    label: string, 
    section: 'products' | 'carousel' | 'movies',
    active: boolean 
  }) => (
    <button
      onClick={() => setActiveSection(active ? null : section)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-black text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div className="flex flex-wrap gap-4">
            <AdminButton 
              icon={Package2} 
              label="Products" 
              section="products" 
              active={activeSection === 'products'} 
            />
            <AdminButton 
              icon={Image} 
              label="Carousel" 
              section="carousel" 
              active={activeSection === 'carousel'} 
            />
            <AdminButton 
              icon={Film} 
              label="Movies" 
              section="movies" 
              active={activeSection === 'movies'} 
            />
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="mt-8">
          {activeSection === 'products' && <ProductManager />}
          {activeSection === 'carousel' && <CarouselManager />}
          {activeSection === 'movies' && <MovieManager />}
        </div>
      </div>
    </div>
  );
};