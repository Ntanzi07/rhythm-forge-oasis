
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <FeaturedSection />
      <MusicPlayer />
    </div>
  );
};

export default Index;
