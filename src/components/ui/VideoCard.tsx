
import React from 'react';
import { VideoTutorial } from '@/data/videoTutorials';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: VideoTutorial;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const handleWatchNow = () => {
    window.open(video.videoUrl, '_blank');
  };

  return (
    <Card className="ur-card hover-glow animate-fade-in">
      <div className="relative h-48 overflow-hidden bg-black">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-90 hover-grow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
            <Play fill="#6AB04A" className="h-6 w-6 text-ur-green ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-ur-blue/20 text-ur-blue text-xs px-2 py-1 rounded-full">
            {video.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-ur-green line-clamp-1">{video.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-2 mt-1">{video.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-ur-orange hover:bg-ur-orange/90 text-white"
          onClick={handleWatchNow}
        >
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
