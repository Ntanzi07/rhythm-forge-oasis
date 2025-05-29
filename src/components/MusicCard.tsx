
import React from 'react';
import { Play } from 'lucide-react';

interface MusicCardProps {
  title: string;
  artist: string;
  imageUrl: string;
  duration?: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, artist, imageUrl, duration }) => {
  return (
    <div className="music-card group relative">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img 
          src={imageUrl} 
          alt={`${title} cover`}
          className="w-full aspect-square object-cover transition-transform duration-200 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
      <h3 className="font-semibold text-white truncate">{title}</h3>
      <p className="text-gray-400 text-sm truncate">{artist}</p>
      {duration && <p className="text-gray-500 text-xs mt-1">{duration}</p>}
    </div>
  );
};

export default MusicCard;
