import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target, BookOpen, MessageSquare, Clock, Star, ArrowLeft, Calendar, Video, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import PaymentModal from "@/components/PaymentModal";

const CareerProgramDetails = () => {
  const detailedModules = [
    {
      icon: Users,
      title: "1:1 Career Coaching",
      duration: "Weekly 60-min sessions",
      description: "Personalized guidance from industry experts tailored to your specific goals and challenges",
      curriculum: [
        {
          week: "Weeks 1-2",
          topic: "Career Assessment & Goal Setting",
          activities: ["Comprehensive skills assessment", "Career vision mapping", "SMART goal development", "Industry analysis"]
        },
        {
          week: "Weeks 3-6",
          topic: "Strategic Career Planning",
          activities: ["Career roadmap creation", "Skill gap identification", "Network mapping", "Personal brand development"]
        },
        {
          week: "Weeks 7-12",
          topic: "Implementation & Optimization",
          activities: ["Job search strategy", "Application tracking", "Interview preparation", "Salary negotiation"]
        }
      ],
      tools: ["Career assessment tools", "Goal tracking dashboard", "Progress analytics", "Resource library"],
      outcomes: ["Clear career direction", "Actionable career plan", "Enhanced self-awareness", "Strategic thinking skills"]
    },
    {
      icon: Target,
      title: "Skill Development",
      duration: "Self-paced with weekly check-ins",
      description: "Identify and develop the key skills needed to advance in your chosen field",
      curriculum: [
        {
          week: "Week 1",
          topic: "Skills Gap Analysis",
          activities: ["Current skills audit", "Market demand research", "Priority skill identification", "Learning path design"]
        },
        {
          week: "Weeks 2-8",
          topic: "Skill Building Phase",
          activities: ["Online course enrollment", "Practice projects", "Peer learning groups", "Progress monitoring"]
        },
        {
          week: "Weeks 9-12",
          topic: "Skill Validation & Certification",
          activities: ["Portfolio development", "Certification exams", "Skills showcase creation", "Market readiness assessment"]
        }
      ],
      tools: ["Learning management system", "Skill tracking dashboard", "Practice environment", "Certification guidance"],
      outcomes: ["Market-relevant skills", "Professional certifications", "Enhanced employability", "Increased confidence"]
    },
    {
      icon: BookOpen,
      title: "LinkedIn Optimization",
      duration: "2-week intensive program",
      description: "Transform your LinkedIn profile into a powerful networking and job-hunting tool",
      curriculum: [
        {
          week: "Week 1",
          topic: "Profile Foundation",
          activities: ["Headline optimization", "Summary crafting", "Experience section enhancement", "Skills selection"]
        },
        {
          week: "Week 2",
          topic: "Content & Networking Strategy",
          activities: ["Content calendar creation", "Engagement tactics", "Network expansion plan", "Thought leadership development"]
        }
      ],
      tools: ["LinkedIn analytics", "Content scheduler", "Network analyzer", "Keyword optimizer"],
      outcomes: ["Professional online presence", "Increased profile views", "Quality networking connections", "Industry recognition"]
    },
    {
      icon: MessageSquare,
      title: "Interview Preparation",
      duration: "4-week intensive program",
      description: "Master the art of interviewing with comprehensive preparation and practice",
      curriculum: [
        {
          week: "Week 1",
          topic: "Interview Fundamentals",
          activities: ["STAR method training", "Common questions practice", "Personal story crafting", "Confidence building"]
        },
        {
          week: "Week 2",
          topic: "Industry-Specific Preparation",
          activities: ["Technical question prep", "Case study practice", "Role-playing exercises", "Industry insights"]
        },
        {
          week: "Week 3",
          topic: "Advanced Interview Techniques",
          activities: ["Behavioral interview mastery", "Panel interview strategies", "Virtual interview skills", "Body language coaching"]
        },
        {
          week: "Week 4",
          topic: "Negotiation & Follow-up",
          activities: ["Salary negotiation tactics", "Benefits discussion", "Offer evaluation", "Follow-up strategies"]
        }
      ],
      tools: ["Mock interview platform", "Question bank", "Video analysis", "Feedback system"],
      outcomes: ["Interview confidence", "Strong personal brand", "Negotiation skills", "Professional presence"]
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Software Engineer → Senior Product Manager",
      company: "Microsoft",
      program: "Career Accelerator",
      results: {
        salaryIncrease: "65%",
        timeToOffer: "4 months",
        interviewSuccess: "80%"
      },
      testimonial: "The career coaching helped me transition from engineering to product management. The structured approach and personalized guidance were game-changers.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Coordinator → Marketing Director",
      company: "Adobe",
      program: "Executive Leadership",
      results: {
        salaryIncrease: "85%",
        timeToOffer: "3 months",
        interviewSuccess: "90%"
      },
      testimonial: "The comprehensive program not only helped me get promoted but also developed my leadership skills for long-term success.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Johnson",
      role: "Recent Graduate → Business Analyst",
      company: "Goldman Sachs",
      program: "Career Starter",
      results: {
        salaryIncrease: "120%",
        timeToOffer: "2 months",
        interviewSuccess: "75%"
      },
      testimonial: "As a recent graduate, I was lost about my career direction. This program gave me clarity and the tools to land my dream job.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const programComparison = [
    {
      feature: "Coaching Sessions",
      starter: "6 sessions",
      accelerator: "12 sessions", 
      executive: "24 sessions"
    },
    {
      feature: "Module Access",
      starter: "Core modules",
      accelerator: "All modules",
      executive: "All modules + executive training"
    },
    {
      feature: "Support Level",
      starter: "Email support",
      accelerator: "Priority support",
      executive: "24/7 support access"
    },
    {
      feature: "Duration",
      starter: "3 months",
      accelerator: "6 months",
      executive: "12 months"
    },
    {
      feature: "Mock Interviews",
      starter: "2 sessions",
      accelerator: "5 sessions",
      executive: "Unlimited"
    },
    {
      feature: "LinkedIn Optimization",
      starter: "Basic optimization",
      accelerator: "Complete makeover",
      executive: "Personal branding strategy"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>Career Program Details - Complete Curriculum & Success Stories | CAP 360</title>
        <meta name="description" content="Detailed breakdown of CAP 360's career advancement program. View curriculum, success stories, and program comparison. Transform your career with expert coaching." />
        <meta name="keywords" content="career program details, coaching curriculum, career advancement training, professional development program, coaching modules, career success program" />
        <link rel="canonical" href="https://cap360.com/career-program/details" />
        <meta property="og:title" content="Career Program Details - Complete Curriculum & Success Stories | CAP 360" />
        <meta property="og:description" content="Detailed breakdown of CAP 360's career advancement program. View curriculum, success stories, and program comparison. Transform your career with expert coaching." />
        <meta property="og:url" content="https://cap360.com/career-program/details" />
        <meta property="og:type" content="service" />
      </Helmet>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link to="/career-program" className="inline-flex items-center text-logo-blue hover:text-navy-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Career Program
        </Link>
      </div>

      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Career Program Details
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dive deep into our comprehensive career advancement program designed to accelerate your professional growth
          </p>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Program Modules Deep Dive
            </h2>
            <p className="text-xl text-gray-600">
              Detailed curriculum and learning outcomes for each program module
            </p>
          </div>

          <div className="space-y-12">
            {detailedModules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-icon rounded-lg flex items-center justify-center mr-4">
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-heading-teal">{module.title}</CardTitle>
                        <Badge variant="outline" className="text-logo-blue border-logo-blue">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.duration}
                        </Badge>
                      </div>
                      <CardDescription className="mt-2 text-lg">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="ml-16">
                  {/* Curriculum */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-heading-teal mb-4">Curriculum Breakdown</h4>
                    <div className="space-y-4">
                      {module.curriculum.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="border-l-4 border-gold-500 pl-4">
                          <h5 className="font-medium text-gray-800">{phase.week}: {phase.topic}</h5>
                          <ul className="mt-2 space-y-1">
                            {phase.activities.map((activity, activityIndex) => (
                              <li key={activityIndex} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Resources */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-heading-teal mb-3">Tools & Resources</h4>
                      <ul className="space-y-2">
                        {module.tools.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-center text-gray-700">
                            <FileText className="h-4 w-4 text-logo-blue mr-2" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-heading-teal mb-3">Expected Outcomes</h4>
                      <ul className="space-y-2">
                        {module.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-center text-gray-700">
                            <Target className="h-4 w-4 text-green-500 mr-2" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real transformations from our career program participants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-heading-teal">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.role}</p>
                      <p className="text-sm font-medium text-logo-blue">{story.company}</p>
                    </div>
                  </div>
                  <Badge className="mb-3 bg-gold-500 hover:bg-gold-600">
                    {story.program}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-600">{story.results.salaryIncrease}</div>
                      <div className="text-xs text-gray-600">Salary Increase</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-logo-blue">{story.results.timeToOffer}</div>
                      <div className="text-xs text-gray-600">Time to Offer</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gold-600">{story.results.interviewSuccess}</div>
                      <div className="text-xs text-gray-600">Interview Success</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm">"{story.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Program Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Choose the program tier that best fits your career goals and timeline
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gradient-hero text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Features</th>
                  <th className="px-6 py-4 text-center">Career Starter</th>
                  <th className="px-6 py-4 text-center">Career Accelerator</th>
                  <th className="px-6 py-4 text-center">Executive Leadership</th>
                </tr>
              </thead>
              <tbody>
                {programComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-800">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.starter}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.accelerator}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row.executive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Start your career transformation today with our comprehensive coaching program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PaymentModal 
              packageName="Career Accelerator"
              packagePrice="$1,797"
              packageFeatures={["12 coaching sessions", "All modules included", "Resume optimization", "Mock interviews"]}
            >
              <Button size="lg" className="bg-gradient-icon hover:opacity-90 text-white px-8 py-3">
                Start Your Journey
              </Button>
            </PaymentModal>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-logo-blue px-8 py-3">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerProgramDetails;