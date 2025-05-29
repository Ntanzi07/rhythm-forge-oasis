
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import MusicPlayer from '@/components/MusicPlayer';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users from auth page back to home
  useEffect(() => {
    if (!loading && user && window.location.pathname === '/auth') {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20"> {/* Add padding to account for fixed header */}
        <HeroSection />
        <FeaturedSection />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Index;
