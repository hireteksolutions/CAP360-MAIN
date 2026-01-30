-- Add youtube_url column to cap360_testimonials for YouTube video support
ALTER TABLE public.cap360_testimonials
ADD COLUMN youtube_url text;