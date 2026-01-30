-- Create success stories table
CREATE TABLE public.success_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Client details
  client_name TEXT NOT NULL,
  previous_role TEXT NOT NULL,
  current_role TEXT NOT NULL,
  company TEXT NOT NULL,
  challenges TEXT NOT NULL,
  solutions TEXT NOT NULL,
  results TEXT NOT NULL,
  timeline TEXT NOT NULL,
  industry TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Testimonial
  testimonial_quote TEXT NOT NULL,
  
  -- Industry stats
  salary_increase_percentage INTEGER NOT NULL,
  
  -- Meta
  story_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view published success stories" 
ON public.success_stories 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Authenticated users can view all success stories" 
ON public.success_stories 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert success stories" 
ON public.success_stories 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update success stories" 
ON public.success_stories 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete success stories" 
ON public.success_stories 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_success_stories_updated_at
BEFORE UPDATE ON public.success_stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();