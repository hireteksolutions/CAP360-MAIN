import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, Tag } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_path: string | null;
  author_name: string;
  category: string | null;
  tags: string[] | null;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      
      if (error) throw error;
      return data as Blog | null;
    },
    enabled: !!slug,
  });

  const { data: relatedBlogs } = useQuery({
    queryKey: ['related-blogs', blog?.category],
    queryFn: async () => {
      if (!blog?.category) return [];
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .eq('category', blog.category)
        .neq('id', blog.id)
        .limit(3);
      
      if (error) throw error;
      return data as Blog[];
    },
    enabled: !!blog?.category,
  });

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt || '',
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Article Not Found</h1>
          <p className="text-slate-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} className="bg-slate-900 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | CAP 360 Blog</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        {blog.featured_image_path && (
          <meta property="og:image" content={getImageUrl(blog.featured_image_path) || ''} />
        )}
      </Helmet>

      {/* Hero Section */}
      <article>
        <header className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {blog.category && (
                <Badge className="bg-amber-500 text-white border-0">{blog.category}</Badge>
              )}
              {blog.is_featured && (
                <Badge className="bg-white/20 text-white border-0">Featured</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-xl text-white/70 mb-8 leading-relaxed">{blog.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-white/60">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author_name}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {blog.published_at 
                  ? format(new Date(blog.published_at), 'MMMM dd, yyyy')
                  : format(new Date(blog.created_at), 'MMMM dd, yyyy')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getReadingTime(blog.content)}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-white transition-colors ml-auto"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.featured_image_path && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={getImageUrl(blog.featured_image_path) || ''}
                alt={blog.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="h-4 w-4 text-slate-400" />
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-slate-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="mt-12 p-6 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {blog.author_name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Written by</p>
                <h3 className="text-lg font-bold text-slate-900">{blog.author_name}</h3>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    {related.featured_image_path ? (
                      <img
                        src={getImageUrl(related.featured_image_path) || ''}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                      {related.published_at 
                        ? format(new Date(related.published_at), 'MMM dd, yyyy')
                        : format(new Date(related.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPost;