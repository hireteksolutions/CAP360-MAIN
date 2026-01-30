-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-gallery',
  'media-gallery',
  true,
  104857600, -- 100MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
);

-- Create media metadata table
CREATE TABLE public.media_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image' or 'video'
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  title TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_gallery table
CREATE POLICY "Anyone can view published media"
ON public.media_gallery
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all media"
ON public.media_gallery
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert media"
ON public.media_gallery
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update media"
ON public.media_gallery
FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete media"
ON public.media_gallery
FOR DELETE
USING (is_admin(auth.uid()));

-- Storage policies for media-gallery bucket
CREATE POLICY "Anyone can view media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media-gallery');

CREATE POLICY "Admins can upload media files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'media-gallery' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can update media files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'media-gallery' 
  AND is_admin(auth.uid())
);

CREATE POLICY "Admins can delete media files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'media-gallery' 
  AND is_admin(auth.uid())
);