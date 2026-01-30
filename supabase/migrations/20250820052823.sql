-- Create resume_audit_requests table
CREATE TABLE public.resume_audit_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  current_role TEXT,
  target_role TEXT,
  experience_years TEXT,
  additional_info TEXT,
  resume_file_path TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resume_audit_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for resume audit requests
CREATE POLICY "Anyone can submit resume audit requests" 
ON public.resume_audit_requests 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for resume files
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-audits', 'resume-audits', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for resume uploads
CREATE POLICY "Users can upload resume files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resume-audits');

CREATE POLICY "Only admins can view resume files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resume-audits' AND auth.role() = 'service_role');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resume_audit_requests_updated_at
BEFORE UPDATE ON public.resume_audit_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();