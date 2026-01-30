-- Enable RLS on table_name table that was missing it
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY;

-- Create a basic policy for table_name (restrictive by default)
CREATE POLICY "Only authenticated users can access table_name" 
ON public.table_name 
FOR ALL 
USING (auth.role() = 'authenticated');