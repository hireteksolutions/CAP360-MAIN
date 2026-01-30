-- Insert sample success stories
INSERT INTO public.success_stories (
  client_name,
  previous_position,
  new_position,
  company,
  challenges,
  solutions,
  results,
  timeline,
  industry,
  rating,
  testimonial_quote,
  salary_increase_percentage,
  story_date,
  is_featured,
  is_published
) VALUES 
(
  'Shruti Shukla',
  'Software Engineer',
  'Senior Software Engineer',
  'Top tech MNC',
  'Despite nearly a decade of impactful experience working at leading Big 4 consulting firms. She felt her global contributions and leadership across CPG benchmarks and growth strategies weren’t translating into industry recognition outside consulting.',
  'We repositioned her profile to reflect her status as a Global Growth Strategy Leader. Her resume was restructured to emphasize her quantifiable impact + growth strategy roadmaps+ cost savings, and GTM transformations across markets. Her LinkedIn was optimized with high-visibility keywords. She was also coached on articulating cross-functional leadership and storytelling in executive interviews.',
  'Landed senior engineer role at Microsoft
85% salary increase ($75k → $140k)
Received 3 additional offers from FAANG companies
Interview success rate improved from 10% to 80%',
  '6 weeks',
  'Technology',
  5,
  'The team at CAPtivate transformed not just my resume, but my entire approach to career development. I went from getting no responses to having multiple offers within weeks.',
  85,
  '2024-01-15',
  true,
  true
),
(
  'Robert Chen',
  'Marketing Manager',
  'VP of Marketing',
  'Fortune 500 Company',
  'Robert had strong marketing skills but was overlooked for executive positions. His resume didn''t effectively communicate his leadership capabilities or quantify his impact on business growth.',
  'We developed a comprehensive personal branding strategy, created an executive-level resume showcasing ROI-driven achievements, and provided C-suite interview coaching.',
  'Promoted to VP of Marketing at Fortune 500 company
120% salary increase ($95k → $210k)
Expanded team from 5 to 25 members
Featured in industry publications',
  '4 months',
  'Marketing',
  5,
  'The interview coaching was game-changing. I felt confident and prepared for every question. The investment in their program paid for itself with my first salary negotiation.',
  120,
  '2024-02-20',
  false,
  true
),
(
  'Jessica Williams',
  'Recent Graduate',
  'Business Analyst',
  'Goldman Sachs',
  'Fresh MBA graduate with no prior finance experience struggling to break into investment banking. Received multiple rejections despite strong academic credentials.',
  'We crafted a compelling narrative highlighting transferable skills, created a finance-focused resume, provided intensive case study preparation, and developed her professional network.',
  'Secured Business Analyst position at Goldman Sachs
Starting salary of $150k + bonus
Beat 200+ other candidates for the role
Received mentorship opportunities',
  '8 weeks',
  'Finance',
  5,
  'As a career changer, I thought it would be impossible to break into finance. Their strategic approach and industry insights made it happen faster than I ever imagined.',
  200,
  '2024-03-10',
  true,
  true
);