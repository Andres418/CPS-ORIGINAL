import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useCarousel } from '../context/CarouselContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ImageCarousel: React.FC = () => {
  const { images } = useCarousel();

  return (
    <div className="w-full h-[400px] mb-8">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="w-full h-full relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-white text-4xl font-bold text-center px-4">
                  {image.alt}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};