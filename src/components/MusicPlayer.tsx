
import React, { useState } from 'react';
import { Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([33]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <img 
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=64&h=64&fit=crop&crop=center" 
            alt="Current track"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="text-white font-medium">Electric Dreams</h4>
            <p className="text-gray-400 text-sm">Neon Nights</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="player-controls">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-blue-400"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400">1:23</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-gray-400">3:45</span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-end">
          <Slider
            value={[70]}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
