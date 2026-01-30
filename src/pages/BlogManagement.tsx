import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Upload,
  X,
  BookOpen,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { z } from "zod";

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
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug must be less than 200 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().max(500, "Excerpt must be less than 500 characters").optional(),
  content: z.string().min(1, "Content is required"),
  author_name: z.string().min(1, "Author name is required").max(100, "Author name must be less than 100 characters"),
  category: z.string().max(50, "Category must be less than 50 characters").optional(),
  tags: z.string().max(500, "Tags must be less than 500 characters").optional(),
});

const BlogManagement = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author_name: "Admin",
    category: "",
    tags: "",
    is_published: false,
    is_featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Blog[];
    },
  });

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingBlog ? prev.slug : generateSlug(title),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file);
    
    if (error) throw error;
    return fileName;
  };

  const deleteImage = async (path: string) => {
    await supabase.storage.from('blog-images').remove([path]);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const validation = blogSchema.safeParse({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || undefined,
        content: formData.content,
        author_name: formData.author_name,
        category: formData.category || undefined,
        tags: formData.tags || undefined,
      });

      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.errors.forEach(err => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
        throw new Error('Validation failed');
      }

      setValidationErrors({});

      let imagePath = editingBlog?.featured_image_path || null;

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if exists
        if (editingBlog?.featured_image_path) {
          await deleteImage(editingBlog.featured_image_path);
        }
        imagePath = await uploadImage(imageFile);
      }

      const tagsArray = formData.tags
        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : null;

      const blogData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        author_name: formData.author_name,
        category: formData.category || null,
        tags: tagsArray,
        featured_image_path: imagePath,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        published_at: formData.is_published && !editingBlog?.published_at ? new Date().toISOString() : editingBlog?.published_at,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert(blogData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast.success(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      if (error.message !== 'Validation failed') {
        toast.error('Failed to save blog: ' + error.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (blog: Blog) => {
      if (blog.featured_image_path) {
        await deleteImage(blog.featured_image_path);
      }
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blog.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast.success('Blog deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete blog: ' + error.message);
    },
  });

  const togglePublish = useMutation({
    mutationFn: async (blog: Blog) => {
      const newPublishState = !blog.is_published;
      const { error } = await supabase
        .from('blogs')
        .update({
          is_published: newPublishState,
          published_at: newPublishState && !blog.published_at ? new Date().toISOString() : blog.published_at,
        })
        .eq('id', blog.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast.success('Blog status updated!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update status: ' + error.message);
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: async (blog: Blog) => {
      const { error } = await supabase
        .from('blogs')
        .update({ is_featured: !blog.is_featured })
        .eq('id', blog.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      toast.success('Featured status updated!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update: ' + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author_name: "Admin",
      category: "",
      tags: "",
      is_published: false,
      is_featured: false,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingBlog(null);
    setValidationErrors({});
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content,
      author_name: blog.author_name,
      category: blog.category || "",
      tags: blog.tags?.join(', ') || "",
      is_published: blog.is_published,
      is_featured: blog.is_featured,
    });
    if (blog.featured_image_path) {
      setImagePreview(getImageUrl(blog.featured_image_path));
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveMutation.mutateAsync();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog Management | Admin</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
              <p className="text-slate-600 mt-1">Create and manage blog articles</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingBlog ? 'Edit Article' : 'Create New Article'}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="media">Media</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Enter article title"
                          className={validationErrors.title ? 'border-red-500' : ''}
                        />
                        {validationErrors.title && (
                          <p className="text-sm text-red-500 mt-1">{validationErrors.title}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="slug">URL Slug *</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="article-url-slug"
                          className={validationErrors.slug ? 'border-red-500' : ''}
                        />
                        {validationErrors.slug && (
                          <p className="text-sm text-red-500 mt-1">{validationErrors.slug}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">URL: /blog/{formData.slug || 'your-slug'}</p>
                      </div>

                      <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Brief summary of the article..."
                          rows={2}
                          className={validationErrors.excerpt ? 'border-red-500' : ''}
                        />
                        {validationErrors.excerpt && (
                          <p className="text-sm text-red-500 mt-1">{validationErrors.excerpt}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Write your article content here..."
                          rows={12}
                          className={validationErrors.content ? 'border-red-500' : ''}
                        />
                        {validationErrors.content && (
                          <p className="text-sm text-red-500 mt-1">{validationErrors.content}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">Supports plain text with line breaks</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4 mt-4">
                      <div>
                        <Label>Featured Image</Label>
                        <div className="mt-2">
                          {imagePreview ? (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  setImageFile(null);
                                  setImagePreview(null);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-slate-400 transition-colors"
                            >
                              <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                              <p className="text-slate-600">Click to upload featured image</p>
                              <p className="text-xs text-slate-500 mt-1">Max 5MB, JPG, PNG, WebP</p>
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="author">Author Name *</Label>
                        <Input
                          id="author"
                          value={formData.author_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                          placeholder="Author name"
                          className={validationErrors.author_name ? 'border-red-500' : ''}
                        />
                        {validationErrors.author_name && (
                          <p className="text-sm text-red-500 mt-1">{validationErrors.author_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          placeholder="e.g., Career Tips, Interview Skills"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                          placeholder="resume, interview, career growth"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <Label htmlFor="published" className="font-medium">Publish</Label>
                          <p className="text-sm text-slate-500">Make this article visible to the public</p>
                        </div>
                        <Switch
                          id="published"
                          checked={formData.is_published}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <Label htmlFor="featured" className="font-medium">Featured</Label>
                          <p className="text-sm text-slate-500">Highlight this article on the blog page</p>
                        </div>
                        <Switch
                          id="featured"
                          checked={formData.is_featured}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-slate-900 text-white"
                    >
                      {isSubmitting ? 'Saving...' : editingBlog ? 'Update Article' : 'Create Article'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog List */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogs?.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles yet</h3>
                <p className="text-slate-500 mb-6">Create your first blog article to get started</p>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-slate-900 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Article
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {blogs?.map((blog) => (
                <Card key={blog.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        {blog.featured_image_path ? (
                          <img
                            src={getImageUrl(blog.featured_image_path) || ''}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-slate-300" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-lg font-semibold text-slate-900 truncate">
                                {blog.title}
                              </h3>
                              {blog.is_featured && (
                                <Badge className="bg-amber-100 text-amber-800 border-0">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Badge variant={blog.is_published ? "default" : "secondary"}>
                                {blog.is_published ? 'Published' : 'Draft'}
                              </Badge>
                            </div>
                            {blog.excerpt && (
                              <p className="text-slate-600 text-sm line-clamp-1 mb-2">{blog.excerpt}</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(blog.created_at), 'MMM dd, yyyy')}
                              </span>
                              {blog.category && (
                                <Badge variant="outline" className="text-xs">{blog.category}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured.mutate(blog)}
                          title={blog.is_featured ? 'Remove from featured' : 'Mark as featured'}
                        >
                          <Star className={`h-4 w-4 ${blog.is_featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish.mutate(blog)}
                          title={blog.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {blog.is_published ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-slate-400" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(blog)}
                        >
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this article?')) {
                              deleteMutation.mutate(blog);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogManagement;