import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Gallery() {
  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['public-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_gallery')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

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

  return (
    <>
      <Helmet>
        <title>Gallery - Career Catalyst Consultancy</title>
        <meta
          name="description"
          content="Browse our gallery of success stories, career transformations, and memorable moments from Career Catalyst Consultancy"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore moments from our journey of transforming careers and
              creating success stories
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : !mediaItems || mediaItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">
                  No media available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      {item.file_type === 'video' ? (
                        <video
                          src={getMediaUrl(item.file_path)}
                          controls
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <img
                          src={getMediaUrl(item.file_path)}
                          alt={item.title || 'Gallery image'}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {item.title && (
                      <div className="p-4 bg-card">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(item.created_at).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
