import React, { createContext, useContext } from 'react';
import { Movie, MovieSection } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MovieContextType {
  movieSection: MovieSection;
  addMovie: (movie: Omit<Movie, 'id'>, section: 'newReleases' | 'topMovies') => void;
  updateMovie: (movie: Movie, section: 'newReleases' | 'topMovies') => void;
  deleteMovie: (id: number, section: 'newReleases' | 'topMovies') => void;
}

const initialMovies: MovieSection = {
  newReleases: [],
  topMovies: []
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieSection, setMovieSection] = useLocalStorage<MovieSection>('movieSection', initialMovies);

  const addMovie = (movie: Omit<Movie, 'id'>, section: 'newReleases' | 'topMovies') => {
    const newMovie = {
      ...movie,
      id: Math.max(0, ...movieSection[section].map(m => m.id), ...movieSection[section === 'newReleases' ? 'topMovies' : 'newReleases'].map(m => m.id)) + 1
    };
    
    setMovieSection({
      ...movieSection,
      [section]: [...movieSection[section], newMovie]
    });
  };

  const updateMovie = (updatedMovie: Movie, section: 'newReleases' | 'topMovies') => {
    setMovieSection({
      ...movieSection,
      [section]: movieSection[section].map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    });
  };

  const deleteMovie = (id: number, section: 'newReleases' | 'topMovies') => {
    setMovieSection({
      ...movieSection,
      [section]: movieSection[section].filter(movie => movie.id !== id)
    });
  };

  return (
    <MovieContext.Provider value={{
      movieSection,
      addMovie,
      updateMovie,
      deleteMovie
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};