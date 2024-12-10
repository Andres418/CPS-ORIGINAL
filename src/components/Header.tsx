import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Play } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Cart } from './Cart';

export const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Play className="h-8 w-8 text-red-500" />
            <span className="ml-2 font-bold text-xl tracking-wider">CPS ORIGINAL</span>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2"
            >
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-semibold text-black">Shopping Cart</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <Cart />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};