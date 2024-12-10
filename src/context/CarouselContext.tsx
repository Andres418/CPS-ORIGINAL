import React, { createContext, useContext } from 'react';
import { CarouselImage } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialImages: CarouselImage[] = [
  {
    id: 1,
    url: 'https://static.toiimg.com/thumb/msid-110541570,width-1280,height-720,resizemode-4/110541570.jpg',
    alt: 'Streaming Entertainment',
  },
  {
    id: 2,
    url: 'https://static.toiimg.com/thumb/msid-110541570,width-1280,height-720,resizemode-4/110541570.jpg',
    alt: 'Estrenos',
  },
  {
    id: 3,
    url: '',
    alt: 'Movie Night',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200',
    alt: 'Anime Streaming',
  },
];

interface CarouselContextType {
  images: CarouselImage[];
  addImage: (image: Omit<CarouselImage, 'id'>) => void;
  updateImage: (image: CarouselImage) => void;
  deleteImage: (id: number) => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

export const CarouselProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useLocalStorage('carouselImages', initialImages);

  const addImage = (image: Omit<CarouselImage, 'id'>) => {
    const newImage = {
      ...image,
      id: Math.max(0, ...images.map((img) => img.id)) + 1,
    };
    setImages([...images, newImage]);
  };

  const updateImage = (updatedImage: CarouselImage) => {
    setImages(
      images.map((image) =>
        image.id === updatedImage.id ? updatedImage : image
      )
    );
  };

  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <CarouselContext.Provider
      value={{
        images,
        addImage,
        updateImage,
        deleteImage,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};
