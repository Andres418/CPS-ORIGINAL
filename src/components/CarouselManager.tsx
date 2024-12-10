import React, { useState } from 'react';
import { useCarousel } from '../context/CarouselContext';
import { CarouselImage } from '../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const CarouselManager: React.FC = () => {
  const { images, addImage, updateImage, deleteImage } = useCarousel();
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [formData, setFormData] = useState<Omit<CarouselImage, 'id'>>({
    url: '',
    alt: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingImage) {
      updateImage({ ...formData, id: editingImage.id });
      setEditingImage(null);
    } else {
      addImage(formData);
    }
    setIsAddingImage(false);
    setFormData({ url: '', alt: '' });
  };

  const handleEdit = (image: CarouselImage) => {
    setEditingImage(image);
    setFormData(image);
    setIsAddingImage(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Carousel Images</h2>
        <button
          onClick={() => setIsAddingImage(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {isAddingImage && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              {editingImage ? 'Update Image' : 'Add Image'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingImage(false);
                setEditingImage(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
              <button
                onClick={() => handleEdit(image)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <Edit2 size={20} className="text-gray-800" />
              </button>
              <button
                onClick={() => deleteImage(image.id)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};