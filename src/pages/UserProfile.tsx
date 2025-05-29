
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import UserTracks from '@/components/UserTracks';
import { User, Music, Settings } from 'lucide-react';

const UserProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch user tracks
  const { data: tracks, isLoading: tracksLoading } = useQuery({
    queryKey: ['userTracks', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  const userInitials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.[0].toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-6xl mx-auto p-6 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">
                  {profile?.full_name || 'User'}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  @{profile?.username || user.email?.split('@')[0]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-300">
                  <p className="text-sm text-gray-500 mb-2">Bio</p>
                  <p>{profile?.bio || 'No bio available'}</p>
                </div>
                <div className="text-gray-300">
                  <p className="text-sm text-gray-500 mb-2">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Music className="w-4 h-4" />
                  <span>{tracks?.length || 0} tracks uploaded</span>
                </div>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Tracks */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  My Music
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your uploaded tracks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserTracks tracks={tracks || []} isLoading={tracksLoading} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
