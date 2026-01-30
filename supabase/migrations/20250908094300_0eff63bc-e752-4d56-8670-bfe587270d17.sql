
-- Add CTC field to resume_audit_requests table
ALTER TABLE public.resume_audit_requests 
ADD COLUMN ctc text;
