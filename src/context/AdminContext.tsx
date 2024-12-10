import React, { createContext, useContext } from 'react';
import { Product, DiscountSettings } from '../types';
import { products as initialProducts } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AdminContextType {
  isAdmin: boolean;
  products: Product[];
  discountSettings: DiscountSettings;
  login: (code: string) => boolean;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  updateDiscountSettings: (settings: DiscountSettings) => void;
  toggleProductDiscount: (productId: number, discountPrice?: number) => void;
}

const ADMIN_CODE = 'admin123';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const initialDiscountSettings: DiscountSettings = {
  minItems: 2,
  discountedProducts: []
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);
  const [products, setProducts] = useLocalStorage('products', initialProducts);
  const [discountSettings, setDiscountSettings] = useLocalStorage('discountSettings', initialDiscountSettings);

  const login = (code: string) => {
    if (code === ADMIN_CODE) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map(p => p.id)) + 1
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateDiscountSettings = (settings: DiscountSettings) => {
    setDiscountSettings(settings);
  };

  const toggleProductDiscount = (productId: number, discountPrice?: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          hasDiscount: !product.hasDiscount,
          discountPrice: discountPrice || product.price
        };
      }
      return product;
    }));

    setDiscountSettings(prev => {
      const isDiscounted = prev.discountedProducts.includes(productId);
      return {
        ...prev,
        discountedProducts: isDiscounted
          ? prev.discountedProducts.filter(id => id !== productId)
          : [...prev.discountedProducts, productId]
      };
    });
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      products,
      discountSettings,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      updateDiscountSettings,
      toggleProductDiscount
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};