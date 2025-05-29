
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Upload, Eye, Trash2, Music } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Track {
  id: string;
  title: string;
  artist_name: string;
  album?: string;
  genre?: string;
  duration?: number;
  play_count: number;
  is_public: boolean;
  created_at: string;
  cover_art_url?: string;
}

interface UserTracksProps {
  tracks: Track[];
  isLoading: boolean;
}

const UserTracks: React.FC<UserTracksProps> = ({ tracks, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-400">Loading tracks...</div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-8">
        <Music className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <p className="text-gray-400 mb-4">You haven't uploaded any music yet</p>
        <Link to="/upload">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Your First Track
          </Button>
        </Link>
      </div>
    );
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">{tracks.length} track{tracks.length !== 1 ? 's' : ''}</p>
        <Link to="/upload">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Track
          </Button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Track</TableHead>
              <TableHead className="text-gray-400">Album</TableHead>
              <TableHead className="text-gray-400">Genre</TableHead>
              <TableHead className="text-gray-400">Duration</TableHead>
              <TableHead className="text-gray-400">Plays</TableHead>
              <TableHead className="text-gray-400">Uploaded</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track) => (
              <TableRow key={track.id} className="border-gray-800 hover:bg-gray-800/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    {track.cover_art_url ? (
                      <img 
                        src={track.cover_art_url} 
                        alt={track.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                        <Music className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{track.title}</p>
                      <p className="text-gray-400 text-sm">{track.artist_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{track.album || '--'}</TableCell>
                <TableCell className="text-gray-300">{track.genre || '--'}</TableCell>
                <TableCell className="text-gray-300">{formatDuration(track.duration)}</TableCell>
                <TableCell className="text-gray-300">{track.play_count}</TableCell>
                <TableCell className="text-gray-300">
                  {formatDistanceToNow(new Date(track.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    track.is_public 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {track.is_public ? 'Public' : 'Private'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTracks;
