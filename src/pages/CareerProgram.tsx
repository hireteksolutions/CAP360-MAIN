import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Users,
  Target,
  BookOpen,
  MessageSquare,
  UserCircle,
  Briefcase,
  Crown,
  GraduationCap,
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import PaymentModal from "@/components/PaymentModal";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
function CareerProgram() {
  const modules = [
    {
      icon: Users,
      title: "Career Coaching",
      description:
        "Personal guidance from industry experts tailored to your specific goals and challenges",
      features: [
        "Weekly 60-minute coaching sessions",
        "Personalized career roadmap",
        "Goal setting and accountability",
        "Industry insights and trends",
        "Salary negotiation strategies",
      ],
    },
    {
      icon: GraduationCap,
      title: "Skill Development",
      description:
        "Identify and develop the key skills needed to advance in your chosen field",
      features: [
        "Skills gap analysis",
        "Customized learning plans",
        "Industry certification guidance",
        "Technical and soft skills training",
        "Progress tracking and feedback",
        "Upskilling & reskilling recommendations"
      ],
    },
    {
      icon: BookOpen,
      title: "LinkedIn Optimization",
      description:
        "Transform your LinkedIn profile into a powerful networking and job-hunting tool",
      features: [
        "Ranking on top in LinkedIn applications",
        "Complete profile makeover",
        "Keyword optimization",
        "Professional headline creation",
        "Content strategy planning",
        "Network expansion tactics",
        "LinkedIn engagement framework",
    
      ],
    },
    {
      icon: MessageSquare,
      title: "Interview Preparation",
      description:
        "Master the art of interviewing with comprehensive preparation and practice",
      features: [
        "Mock interview sessions",
        "Industry-specific questions",
        "STAR & CARL method training",
        "Salary negotiation practice",
        "Interview follow-up strategies",
        "Role-specific Q&A practice",
      ],
    },
    {
      icon: UserCircle,
      title: "Personal Branding Strategy",
      description:
        "Ace your interviews with structured preparation and focused practice",
      features: [
        "Crafting your professional pitch",
        "Online reputation management",
        "LinkedIn content & thought leadership guidance",
        "Personal branding toolkit",
        "Elevator pitch & networking messaging",
      ],
    },
    {
      icon: Briefcase,
      title: "From Goals to Growth – Expert Coaching Sessions",
      description:
        "Build a clear roadmap for a successful and fulfilling career",
      features: [
        "1:1 expert sessions (fortnightly/monthly depending on plan)",
        "Goal setting and progress tracking",
        "Role transitions, salary negotiation, or leadership path planning",
        "Personal branding toolkit",
        "Executive mindset & career agility coaching (senior tier)",
      ],
    },
    {
      icon: Crown,
      title:
        "Executive Presence & Leadership Development (For Executive Program Only)",
      description:
        "Elevate your executive impact with proven strategies and techniques",
      features: [
        "Enhancing gravitas, communication, and influence",
        "Stakeholder management and relationship building",
        "Decision-making & strategic thinking",
        "Executive storytelling & visibility",
        "Leadership agility & change management",
      ],
    },
    {
      icon: Target,
      title: "Job Search Strategy & Targeting",
      description: "Align your skills with the roles that matter most to you",
      features: [
        "Career goals alignment",
        "Industry & role mapping",
        "Smart job application techniques",
        "Daily/weekly job tracker tools",
        "Company targeting & referral hacks",
      ],
    },
  ];

  const programTiers = [
    {
      name: "Career Starter",
      duration: "1 Month",
      // price: "$997",
      description: "Perfect for recent graduates and career changers",
      includes: [
        "2 coaching sessions",
        "LinkedIn optimization",
        "Basic interview prep",
        "Skills assessment",
        "Email support",
        "Professionally Designed Resume (ATS-Compliant)",
      ],
    },
    {
      name: "Career Accelerator",
      duration: "2 Months",
      // price: "$1,797",
      popular: true,
      description: "Ideal for mid-career professionals seeking advancement",
      includes: [
        "4 coaching sessions",
        "All modules included",
        "Resume and LinkedIn optimization",
        "Mock interviews",
        "Interview Guidance + Industry Insights",
        "Networking strategies",
        "Email Support & Guidance Throughout",
      ],
    },
    {
      name: "Executive Leadership",
      duration: "3 Months",
      // price: "$2,997",
      description: "Comprehensive program for senior-level professionals",
      includes: [
        "6 Fortnightly sessions",
        "All modules plus executive training",
        "Leadership development",
        "Executive presence coaching",
        "Dedicated Placement Assistance (Active job search + referrals)",
        "Personal Branding & Positioning Strategy",
      ],
    },
  ];
  const successStories = [
    {
      name: "Kiran Patel",
      role: "Software Engineer → Senior Product Manager",
      company: "Microsoft",
      program: "Career Accelerator",
      results: {
        salaryIncrease: "45%",
        timeToOffer: "4 months",
        interviewSuccess: "70%",
      },
      testimonial:
        "The career coaching helped me transition from engineering to product management. The structured approach and personalized guidance were game-changers.",
      image:
        "https://images.unsplash.com/photo-1592621385612-4d7129426394?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Aanurag Awasthi",
      role: "Sales Head → Sales Director",
      company: "FMEG",
      program: "Executive Leadership",
      results: {
        salaryIncrease: "37%",
        timeToOffer: "3 months",
        interviewSuccess: "90%",
      },
      testimonial:
        "The comprehensive program not only helped me get promoted but also developed my leadership skills for long-term success.",
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Shruti Shinde",
      role: "Sr Consultant → Sr Manager Consulting",
      company: "Big4",
      program: "Career Accelerator",
      results: {
        salaryIncrease: "58%",
        timeToOffer: "2.5 months",
        interviewSuccess: "75%",
      },
      testimonial:
        "As a seasoned professional, I felt stuck in my career progression. This program provided the clarity and strategies I needed to take my career to the next level.",
      image:
        "https://images.unsplash.com/photo-1699075092694-d2d7d8f7f13f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const successMetrics = [
    { metric: "87%", description: "Receive job offers within 6 months" },
    { metric: "45%", description: "Average salary increase" },
    { metric: "92%", description: "Client satisfaction rate" },
    { metric: "45 days", description: "Average time to first interview" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
        <Helmet>
        <title>Career Advancement Program - Professional Coaching & Development | CAP 360</title>
        <meta name="description" content="Accelerate your career with our comprehensive coaching program. 1:1 coaching, LinkedIn optimization, interview prep. 87% get job offers within 6 months." />
        <meta name="keywords" content="career coaching program, professional development, career advancement, 1:1 coaching, LinkedIn optimization, interview preparation, skill development, salary negotiation" />
        <link rel="canonical" href="https://cap360.com/career-program" />
        <meta property="og:title" content="Career Advancement Program - Professional Coaching & Development | CAP 360" />
        <meta property="og:description" content="Accelerate your career with our comprehensive coaching program. 1:1 coaching, LinkedIn optimization, interview prep. 87% get job offers within 6 months." />
        <meta property="og:url" content="https://cap360.com/career-program" />
        <meta property="og:type" content="service" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Career Advancement Program",
          "description": "Comprehensive career coaching program with 1:1 sessions, LinkedIn optimization, and interview preparation",
          "provider": {
            "@type": "Organization",
            "name": "CAP 360"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Career Starter",
              "description": "1-month program for career changers"
            },
            {
              "@type": "Offer", 
              "name": "Career Accelerator",
              "description": "2-month program for mid-career professionals"
            },
            {
              "@type": "Offer",
              "name": "Executive Leadership", 
              "description": "3-month program for senior-level professionals"
            }
          ]
        })}
        </script>
      </Helmet>
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661274151793-173c09ced789?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>{" "}
        {/* Overlay for readability */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Career Advancement Program
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accelerate your professional growth with our comprehensive coaching
            program. Get personalized guidance, develop essential skills, and
            land your dream role.
          </p>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {successMetrics.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {item.metric}
                </div>
                <div className="text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Modules  */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Comprehensive Program Modules
            </h2>
            <p className="text-xl text-gray-600">
              Eight core areas designed to transform your career trajectory
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-icon rounded-lg flex items-center justify-center mb-4">
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-heading-teal">
                    {module.title}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tiers - Minimalist Design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Choose Your Program
            </h2>
            <p className="text-xl text-gray-600">
              Select the program duration that best fits your career goals and
              timeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programTiers.map((tier, index) => (
              <div key={index} className="relative">
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold-500 text-white px-6 py-2 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-gold-200 transition-colors h-full flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-heading-teal mb-2">
                      {tier.name}
                    </h3>
                    {/* <div className="text-5xl font-bold text-heading-teal mb-1">{tier.price}</div> */}
                    <div className="text-gray-500 mb-3">{tier.duration}</div>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {tier.includes.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* <PaymentModal
                      packageName={tier.name}
                      packagePrice={tier.price}
                      packageFeatures={tier.includes}
                    >
                      <Button className="w-full h-12 bg-gradient-icon hover:opacity-90 text-white rounded-xl">
                        Get Started
                      </Button>
                    </PaymentModal> */}
                  <ConsultationModal>
                    <Button className="w-full h-12 bg-gradient-icon hover:opacity-90 text-white rounded-xl">
                      Get Started
                    </Button>
                  </ConsultationModal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center relative">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              How It Works
            </h2>
            <p className="text-xl text-black-600">
              A proven process to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Assessment",
                description:
                  "We evaluate your current situation, goals, and career aspirations",
                bgColor: "bg-logo-green",
              },
              {
                step: "2",
                title: "Strategy",
                description:
                  "Create a personalized career advancement plan with clear milestones",
                bgColor: "bg-blue-500",
              },
              {
                step: "3",
                title: "Implementation",
                description:
                  "Work through modules with your dedicated coach and track progress",
                bgColor: "bg-logo-red",
              },
              {
                step: "4",
                title: "Success",
                description:
                  "Land interviews, negotiate offers, and achieve your career goals",
                bgColor: "bg-logo-orange",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative z-10">
                <div
                  className={`w-16 h-16 ${item.bgColor} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-heading-teal mb-2">
                  {item.title}
                </h3>
                <p className="text-black-600">{item.description}</p>
              </div>
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
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow relative"
              >
                {/* Centered Badge on Top */}
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-auto px-3 py-1 bg-gold-500 hover:bg-gold-600 text-xs shadow-md">
                  {story.program}
                </Badge>

                <CardHeader>
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                    <div className="mt-2 text-center">
                      <h3 className="font-semibold text-heading-teal">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-600">{story.role}</p>
                      <p className="text-sm font-medium text-logo-blue">
                        {story.company}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-600">
                        {story.results.salaryIncrease}
                      </div>
                      <div className="text-xs text-gray-600">
                        Salary Increase
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-logo-blue">
                        {story.results.timeToOffer}
                      </div>
                      <div className="text-xs text-gray-600">Span</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gold-600">
                        {story.results.interviewSuccess}
                      </div>
                      <div className="text-xs text-gray-600">
                        Interview Success
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm">
                    "{story.testimonial}"
                  </p>
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
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Start your transformation today with a free consultation call
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
}

export default CareerProgram;
