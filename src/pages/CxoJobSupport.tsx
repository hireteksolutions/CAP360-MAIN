import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Briefcase, Target, Users, TrendingUp, Award, Shield, Zap } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import cxoHeroBackground from '@/assets/cxoHeroBackground.jpg';

const CxoJobSupport = () => {

  const cxoServices = [
    {
      icon: Briefcase,
      title: "Customized Applications",
      description: "We create ATS-optimized resumes and personalized cover letters that highlight your leadership achievements and strategic impact.",
      features: [
        "ATS-optimized for executive roles",
        "Strategic accomplishment framing",
        "Board presentation format",
        "Executive summary optimization"
      ]
    },
    {
      icon: Target,
      title: "Strategic Networking",
      description: "Leverage our extensive network to connect with industry leaders and uncover hidden opportunities",
      features: [
        "Executive recruiter networking",
        "Board placement strategies",
        "Private equity connections",
        "Succession planning insights"
      ]
    },
    {
      icon: Users,
      title: "C-Suite Interview Coaching",
      description: "Preparation for board-level interviews and stakeholder meetings.",
      features: [
        "Board interview preparation",
        "Stakeholder presentation coaching",
        "Executive presence training",
        "Negotiation strategy sessions"
      ]
    },
    {
      icon: TrendingUp,
      title: "Profile Enhancement",
      description: "Our experts refine your LinkedIn and executive bios to resonate with hiring committees and board members.",
      features: [
        "LinkedIn executive optimization",
        "Thought leadership content strategy",
        "Speaking engagement positioning",
        "Media relations guidance"
      ]
    }
  ];

  const cxoRoles = [
    "Chief Executive Officer (CEO)",
    "Chief Financial Officer (CFO)",
    "Chief Technology Officer (CTO)",
    "Chief Operating Officer (COO)",
    "Chief Marketing Officer (CMO)",
    "Chief Human Resources Officer (CHRO)",
    "Chief Information Officer (CIO)",
    "Chief Strategy Officer (CSO)",
    "Managing Director",
    "President",
    "Vice President",
    "Board Member"
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Executive-Level Expertise",
      description: "Our team has placed hundreds of C-suite executives across Fortune 500 companies."
    },
    {
      icon: Shield,
      title: "Confidential Process",
      description: "Complete discretion guaranteed throughout your executive job search."
    },
    {
      icon: Zap,
      title: "Fast-Track Results",
      description: "70% of our C-suite clients receive offers within 90 days."
    }
  ];

  return (
    <>
      <Helmet>
        <title>CXO Level Job Support | Executive Career Services</title>
        <meta name="description" content="Specialized job support for C-suite executives. Expert guidance for CEOs, CFOs, CTOs, and other CXO-level positions with proven success in executive placements." />
        <meta name="keywords" content="CXO jobs, executive job search, CEO coaching, CFO placement, C-suite careers, executive resume, board positions" />
        <link rel="canonical" href="https://yourdomain.com/cxo-job-support" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "CXO Level Job Support",
            "description": "Specialized career support for C-suite executives and senior leaders",
            "provider": {
              "@type": "Organization",
              "name": "Your Company Name"
            },
            "areaServed": "Worldwide",
            "serviceType": "Executive Career Coaching"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-700 hover:scale-110" style={{ backgroundImage: `url(${cxoHeroBackground})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-logo-blue/95 via-logo-blue/90 to-logo-green/80 backdrop-blur-[2px]" />
        <div className="container mx-auto max-w-6xl text-center relative z-10 animate-fade-in">
          {/* <Badge className="mb-4 animate-scale-in shadow-lg bg-logo-orange text-white border-none" variant="secondary">C-Suite Excellence</Badge> */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
            C-Suite Excellence
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Accelerate your executive career with specialized support for C-suite and senior leadership positions. 
            Our proven strategies help you land board-level roles faster.
          </p>
          <ConsultationModal>
            <Button size="lg" className="bg-logo-orange hover:bg-logo-red text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Schedule Executive Consultation
            </Button>
          </ConsultationModal>
        </div>
      </section>

      {/* CXO Services */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">Comprehensive C-Suite Services</h2>
          <div>
            <p className="text-center mb-12 max-w-4xl mx-auto text-lg text-muted-foreground animate-fade-in">
              Our CXO Job Support program is designed for senior leaders navigating their next big career move. Whether you’re seeking your next CXO, CTO, or VP opportunity, we provide strategic assistance to help you stand out, connect with decision-makers, and unlock the right roles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {cxoServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in border-2 hover:border-logo-green" style={{ animationDelay: `${index * 0.1}s` }}>
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

      {/* CXO Roles We Support */}
      <section className="py-16 px-4 bg-gradient-to-br from-logo-blue/5 to-logo-green/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">Executive Roles We Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cxoRoles.map((role, index) => (
              <Card key={index} className="text-center hover:border-logo-orange hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="pt-6">
                  <p className="font-medium text-sm text-logo-blue">{role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in text-heading-teal">Why Leaders Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in group border-2 hover:border-logo-green" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-icon rounded-full w-fit group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-logo-blue">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
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
                  Ready to Advance Your Executive Career?
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                Join hundreds of successful C-suite executives who accelerated their careers with our support.
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

export default CxoJobSupport;
