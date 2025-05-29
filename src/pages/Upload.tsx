
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload as UploadIcon, Music } from 'lucide-react';
import Header from '@/components/Header';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid audio file",
        variant: "destructive"
      });
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${user!.id}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload music",
        variant: "destructive"
      });
      return;
    }

    if (!audioFile) {
      toast({
        title: "Error",
        description: "Please select an audio file",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Upload audio file
      const audioPath = await uploadFile(audioFile, 'audio-files', 'tracks');
      
      // Upload cover art if provided
      let coverPath = null;
      if (coverFile) {
        coverPath = await uploadFile(coverFile, 'cover-art', 'covers');
      }

      // Get public URLs
      const { data: audioUrl } = supabase.storage
        .from('audio-files')
        .getPublicUrl(audioPath);

      const coverUrl = coverPath ? supabase.storage
        .from('cover-art')
        .getPublicUrl(coverPath).data : null;

      // Create track record
      const { error: insertError } = await supabase
        .from('tracks')
        .insert({
          user_id: user.id,
          title,
          artist_name: artistName,
          album: album || null,
          genre: genre || null,
          description: description || null,
          audio_url: audioUrl.publicUrl,
          cover_art_url: coverUrl?.publicUrl || null,
          file_size: audioFile.size
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Your track has been uploaded successfully!"
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload track",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <p className="text-white mb-4">Please sign in to upload music</p>
              <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-2xl mx-auto p-6 pt-24">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Music className="w-6 h-6" />
              Upload Your Music
            </CardTitle>
            <CardDescription className="text-gray-400">
              Share your music with the BeatHarbor community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-white">Track Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter track title"
                  />
                </div>
                <div>
                  <Label htmlFor="artist" className="text-white">Artist Name *</Label>
                  <Input
                    id="artist"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter artist name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="album" className="text-white">Album</Label>
                  <Input
                    id="album"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter album name"
                  />
                </div>
                <div>
                  <Label htmlFor="genre" className="text-white">Genre</Label>
                  <Input
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter genre"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tell us about your track..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="audio" className="text-white">Audio File *</Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioFileChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white file:bg-blue-600 file:text-white file:border-0"
                />
              </div>

              <div>
                <Label htmlFor="cover" className="text-white">Cover Art</Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileChange}
                  className="bg-gray-800 border-gray-700 text-white file:bg-blue-600 file:text-white file:border-0"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <UploadIcon className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload Track
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
