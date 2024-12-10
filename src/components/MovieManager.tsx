import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { Movie } from '../types';

export const MovieManager: React.FC = () => {
  const { movieSection, addMovie, updateMovie, deleteMovie } = useMovies();
  const [editingMovie, setEditingMovie] = useState<{ movie: Movie; section: 'newReleases' | 'topMovies' } | null>(null);
  const [isAddingMovie, setIsAddingMovie] = useState<'newReleases' | 'topMovies' | null>(null);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    description: '',
    image: '',
    watchLink: '',
    releaseDate: '',
    isNew: false
  });

  const handleSubmit = (e: React.FormEvent, section: 'newReleases' | 'topMovies') => {
    e.preventDefault();
    if (editingMovie) {
      updateMovie({ ...formData, id: editingMovie.movie.id }, section);
      setEditingMovie(null);
    } else {
      addMovie(formData, section);
    }
    setIsAddingMovie(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      watchLink: '',
      releaseDate: '',
      isNew: false
    });
    showSaveNotification();
  };

  const handleEdit = (movie: Movie, section: 'newReleases' | 'topMovies') => {
    setEditingMovie({ movie, section });
    setFormData(movie);
    setIsAddingMovie(section);
  };

  const showSaveNotification = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const MovieForm = ({ section }: { section: 'newReleases' | 'topMovies' }) => (
    <form onSubmit={(e) => handleSubmit(e, section)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Watch Link</label>
        <input
          type="url"
          value={formData.watchLink}
          onChange={(e) => setFormData({ ...formData, watchLink: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Release Date</label>
        <input
          type="date"
          value={formData.releaseDate}
          onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isNew}
          onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label className="ml-2 block text-sm text-gray-900">Mark as New Release</label>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {editingMovie ? 'Update Movie' : 'Add Movie'}
        </button>
        <button
          type="button"
          onClick={() => {
            setIsAddingMovie(null);
            setEditingMovie(null);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const MovieList = ({ section, title }: { section: 'newReleases' | 'topMovies'; title: string }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={() => setIsAddingMovie(section)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
        >
          <Plus size={20} />
          Add Movie
        </button>
      </div>
      {isAddingMovie === section && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <MovieForm section={section} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movieSection[section].map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-2">{movie.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{movie.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Release: {new Date(movie.releaseDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(movie, section)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      deleteMovie(movie.id, section);
                      showSaveNotification();
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Movie Manager</h2>
        <button
          onClick={showSaveNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      {showSaveConfirmation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Changes saved successfully!
        </div>
      )}

      <MovieList section="newReleases" title="New Releases" />
      <MovieList section="topMovies" title="Top 10 Movies" />
    </div>
  );
};