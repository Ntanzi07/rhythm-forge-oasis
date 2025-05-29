
import React from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold gradient-text">BeatHarbor</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Explore</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Genres</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Artists</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Plans</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search for songs, artists, or albums..." 
              className="bg-gray-800 border-gray-700 pl-10 text-white placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
