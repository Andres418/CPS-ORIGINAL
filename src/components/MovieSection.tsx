import React from 'react';
import { useMovies } from '../context/MovieContext';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const MovieSection: React.FC = () => {
  const { movieSection } = useMovies();

  const MovieGrid = ({ title, movies, isCarousel = false }: { 
    title: string; 
    movies: typeof movieSection.newReleases;
    isCarousel?: boolean;
  }) => {
    const MovieCard = ({ movie }: { movie: typeof movies[0] }) => (
      <div className="group relative overflow-hidden rounded-lg shadow-lg">
        <div className={`relative ${isCarousel ? 'h-[480px]' : 'h-64'} transform transition-transform duration-300 group-hover:scale-110`}>
          <img
            src={movie.image}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
              <p className="text-sm line-clamp-2 mb-2">{movie.description}</p>
              <a
                href={movie.watchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Play size={16} />
                Ver Ahora
              </a>
            </div>
          </div>
        </div>
        {movie.isNew && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full">
            NUEVO
          </div>
        )}
      </div>
    );

    return (
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        {isCarousel ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="relative group"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
            <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={24} />
            </button>
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MovieGrid title="Nuevos Lanzamientos" movies={movieSection.newReleases} />
        <MovieGrid title="Top 10 Películas" movies={movieSection.topMovies} isCarousel={true} />
      </div>
    </section>
  );
};