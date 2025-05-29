
import React from 'react';
import MusicCard from './MusicCard';

const FeaturedSection = () => {
  const featuredTracks = [
    {
      title: "Midnight Vibes",
      artist: "Luna Eclipse",
      imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=center",
      duration: "3:24"
    },
    {
      title: "Digital Dreams",
      artist: "Cyber Pulse",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop&crop=center",
      duration: "4:12"
    },
    {
      title: "Ocean Waves",
      artist: "Coastal Sound",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop&crop=center",
      duration: "2:58"
    },
    {
      title: "Urban Nights",
      artist: "Street Harmony",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop&crop=center",
      duration: "3:45"
    }
  ];

  const newReleases = [
    {
      title: "Solar Flare",
      artist: "Cosmic Rays",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop&crop=center",
      duration: "4:33"
    },
    {
      title: "Neon Glow",
      artist: "Future Bass",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop&crop=center",
      duration: "3:21"
    },
    {
      title: "Morning Light",
      artist: "Dawn Chorus",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=center",
      duration: "5:07"
    },
    {
      title: "Electric Soul",
      artist: "Voltage",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=300&fit=crop&crop=center",
      duration: "3:52"
    }
  ];

  return (
    <div className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Featured Tracks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured This Week</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTracks.map((track, index) => (
              <MusicCard
                key={index}
                title={track.title}
                artist={track.artist}
                imageUrl={track.imageUrl}
                duration={track.duration}
              />
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">New Releases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map((track, index) => (
              <MusicCard
                key={index}
                title={track.title}
                artist={track.artist}
                imageUrl={track.imageUrl}
                duration={track.duration}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturedSection;
