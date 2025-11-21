import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Globe, Plane, FileText, Users, Building2, Map, Briefcase, Award } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import internationalHeroBackground from "@/assets/international-hero-background.jpg";

const InternationalJobSupport = () => {

  const internationalServices = [
    {
      icon: FileText,
      title: "International Resume Adaptation",
      description: "Resume formats tailored to specific country requirements and cultural expectations.",
      features: [
        "Country-specific CV formatting",
        "Cultural adaptation guidance",
        "International ATS optimization",
        "Multiple language support"
      ]
    },
    {
      icon: Globe,
      title: "Global Job Market Navigation",
      description: "Expert guidance through international job markets and application processes.",
      features: [
        "Target country job market analysis",
        "International recruiter connections",
        "Work permit & visa guidance",
        "Salary negotiation by region"
      ]
    },
    {
      icon: Users,
      title: "Cross-Cultural Interview Prep",
      description: "Prepare for interviews across different cultures and business environments.",
      features: [
        "Cultural communication coaching",
        "International interview etiquette",
        "Time zone interview coordination",
        "Virtual interview best practices"
      ]
    },
    {
      icon: Plane,
      title: "Relocation Support",
      description: "Complete assistance for international career transitions and relocations.",
      features: [
        "Visa application guidance",
        "Relocation planning assistance",
        "Compensation package analysis",
        "Settling-in resources"
      ]
    }
  ];

  const popularDestinations = [
    { country: "United States", icon: "🇺🇸", sectors: "Tech, Finance, Healthcare" },
    { country: "Canada", icon: "🇨🇦", sectors: "IT, Engineering, Healthcare" },
    { country: "United Kingdom", icon: "🇬🇧", sectors: "Finance, Tech, Consulting" },
    { country: "Germany", icon: "🇩🇪", sectors: "Engineering, Manufacturing, IT" },
    { country: "Australia", icon: "🇦🇺", sectors: "Mining, Tech, Healthcare" },
    { country: "UAE", icon: "🇦🇪", sectors: "Construction, Hospitality, Finance" },
    { country: "Singapore", icon: "🇸🇬", sectors: "Finance, Tech, Logistics" },
    { country: "Netherlands", icon: "🇳🇱", sectors: "Tech, Logistics, Agriculture" }
  ];

  const processSteps = [
    {
      icon: Building2,
      title: "Market Assessment",
      description: "Evaluate your profile against target international markets"
    },
    {
      icon: FileText,
      title: "Document Preparation",
      description: "Adapt your resume and credentials for international standards"
    },
    {
      icon: Map,
      title: "Strategic Application",
      description: "Target high-potential opportunities in your destination country"
    },
    {
      icon: Briefcase,
      title: "Interview & Offer",
      description: "Navigate international interviews and negotiate global packages"
    }
  ];

  const stats = [
    { value: "50+", label: "Countries Served" },
    { value: "92%", label: "Visa Success Rate" },
    { value: "3000+", label: "International Placements" },
    { value: "45 Days", label: "Average Time to Offer" }
  ];

  return (
    <>
      <Helmet>
        <title>International Job Support | Global Career Services</title>
        <meta name="description" content="Expert support for international job seekers. Navigate global job markets, work visas, and relocations with proven strategies for success in 50+ countries." />
        <meta name="keywords" content="international jobs, work abroad, overseas career, global job search, work visa, expat jobs, international recruitment" />
        <link rel="canonical" href="https://yourdomain.com/international-job-support" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "International Job Support",
            "description": "Comprehensive support for professionals seeking international career opportunities",
            "provider": {
              "@type": "Organization",
              "name": "Your Company Name"
            },
            "areaServed": "Worldwide",
            "serviceType": "International Career Coaching"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1584931423298-c576fda54bd2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // professional team image
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>{" "}
        {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-4" variant="secondary">Global Opportunities</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            International Job Support
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
           Your gateway to global career opportunities. We help professionals like you navigate international 
            job markets, secure work visas, and land dream jobs in 50+ countries.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Services */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">Comprehensive International Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {internationalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in border-2 hover:border-logo-orange" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-icon rounded-lg transition-all duration-300 hover:scale-110">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-logo-blue">{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 group">
                        <CheckCircle2 className="h-5 w-5 text-logo-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-gradient-to-br from-logo-green/5 to-logo-orange/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">Popular Destinations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((dest, index) => (
              <Card key={index} className="hover:border-logo-green hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in group bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardHeader>
                  <div className="text-4xl text-center mb-2 group-hover:scale-110 transition-transform duration-300">{dest.icon}</div>
                  <CardTitle className="text-center text-lg text-logo-blue">{dest.country}</CardTitle>
                  <CardDescription className="text-center text-sm">{dest.sectors}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">How We Help You Go Global</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in group border-2 hover:border-logo-orange" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-icon rounded-full w-fit group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-logo-orange mb-2">Step {index + 1}</div>
                  <CardTitle className="text-lg text-logo-blue">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-logo-orange/5 to-logo-green/5">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <Card className="border-logo-green border-2 shadow-lg hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-icon rounded-full w-fit hover:scale-110 transition-all duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-heading-teal">Why Choose Our International Support?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-logo-green shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold mb-1 text-logo-blue">Global Network</h3>
                    <p className="text-sm text-muted-foreground">Partnerships with recruiters and employers in 50+ countries</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-logo-green shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold mb-1 text-logo-blue">Visa Expertise</h3>
                    <p className="text-sm text-muted-foreground">Guidance through complex immigration and work permit processes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-logo-green shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold mb-1 text-logo-blue">Cultural Intelligence</h3>
                    <p className="text-sm text-muted-foreground">Navigate cultural differences in hiring and workplace practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-logo-green shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold mb-1 text-logo-blue">End-to-End Support</h3>
                    <p className="text-sm text-muted-foreground">From job search to relocation and settling in</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}

       <section   className="relative py-20 bg-cover bg-center bg-no-repeat text-white"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            >
       <div className="absolute inset-0 bg-black/60"></div> {/* Overlay */}
              <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Take Your Career Global?
                </h2>
                <p className="text-xl mb-8 text-gray-300">
               Let's discuss your international career goals and create your personalized roadmap to success.
                </p>
           <ConsultationModal>
                    <Button
                      size="lg"
                      className="bg-gradient-icon hover:opacity-90 text-white px-8 py-3"
                    >
                       Start Your Executive Journey
                    </Button>
                  </ConsultationModal>
        </div>
      </section>

    </>
  );
};

export default InternationalJobSupport;
