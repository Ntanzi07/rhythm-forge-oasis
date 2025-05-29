
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Discover Your Sound
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of artists and music lovers on BeatHarbor. Upload your tracks, discover new music, and connect with a global community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            Start Listening
          </Button>
          <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-900 hover:text-white text-lg px-8 py-3">
            Upload Your Music
          </Button>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-600 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-10 animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;
