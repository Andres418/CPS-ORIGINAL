import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminLogin: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(code)) {
      setError('');
      setCode('');
    } else {
      setError('Invalid admin code');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <Lock className="h-8 w-8 text-gray-600" />
        <h2 className="text-2xl font-bold ml-2 text-gray-900">Admin Access</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Enter Admin Code
          </label>
          <input
            type="password"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter secret code"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};