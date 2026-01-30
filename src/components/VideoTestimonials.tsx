import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function VideoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['video-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_gallery')
        .select('*')
        .eq('is_published', true)
        .eq('file_type', 'video')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const getMediaUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('media-gallery')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handlePrevious = () => {
    if (mediaItems) {
      setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (mediaItems) {
      setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!mediaItems || mediaItems.length === 0 || isHovered) {
      return;
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mediaItems, isHovered, currentIndex]);

  // Pause on hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  const currentVideo = mediaItems[currentIndex];
  const visibleVideos = mediaItems.slice(0, 6);

  return (
    <section 
      className="py-16 bg-gradient-to-b from-background via-background to-muted/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from professionals who transformed their careers
          </p>
        </div>

        {/* Main Video Player */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            {/* Video */}
            <div className="aspect-video bg-muted">
              <video
                key={currentVideo.id}
                src={getMediaUrl(currentVideo.file_path)}
                controls
                className="w-full h-full"
                preload="metadata"
              />
            </div>

            {/* Video Info Below */}
            <div className="p-6 bg-card">
              {currentVideo.title && (
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentVideo.title}
                </h3>
              )}
              <p className="text-sm text-muted-foreground">
                {new Date(currentVideo.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Navigation Arrows Overlay */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
              aria-label="Next video"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Video Thumbnails Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {visibleVideos.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`group relative aspect-video rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-primary shadow-lg scale-105'
                    : 'ring-1 ring-border hover:ring-primary/50 hover:scale-105'
                }`}
              >
                {/* Thumbnail */}
                <video
                  src={getMediaUrl(item.file_path)}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                
                {/* Play Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  index === currentIndex ? 'bg-black/30' : 'bg-black/50 group-hover:bg-black/30'
                }`}>
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-foreground border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>

                {/* Active Indicator */}
                {index === currentIndex && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
