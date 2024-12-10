import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  TikTok,
  Linkedin,
  Globe
} from 'lucide-react';

const iconMap: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: TikTok,
  linkedin: Linkedin,
  website: Globe
};

export const SocialLinks: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="flex justify-center space-x-4">
      {settings.socialLinks.map((link) => {
        const Icon = iconMap[link.icon.toLowerCase()] || Globe;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Icon size={24} />
          </a>
        );
      })}
    </div>
  );
};