
import React from 'react';
import { Search, User, Upload, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-black border-b border-gray-900 px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-2xl font-bold gradient-text">BeatHarbor</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Explore</Link>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Genres</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Artists</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Plans</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input 
              placeholder="Search for songs, artists, or albums..." 
              className="bg-gray-900 border-gray-800 pl-10 text-white placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/upload">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-900">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-900"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-900">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
