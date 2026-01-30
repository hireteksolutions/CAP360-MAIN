-- Create CAP360 Testimonials table for before/after career outcomes with video support
CREATE TABLE public.cap360_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role_before TEXT NOT NULL,
  client_company_before TEXT,
  client_role_after TEXT NOT NULL,
  client_company_after TEXT,
  salary_increase_percentage INTEGER,
  video_path TEXT,
  thumbnail_path TEXT,
  quote TEXT,
  industry TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cap360_testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (only published testimonials)
CREATE POLICY "Anyone can view published testimonials" 
ON public.cap360_testimonials 
FOR SELECT 
USING (is_published = true);

-- Create policy for admin full access
CREATE POLICY "Admins can manage testimonials" 
ON public.cap360_testimonials 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Create storage bucket for testimonial videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonial-videos', 
  'testimonial-videos', 
  true,
  52428800, -- 50MB limit
  ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'image/jpeg', 'image/png', 'image/webp']
);

-- Storage policies for testimonial videos
CREATE POLICY "Anyone can view testimonial videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'testimonial-videos');

CREATE POLICY "Admins can upload testimonial videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'testimonial-videos' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can update testimonial videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'testimonial-videos' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete testimonial videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'testimonial-videos' AND public.is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cap360_testimonials_updated_at
BEFORE UPDATE ON public.cap360_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();