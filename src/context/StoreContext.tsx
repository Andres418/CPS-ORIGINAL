import React, { createContext, useContext } from 'react';
import { StoreSettings, SocialLink, Tutorial } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface StoreContextType {
  settings: StoreSettings;
  updateSettings: (settings: StoreSettings) => void;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (link: SocialLink) => void;
  deleteSocialLink: (id: number) => void;
}

const initialSettings: StoreSettings = {
  isOpen: true,
  welcomeVideo: {
    url: '',
    enabled: false
  },
  businessHours: {
    start: '09:00',
    end: '22:00'
  },
  socialLinks: [],
  tutorials: []
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<StoreSettings>('storeSettings', initialSettings);

  const updateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
  };

  const addSocialLink = (link: Omit<SocialLink, 'id'>) => {
    const newLink = {
      ...link,
      id: Math.max(0, ...settings.socialLinks.map(l => l.id)) + 1
    };
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, newLink]
    });
  };

  const updateSocialLink = (updatedLink: SocialLink) => {
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.map(link =>
        link.id === updatedLink.id ? updatedLink : link
      )
    });
  };

  const deleteSocialLink = (id: number) => {
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.filter(link => link.id !== id)
    });
  };

  return (
    <StoreContext.Provider value={{
      settings,
      updateSettings,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};