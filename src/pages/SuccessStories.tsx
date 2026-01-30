import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, DollarSign, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ConsultationModal from "@/components/ConsultationModal";

interface SuccessStory {
  id: string;
  client_name: string;
  previous_position: string;
  new_position: string;
  company: string;
  challenges: string;
  solutions: string;
  results: string;
  timeline: string;
  industry: string;
  rating: number;
  testimonial_quote: string;
  salary_increase_percentage: number;
  story_date: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use database stories or fallback to sample data
  const caseStudies =
    stories.length > 0
      ? stories.map((story) => ({
          name: story.client_name,
          role: `${story.previous_position} → ${story.new_position}`,
          company: story.company,
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          challenge: story.challenges,
          solution: story.solutions,
          results: story.results.split("\n").filter((result) => result.trim()),
          timeline: story.timeline,
          industry: story.industry,
          rating: story.rating,
          quote: story.testimonial_quote,
          salaryIncrease: story.salary_increase_percentage,
        }))
      : [
          {
            name: "Shruti Shukla",
            role: "Software Engineer → Senior Software Engineer",
            company: "Top tech MNC",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            challenge:
              "Despite nearly a decade of impactful experience working at leading Big 4 consulting firms. She felt her global contributions and leadership across CPG benchmarks and growth strategies weren’t translating into industry recognition outside consulting.",
            solution:
              "We repositioned her profile to reflect her status as a Global Growth Strategy Leader. Her resume was restructured to emphasize her quantifiable impact + growth strategy roadmaps+ cost savings, and GTM transformations across markets. Her LinkedIn was optimized with high-visibility keywords. She was also coached on articulating cross-functional leadership and storytelling in executive interviews.",
            results: [
              "Landed senior engineer role at Microsoft",
              "85% salary increase ($75k → $140k)",
              "Received 3 additional offers from FAANG companies",
              "Interview success rate improved from 10% to 80%",
            ],
            timeline: "6 weeks",
            industry: "Technology",
            rating: 5,
          },
          {
            name: "Robert Chen",
            role: "Marketing Manager → VP of Marketing",
            company: "From Regional Firm to Fortune 500",
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            challenge:
              "Robert had strong marketing skills but was overlooked for executive positions. His resume didn't effectively communicate his leadership capabilities or quantify his impact on business growth.",
            solution:
              "We developed a comprehensive personal branding strategy, created an executive-level resume showcasing ROI-driven achievements, and provided C-suite interview coaching.",
            results: [
              "Promoted to VP of Marketing at Fortune 500 company",
              "120% salary increase ($95k → $210k)",
              "Expanded team from 5 to 25 members",
              "Featured in industry publications",
            ],
            timeline: "4 months",
            industry: "Marketing",
            rating: 5,
          },
          {
            name: "Jessica Williams",
            role: "Recent Graduate → Business Analyst",
            company: "From Unemployment to Goldman Sachs",
            image:
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            challenge:
              "Fresh MBA graduate with no prior finance experience struggling to break into investment banking. Received multiple rejections despite strong academic credentials.",
            solution:
              "We crafted a compelling narrative highlighting transferable skills, created a finance-focused resume, provided intensive case study preparation, and developed her professional network.",
            results: [
              "Secured Business Analyst position at Goldman Sachs",
              "Starting salary of $150k + bonus",
              "Beat 200+ other candidates for the role",
              "Received mentorship opportunities",
            ],
            timeline: "8 weeks",
            industry: "Finance",
            rating: 5,
          },
          {
            name: "David Kim",
            role: "Operations Manager → Director of Operations",
            company: "Healthcare Industry Leader",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            challenge:
              "David had been in the same role for 5 years with limited advancement opportunities. He lacked confidence in interviews and his resume failed to highlight his operational improvements.",
            solution:
              "We redesigned his resume to showcase process improvements and cost savings, provided leadership coaching, and developed his executive presence for director-level interviews.",
            results: [
              "Promoted to Director role within same company",
              "60% salary increase ($85k → $135k)",
              "Now manages 50+ employees across 3 departments",
              "Implemented company-wide efficiency programs",
            ],
            timeline: "3 months",
            industry: "Healthcare",
            rating: 5,
          },
        ];

  // Use database stories for testimonials or fallback to sample data
  const testimonials =
    stories.length > 0
      ? stories.slice(0, 3).map((story) => ({
          quote: story.testimonial_quote,
          author: story.client_name,
          role: story.new_position,
          company: story.company,
        }))
      : [
          {
            quote:
              "The team at CAP 360 transformed not just my resume, but my entire approach to career development. I went from getting no responses to having multiple offers within weeks.",
            author: "Sarah Johnson",
            role: "Senior Product Manager",
            company: "Amazon",
          },
          {
            quote:
              "The interview coaching was game-changing. I felt confident and prepared for every question. The investment in their program paid for itself with my first salary negotiation.",
            author: "Michael Torres",
            role: "Financial Analyst",
            company: "JPMorgan Chase",
          },
          {
            quote:
              "As a career changer, I thought it would be impossible to break into tech. Their strategic approach and industry insights made it happen faster than I ever imagined.",
            author: "Amanda Lee",
            role: "UX Designer",
            company: "Google",
          },
        ];

  const industryStats = [
    { industry: "Technology", avgIncrease: "78%", clients: "1,200+" },
    { industry: "Finance", avgIncrease: "85%", clients: "950+" },
    { industry: "Healthcare", avgIncrease: "65%", clients: "800+" },
    { industry: "Marketing", avgIncrease: "72%", clients: "650+" },
    { industry: "Consulting", avgIncrease: "90%", clients: "500+" },
    { industry: "Legal", avgIncrease: "88%", clients: "400+" },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581091870598-36ce9bad5c77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // professional testimonial vibe
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>{" "}
        {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Real Success Stories
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our clients have transformed their careers and achieved
            remarkable results. These are real stories from real professionals
            who took the next step with us.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading-teal mb-1">
                95%
              </div>
              <div className="text-gray-600">Get Interviews</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DollarSign className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading-teal mb-1">
                78%
              </div>
              <div className="text-gray-600">Avg Salary Increase</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading-teal mb-1">
                30
              </div>
              <div className="text-gray-600">Days to Offer</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Star className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading-teal mb-1">
                4.9/5
              </div>
              <div className="text-gray-600">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              Detailed Case Studies
            </h2>
            <p className="text-xl text-gray-600">
              In-depth look at how we helped professionals achieve breakthrough
              results
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile */}
                    <div className="text-center lg:text-left">
                      <img
                        src={study.image}
                        alt={study.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 mb-4"
                      />
                      <h3 className="text-xl font-bold text-heading-teal mb-2">
                        {study.name}
                      </h3>
                      <p className="text-gold-500 font-medium mb-2">
                        {study.role}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {study.company}
                      </p>
                      <div className="flex items-center justify-center lg:justify-start mb-2">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-heading-teal fill-current"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <Badge variant="secondary">{study.industry}</Badge>
                        <Badge variant="outline">{study.timeline}</Badge>
                      </div>
                    </div>

                    {/* Story */}
                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-orange-500 mb-2">
                            The Challenge
                          </h4>
                          <p className="text-gray-700">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-orange-500 mb-2">
                            Our Solution
                          </h4>
                          <p className="text-gray-700">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-orange-500 mb-2">
                            The Results
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {study.results.map((result, resultIndex) => (
                              <li
                                key={resultIndex}
                                className="flex items-start"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Results */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              Results by Industry
            </h2>
            <p className="text-xl text-gray-600">
              Our proven track record across diverse industries and career
              levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryStats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-heading-teal">
                    {stat.industry}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-orange-500">
                      {stat.avgIncrease}
                    </div>
                    <div className="text-sm text-gray-600">
                      Average Salary Increase
                    </div>
                    <div className="text-lg font-semibold text-heading-teal">
                      {stat.clients}
                    </div>
                    <div className="text-sm text-gray-600">Clients Served</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Honest feedback from professionals who achieved their career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-gold-500 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-heading-teal">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20 bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Overlay */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work With Our Team?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Schedule a free consultation to discuss your career goals and how we
            can help you achieve them
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsultationModal>
              <Button
                size="lg"
                className="bg-gradient-icon hover:opacity-90 text-white px-8 py-3"
              >
                Book Free Consultation
              </Button>
            </ConsultationModal>
            {/* <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-logo-blue px-8 py-3">
             Download Program Guide
           </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
