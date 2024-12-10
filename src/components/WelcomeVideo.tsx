import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useStore } from '../context/StoreContext';
import { X } from 'lucide-react';

export const WelcomeVideo: React.FC = () => {
  const { settings } = useStore();
  const [isVisible, setIsVisible] = useState(true);

  if (!settings.welcomeVideo.enabled || !settings.welcomeVideo.url || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <ReactPlayer
          url={settings.welcomeVideo.url}
          playing={true}
          width="100%"
          height="100%"
          onEnded={() => setIsVisible(false)}
        />
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};