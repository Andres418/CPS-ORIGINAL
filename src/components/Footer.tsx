import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';

export const Footer: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  return (
    <footer className="bg-black text-white mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Premium streaming services for your entertainment needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">support@cpsoriginal.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <p className="text-gray-400 cursor-pointer hover:text-gray-300">Terms of Service</p>
              <p className="text-gray-400 cursor-pointer hover:text-gray-300">Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} CPS ORIGINAL. All rights reserved.
            <button
              onClick={() => setShowAdmin(true)}
              className="ml-2 text-gray-400 hover:text-gray-300 opacity-30 hover:opacity-100 transition-opacity"
            >
              ·
            </button>
          </p>
        </div>
      </div>
      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <button
              onClick={() => setShowAdmin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <AdminLogin />
          </div>
        </div>
      )}
    </footer>
  );
};