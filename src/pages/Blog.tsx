import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Search, ArrowRight, BookOpen } from "lucide-react";
import { format } from "date-fns";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_path: string | null;
  author_name: string;
  category: string | null;
  tags: string[] | null;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });

  const categories = blogs
    ? [...new Set(blogs.map(blog => blog.category).filter(Boolean))]
    : [];

  const filteredBlogs = blogs?.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = filteredBlogs?.filter(blog => blog.is_featured) || [];
  const regularBlogs = filteredBlogs?.filter(blog => !blog.is_featured) || [];

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const getReadingTime = (excerpt: string | null) => {
    if (!excerpt) return "2 min read";
    const wordsPerMinute = 200;
    const words = excerpt.split(' ').length * 5; // Estimate full content
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Helmet>
        <title>Career Insights Blog | CAP 360</title>
        <meta name="description" content="Expert career advice, resume tips, interview strategies, and industry insights to accelerate your professional growth." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium">Career Insights & Tips</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Blog</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
              Expert career advice, resume tips, interview strategies, and industry insights 
              to accelerate your professional growth.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-full focus:ring-2 focus:ring-amber-400/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-slate-900 text-white" : ""}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category as string)}
                className={selectedCategory === category ? "bg-slate-900 text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBlogs?.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {featuredBlogs.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <span className="w-8 h-1 bg-amber-500 rounded"></span>
                    Featured Articles
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredBlogs.slice(0, 2).map((blog) => (
                      <Link key={blog.id} to={`/blog/${blog.slug}`}>
                        <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                          <div className="relative h-64 overflow-hidden">
                            {blog.featured_image_path ? (
                              <img
                                src={getImageUrl(blog.featured_image_path) || ''}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <BookOpen className="h-16 w-16 text-white/20" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <Badge className="absolute top-4 left-4 bg-amber-500 text-white border-0">
                              Featured
                            </Badge>
                            {blog.category && (
                              <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 border-0">
                                {blog.category}
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {blog.author_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {blog.published_at ? format(new Date(blog.published_at), 'MMM dd, yyyy') : format(new Date(blog.created_at), 'MMM dd, yyyy')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {getReadingTime(blog.excerpt)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            {blog.excerpt && (
                              <p className="text-slate-600 line-clamp-2 mb-4">{blog.excerpt}</p>
                            )}
                            <div className="flex items-center gap-2 text-amber-600 font-medium">
                              Read More
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularBlogs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <span className="w-8 h-1 bg-slate-900 rounded"></span>
                    Latest Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularBlogs.map((blog) => (
                      <Link key={blog.id} to={`/blog/${blog.slug}`}>
                        <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
                          <div className="relative h-48 overflow-hidden">
                            {blog.featured_image_path ? (
                              <img
                                src={getImageUrl(blog.featured_image_path) || ''}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                <BookOpen className="h-12 w-12 text-white/20" />
                              </div>
                            )}
                            {blog.category && (
                              <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900 border-0 text-xs">
                                {blog.category}
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {blog.published_at ? format(new Date(blog.published_at), 'MMM dd, yyyy') : format(new Date(blog.created_at), 'MMM dd, yyyy')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {getReadingTime(blog.excerpt)}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            {blog.excerpt && (
                              <p className="text-slate-600 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                            )}
                            <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                              Read More
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-white/70 mb-8">
            Get the latest career tips and insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;