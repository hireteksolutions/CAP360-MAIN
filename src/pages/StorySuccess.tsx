
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import ConsultationModal from "@/components/ConsultationModal";
import { Button } from "@/components/ui/button";

const SuccessStories = () => {
  // Static case studies data
  const caseStudies = [
    {
      name: "Nikita Bains",
            role: "AVP Consulting",
            company: "Top tech MNC",
            image:
              "https://images.unsplash.com/photo-1509839862600-309617c3201e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            challenge:
              "Despite nearly a decade of impactful experience working at leading Big 4 consulting firms. She felt her global contributions and leadership across CPG benchmarks and growth strategies weren’t translating into industry recognition outside consulting.",
            solution:
              "We repositioned her profile to reflect her status as a Global Growth Strategy Leader. Her resume was restructured to emphasize her quantifiable impact + growth strategy roadmaps+ cost savings, and GTM transformations across markets. Her LinkedIn was optimized with high-visibility keywords. She was also coached on articulating cross-functional leadership and storytelling in executive interviews.",
      results: [
        "Landed senior engineer role at Microsoft",
        "85% salary increase ($75k → $140k)",
        "Received 3 additional offers from FAANG companies",
        "Interview success rate improved from 10% to 80%"
      ],
      timeline: "6 weeks",
      industry: "Consulting",
      rating: 5
    },
    {
      name: "Aashima",
      role: "VP Business Transformation",
      company: "Fortune 500",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      challenge: "Aashima had strong marketing skills but was overlooked for executive positions. Her resume didn't effectively communicate her leadership capabilities or quantify her impact on business growth.",
      solution: "We repositioned her brand as a Strategic Transformation Leader, emphasizing her deep expertise in driving enterprise-wide programs. Her resume was restructured to highlight high-impact achievements. Her LinkedIn profile was optimized with high-impact keywords to boost visibility among decision-makers., and she received tailored coaching on presenting executive presence and outcome-driven storytelling during interviews.",
      results: [
        "Promoted to VP of Marketing at Fortune 500 company",
        "120% salary increase ($95k → $210k)",
        "Expanded team from 5 to 25 members", 
        "Featured in industry publications"
      ],
      timeline: "4 months",
      industry: "Strategy",
      rating: 5
    },
    {
      name: "Mohit Anand",
      role: "GM Sales → Sales Director",
      company: "MNC",
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      challenge: "Despite 24+ years of leadership experience in the lighting industry—spearheading multi-crore B2B verticals, launching new business units, and driving double-digit revenue growth—His career narrative wasn’t fully aligned with the evolving expectations of CXO-level roles in modern, innovation-led enterprises. His accomplishments across sales leadership, product strategy, and national account management lacked a unified, executive-ready positioning that highlighted his strategic foresight and transformation capabilities.",
      solution: "We repositioned him as a Transformational Business Leader with deep expertise in scaling B2B verticals and driving strategic growth across the lighting and infrastructure domains. His resume was restructured to emphasize key achievements, revenue portfolios, and driving category growth through GTM innovation. His LinkedIn profile was enhanced with role-relevant, high-impact keywords and narratives reflecting visionary leadership. Executive coaching was also provided to sharpen his messaging and presence for boardroom-level conversations.",
      results: [
        "Secured Business Analyst position at Goldman Sachs",
        "Starting salary of $150k + bonus",
        "Beat 200+ other candidates for the role",
        "Received mentorship opportunities"
      ],
      timeline: "8 weeks", 
      industry: "sales",
      rating: 5
    },
    {
      name: "Mukul Sharma",
      role: "DGM Sales → Marketing Head",
      company: "Auto Industry Leader",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      challenge: "Despite nearly 24 years of success in sales leadership across the automobile and consumer electronics industries, his career story lacked strategic positioning aligned with the expectations of CXO-level roles. While he consistently delivered exceptional results—such as expanding dealer networks, launching high-impact products, and achieving significant market share gains—his profile didn’t clearly reflect his capability as a business transformation leader in highly competitive, growth-focused markets.",
      solution: "We repositioned him as a Growth-Oriented Sales Strategist and P&L-Focused Business Leader, with deep expertise in scaling regional operations, driving market share, and launching new products across complex geographies. His resume was restructured to highlight outcomes. His LinkedIn profile was optimized with sector-specific leadership keywords.",
      results: [
        "Promoted to Director role within same company",
        "60% salary increase ($85k → $135k)",
        "Now manages 50+ employees across 3 departments",
        "Implemented company-wide efficiency programs"
      ],
      timeline: "4 months",
      industry: "Sales",
      rating: 4
    }
  ];

  // Static testimonials data
  const testimonials = [
    {
      quote: "The team at CAP 360 transformed not just my resume, but my entire approach to career development. I went from getting no responses to having multiple offers within weeks.",
      author: "Sarah Johnson",
      role: "Senior Product Manager",
      company: "Amazon"
    },
    {
      quote: "The interview coaching was game-changing. I felt confident and prepared for every question. The investment in their program paid for itself with my first salary negotiation.",
      author: "Michael Torres",
      role: "Financial Analyst", 
      company: "JPMorgan Chase"
    },
    {
      quote: "As a career changer, I thought it would be impossible to break into tech. Their strategic approach and industry insights made it happen faster than I ever imagined.",
      author: "Amanda Lee",
      role: "UX Designer",
      company: "Google"
    }
  ];

  const industryStats = [
    { industry: "Technology", avgIncrease: "62%", clients: "120" },
    { industry: "Finance", avgIncrease: "45%", clients: "50" },
    { industry: "Healthcare", avgIncrease: "37%", clients: "15-20" },
    { industry: "Marketing", avgIncrease: "55%", clients: "40" },
    { industry: "Consulting", avgIncrease: "60%", clients: "10" },
    { industry: "Manufacturing", avgIncrease: "35%", clients: "25" }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Success Stories - Real Career Transformations & Client Results | CAP 360</title>
        <meta name="description" content="Read inspiring success stories from CAP 360 clients. 95% get interviews, 78% average salary increase. Real transformations across technology, finance, healthcare & more industries." />
        <meta name="keywords" content="career success stories, client testimonials, salary increase results, job placement success, career transformation, professional development results, resume writing success" />
        <link rel="canonical" href="https://cap360.com/success-stories" />
        <meta property="og:title" content="Success Stories - Real Career Transformations & Client Results | CAP 360" />
        <meta property="og:description" content="Read inspiring success stories from CAP 360 clients. 95% get interviews, 78% average salary increase. Real transformations across technology, finance, healthcare & more industries." />
        <meta property="og:url" content="https://cap360.com/success-stories" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Success Stories",
          "description": "Real career transformation stories from CAP 360 clients",
          "url": "https://cap360.com/success-stories",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Maria Gonzalez"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Landed senior engineer role at Microsoft with 85% salary increase"
              }
            ]
          },
          "provider": {
            "@type": "Organization",
            "name": "CAP 360"
          }
        })}
        </script>
      </Helmet>
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
                45%
              </div>
              <div className="text-gray-600">Avg Salary Increase</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-8 w-8 text-gold-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-heading-teal mb-1">
                90
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
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Detailed Case Studies
            </h2>
            <p className="text-xl text-gray-600">
              In-depth look at how we helped professionals achieve breakthrough results
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
                      <h3 className="text-xl font-bold text-heading-teal mb-2">{study.name}</h3>
                      <p className="text-gold-600 font-medium mb-2">{study.role}</p>
                      <p className="text-gray-600 text-sm mb-3">{study.company}</p>
                      <div className="flex items-center justify-center lg:justify-start mb-2">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
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
                          <h4 className="font-semibold text-heading-teal mb-2">The Challenge</h4>
                          <p className="text-gray-700">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-heading-teal mb-2">Our Solution</h4>
                          <p className="text-gray-700">{study.solution}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Results by Industry
            </h2>
            <p className="text-xl text-gray-600">
              Our proven track record across diverse industries and career levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-heading-teal">{stat.industry}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gold-600">{stat.avgIncrease}</div>
                    <div className="text-sm text-gray-600">Average Salary Increase</div>
                    <div className="text-lg font-semibold text-heading-teal">{stat.clients}</div>
                    <div className="text-sm text-gray-600">Clients Served</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
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
                      <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-heading-teal">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

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
