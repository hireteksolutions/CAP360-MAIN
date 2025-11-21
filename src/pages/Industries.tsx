import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Stethoscope, 
  Cpu, 
  TrendingUp, 
  Briefcase, 
  GraduationCap,
  Factory,
  Landmark,
  ShoppingCart,
  Zap,
  Crown,
  Target,
  Users,
  Award,
  ArrowRight
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

const Industries = () => {
  const industries = [
    {
      icon: <Cpu className="h-8 w-8 text-heading-teal" />,
      title: "Technology & Software",
      description: "From startups to Fortune 500 tech companies",
      positions: ["CTO", "VP Engineering", "Product Manager", "Tech Lead"]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-heading-teal" />,
      title: "Financial Services",
      description: "Banking, fintech, investment management",
      positions: ["CFO", "VP Finance", "Risk Manager", "Investment Director"]
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-heading-teal" />,
      title: "Healthcare & Pharma",
      description: "Medical devices, pharmaceuticals, digital health",
      positions: ["CMO", "VP Clinical Affairs", "Medical Director", "VP R&D"]
    },
    {
      icon: <Factory className="h-8 w-8 text-heading-teal" />,
      title: "Manufacturing",
      description: "Industrial automation, supply chain, operations",
      positions: ["COO", "VP Operations", "Plant Manager", "Supply Chain Director"]
    },
    {
      icon: <Landmark className="h-8 w-8 text-heading-teal" />,
      title: "Consulting",
      description: "Strategy, management, and specialized consulting",
      positions: ["Partner", "Principal", "Engagement Manager", "Director"]
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-heading-teal" />,
      title: "Retail & E-commerce",
      description: "Digital transformation and customer experience",
      positions: ["CDO", "VP Marketing", "Head of E-commerce", "VP Customer Success"]
    },
    {
      icon: <Zap className="h-8 w-8 text-heading-teal" />,
      title: "Energy & Utilities",
      description: "Renewable energy, oil & gas, utilities",
      positions: ["VP Business Development", "Chief Sustainability Officer", "General Manager"]
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-heading-teal" />,
      title: "Education & EdTech",
      description: "Higher education and educational technology",
      positions: ["VP Academic Affairs", "Chief Innovation Officer", "Dean"]
    }
  ];

  const cxoServices = [
   
    {
      icon: <Target className="h-12 w-12 text-logo-red" />,
      title: "Board Positioning",
      description: "Position yourself for board opportunities with compelling executive profiles.",
      features: ["Board readiness assessment", "Director resume format", "Governance expertise highlight", "Network strategy"]
    },
    {
      icon: <Users className="h-12 w-12 text-logo-green" />,
      title: "Executive Search Optimization",
      description: "Optimize your profile for executive recruiters and search firms.",
      features: ["Recruiter-friendly format", "ATS optimization", "Industry keyword strategy", "Executive database presence"]
    },
     {
      icon: <Crown className="h-12 w-12 text-logo-orange" />,
      title: "Executive Resume Writing",
      description: "Sophisticated resumes that command attention from board members and executive search firms.",
      features: ["Strategic positioning", "Executive branding", "C-suite formatting", "Leadership narrative"]
    },
    {
      icon: <Award className="h-12 w-12 text-heading-teal" />,
      title: "Leadership Coaching",
      description: "One-on-one coaching for career transitions and leadership development.",
      features: ["Career strategy", "Interview coaching", "Negotiation support", "Leadership presence"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Industries We Serve | C-Suite & Executive Career Services | CAP 360</title>
        <meta 
          name="description" 
          content="Specialized career services for executives across technology, finance, healthcare, manufacturing, and more. Expert positioning for CXO-level professionals and board opportunities." 
        />
        <meta name="keywords" content="executive career services, CXO resume writing, board positioning, C-suite careers, industry expertise, executive coaching" />
        <link rel="canonical" href="https://cap360.ca/industries" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Executive Career Services by Industry",
            "provider": {
              "@type": "Organization",
              "name": "CAP 360"
            },
            "description": "Specialized career services for C-suite executives across multiple industries",
            "serviceType": "Executive Career Consulting",
            "areaServed": ["Technology", "Finance", "Healthcare", "Manufacturing", "Consulting"]
          })}
        </script>
      </Helmet>

      <div className="bg-background">
        {/* Hero Section */}
     <section
  className="relative bg-cover bg-center text-white py-20"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* overlay for readability */}
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Industry Expertise for
        <span className="block text-logo-orange">Executive Success</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Specialized career services tailored to your industry's unique challenges and opportunities.
        From C-suite positioning to board readiness.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ConsultationModal>
          <Button size="lg" className="bg-white text-primary hover:bg-secondary">
            Discuss Your Industry
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </ConsultationModal>
      </div>
    </div>
  </div>
</section>


        {/* Industries We Serve */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-heading-teal mb-6">
                Industries We Serve
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Deep industry knowledge across sectors where executives make the biggest impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-border">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {industry.icon}
                    </div>
                    <CardTitle className="text-xl text-primary">{industry.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm text-heading-teal mb-2">Key Positions:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {industry.positions.map((position, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-logo-orange rounded-full mr-2"></div>
                          {position}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CXO-Level Services */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-heading-teal mb-6">
                C-Suite & Executive Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Specialized services designed for senior executives, board members, and C-suite professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cxoServices.map((service, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-border">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-gradient-icon rounded-full mr-3"></div>
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-heading-teal mb-2">500+</div>
                <div className="text-muted-foreground">Executives Placed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-heading-teal mb-2">50+</div>
                <div className="text-muted-foreground">Board Appointments</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-heading-teal mb-2">85%</div>
                <div className="text-muted-foreground">C-Suite Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-heading-teal mb-2">15+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
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
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who have transformed their careers
            with our expert guidance
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
        View Samples
      </Button> */}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Industries;