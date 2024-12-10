import React from 'react';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { CarouselProvider } from './context/CarouselContext';
import { MovieProvider } from './context/MovieContext';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { AdminPanel } from './components/AdminPanel';
import { ImageCarousel } from './components/ImageCarousel';
import { MovieSection } from './components/MovieSection';
import { Footer } from './components/Footer';
import { WelcomeVideo } from './components/WelcomeVideo';
import { TutorialSection } from './components/TutorialSection';
import { useAdmin } from './context/AdminContext';
import { useStore } from './context/StoreContext';

function MainContent() {
  const { isAdmin, products } = useAdmin();
  const { settings } = useStore();

  if (isAdmin) {
    return <AdminPanel />;
  }

  if (!settings.isOpen) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <ImageCarousel />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Horario de Atención
          </h2>
          <p className="text-lg text-gray-600">
            Servicio de lunes a sábado de {settings.businessHours.start} hasta las {settings.businessHours.end}
          </p>
        </div>
        <MovieSection />
        <TutorialSection />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <WelcomeVideo />
      <ImageCarousel />
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-gray-900">Premium Streaming Services</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <MovieSection />
      <TutorialSection />
    </main>
  );
}

function App() {
  return (
    <StoreProvider>
      <AdminProvider>
        <CartProvider>
          <CarouselProvider>
            <MovieProvider>
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <div className="flex-grow">
                  <MainContent />
                </div>
                <Footer />
              </div>
            </MovieProvider>
          </CarouselProvider>
        </CartProvider>
      </AdminProvider>
    </StoreProvider>
  );
}

export default App;