-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_path TEXT,
  author_name TEXT NOT NULL DEFAULT 'Admin',
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Anyone can view published blogs
CREATE POLICY "Anyone can view published blogs"
ON public.blogs
FOR SELECT
USING (is_published = true);

-- Admins can view all blogs
CREATE POLICY "Admins can view all blogs"
ON public.blogs
FOR SELECT
USING (is_admin(auth.uid()));

-- Admins can insert blogs
CREATE POLICY "Admins can insert blogs"
ON public.blogs
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

-- Admins can update blogs
CREATE POLICY "Admins can update blogs"
ON public.blogs
FOR UPDATE
USING (is_admin(auth.uid()));

-- Admins can delete blogs
CREATE POLICY "Admins can delete blogs"
ON public.blogs
FOR DELETE
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for slug lookups
CREATE INDEX idx_blogs_slug ON public.blogs(slug);
CREATE INDEX idx_blogs_published ON public.blogs(is_published, published_at DESC);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies for blog images
CREATE POLICY "Anyone can view blog images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update blog images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'blog-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete blog images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'blog-images' AND is_admin(auth.uid()));