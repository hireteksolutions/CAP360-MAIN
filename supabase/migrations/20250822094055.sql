-- Add SELECT policy for admins to view resume audit requests
CREATE POLICY "Admins can view resume audit requests" 
ON public.resume_audit_requests 
FOR SELECT 
USING (is_admin(auth.uid()));