import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Loader2, Play, ArrowRight, TrendingUp, Briefcase, Building2, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  client_name: string;
  client_role_before: string;
  client_company_before: string | null;
  client_role_after: string;
  client_company_after: string | null;
  salary_increase_percentage: number | null;
  video_path: string | null;
  youtube_url: string | null;
  thumbnail_path: string | null;
  quote: string | null;
  industry: string | null;
  is_published: boolean;
  created_at: string;
}

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export default function CAP360Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['cap360-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cap360_testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const getMediaUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('testimonial-videos')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const hasVideo = (testimonial: Testimonial) => {
    return testimonial.video_path || testimonial.youtube_url;
  };

  const handlePrevious = () => {
    if (testimonials) {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (testimonials) {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (!testimonials || testimonials.length === 0 || isHovered) {
      return;
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials, isHovered, currentIndex]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  return (
    <>
      <section 
        className="py-20 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              CAP360 Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Career Transformations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories of professionals who achieved remarkable career growth with CAP360
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Video Card */}
              <div className="relative group">
                <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden shadow-2xl border border-border">
                  {currentTestimonial.youtube_url ? (
                    <>
                      <img
                        src={getYouTubeThumbnail(currentTestimonial.youtube_url) || ''}
                        alt={`${currentTestimonial.client_name} testimonial`}
                        className="w-full h-full object-cover"
                      />
                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setSelectedVideo(currentTestimonial)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  ) : currentTestimonial.video_path ? (
                    <>
                      <video
                        src={getMediaUrl(currentTestimonial.video_path)}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                      {/* Play Button Overlay */}
                      <button
                        onClick={() => setSelectedVideo(currentTestimonial)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Briefcase className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground">Video Coming Soon</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Salary Increase Badge */}
                  {currentTestimonial.salary_increase_percentage && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-lg">
                      <TrendingUp className="h-4 w-4 text-white" />
                      <span className="text-white font-bold">
                        +{currentTestimonial.salary_increase_percentage}% Salary
                      </span>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6 text-foreground" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 hover:bg-background border border-border shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Info Card */}
              <div className="space-y-6">
                {/* Client Name & Industry */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentTestimonial.client_name}
                  </h3>
                  {currentTestimonial.industry && (
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
                      {currentTestimonial.industry}
                    </span>
                  )}
                </div>

                {/* Before/After Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Before */}
                  <div className="relative p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-red-500/10 rounded-full text-xs font-semibold text-red-600 dark:text-red-400">
                      BEFORE CAP360
                    </div>
                    <div className="flex items-start gap-3 mt-2">
                      <Briefcase className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{currentTestimonial.client_role_before}</p>
                        {currentTestimonial.client_company_before && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {currentTestimonial.client_company_before}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-primary rotate-90" />
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative p-5 rounded-xl bg-green-500/5 border border-green-500/20">
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-green-500/10 rounded-full text-xs font-semibold text-green-600 dark:text-green-400">
                      AFTER CAP360
                    </div>
                    <div className="flex items-start gap-3 mt-2">
                      <Briefcase className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{currentTestimonial.client_role_after}</p>
                        {currentTestimonial.client_company_after && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {currentTestimonial.client_company_after}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                {currentTestimonial.quote && (
                  <blockquote className="text-muted-foreground italic border-l-4 border-primary/50 pl-4">
                    "{currentTestimonial.quote}"
                  </blockquote>
                )}

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 pt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal with prominent close button */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          {/* Close Button - Prominent and always visible */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close video</span>
          </Button>
          
          {selectedVideo?.youtube_url ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.youtube_url)}?autoplay=1&rel=0`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : selectedVideo?.video_path ? (
            <video
              src={getMediaUrl(selectedVideo.video_path)}
              controls
              autoPlay
              className="w-full aspect-video"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}