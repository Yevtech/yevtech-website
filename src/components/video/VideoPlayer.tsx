import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Maximize2, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!videoUrl) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Video content coming soon</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Unable to load video</p>
          <p className="text-xs text-muted-foreground mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <Loader2 className="h-8 w-8 animate-spin text-forest" />
        </div>
      )}
      <video
        className="w-full h-full"
        controls
        controlsList="nodownload"
        playsInline
        title={title}
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
