import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, Palette, Target, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import PaymentModal from "@/components/PaymentModal";

const ResumeServiceDetails = () => {
  const modules = [
    {
      icon: FileText,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems",
      details: [
        "Keyword research and integration based on your target role",
        "Formatting that maintains readability across all ATS platforms",
        "Section optimization for maximum parsing accuracy",
        "Industry-specific terminology and phrases",
        "File format optimization (PDF and Word compatibility)"
      ],
      timeframe: "2-3 hours"
    },
    {
      icon: Palette,
      title: "Professional Design",
      description: "Modern, clean layouts that impress hiring managers",
      details: [
        "Custom color schemes that reflect your industry",
        "Typography selection for optimal readability",
        "Visual hierarchy to highlight key achievements",
        "Brand consistency across all career documents",
        "Mobile-friendly formatting for on-the-go viewing"
      ],
      timeframe: "3-4 hours"
    },
    {
      icon: Target,
      title: "Content Strategy",
      description: "Strategic content creation that showcases your value",
      details: [
        "Achievement quantification using metrics and percentages",
        "Skill-to-job matching analysis and optimization",
        "Personal branding statement development",
        "Action verb optimization for impact",
        "Industry trend alignment and buzzword integration"
      ],
      timeframe: "4-5 hours"
    },
    {
      icon: Zap,
      title: "Performance Enhancement",
      description: "Advanced techniques to maximize your resume's impact",
      details: [
        "Psychological triggers to capture recruiter attention",
        "Strategic placement of key information",
        "Social proof integration and credibility signals",
        "Gap explanation and career transition smoothing",
        "Executive summary optimization for senior roles"
      ],
      timeframe: "2-3 hours"
    }
  ];

  const sampleResumes = [
    {
      title: "Software Engineer Resume",
      industry: "Technology",
      level: "Mid-Level",
      highlights: ["Clean technical layout", "Project showcase section", "Skills matrix"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=500&fit=crop",
      description: "Modern resume design optimized for tech roles with emphasis on projects and technical skills.",
      sampleUrl: "https://www.adobe.com/express/create/resume/template"
    },
    {
      title: "Marketing Manager Resume",
      industry: "Marketing",
      level: "Senior-Level",
      highlights: ["Campaign results focus", "Brand-aligned design", "ROI metrics"],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop",
      description: "Results-driven layout showcasing campaign successes and marketing achievements.",
      sampleUrl: "https://www.canva.com/resumes/templates/"
    },
    {
      title: "Executive Resume",
      industry: "Finance",
      level: "C-Suite",
      highlights: ["Executive summary", "Leadership achievements", "Board experience"],
      imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=500&fit=crop",
      description: "Premium executive format emphasizing leadership impact and strategic achievements.",
      sampleUrl: "https://resumegenius.com/resume-templates"
    },
    {
      title: "Healthcare Professional Resume",
      industry: "Healthcare",
      level: "Mid-Level",
      highlights: ["Clinical experience focus", "Certification display", "Patient care metrics"],
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=500&fit=crop",
      description: "Professional healthcare resume highlighting clinical skills and patient outcomes.",
      sampleUrl: "https://www.indeed.com/career-advice/resumes-cover-letters/resume-examples"
    },
    {
      title: "Creative Designer Resume",
      industry: "Design",
      level: "Senior-Level",
      highlights: ["Portfolio integration", "Creative layout", "Visual storytelling"],
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=500&fit=crop",
      description: "Eye-catching design portfolio resume for creative professionals.",
      sampleUrl: "https://www.behance.net/galleries/graphic-design/resume"
    },
    {
      title: "Sales Representative Resume",
      industry: "Sales",
      level: "Entry-Level",
      highlights: ["Achievement metrics", "Target performance", "Client relationship focus"],
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      description: "Results-oriented sales resume emphasizing performance and client success.",
      sampleUrl: "https://zety.com/resume-examples"
    },
    {
      title: "Data Scientist Resume",
      industry: "Technology",
      level: "Senior-Level",
      highlights: ["Technical skills matrix", "Project outcomes", "Algorithm expertise"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop",
      description: "Data-driven resume showcasing analytical skills and project impact.",
      sampleUrl: "https://www.overleaf.com/latex/templates/tagged/cv"
    },
    {
      title: "Teacher Resume",
      industry: "Education",
      level: "Mid-Level",
      highlights: ["Student achievement focus", "Curriculum development", "Educational innovation"],
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=500&fit=crop",
      description: "Educational resume highlighting teaching excellence and student outcomes.",
      sampleUrl: "https://www.livecareer.com/resume/examples"
    },
    {
      title: "Project Manager Resume",
      industry: "Business",
      level: "Senior-Level",
      highlights: ["Project delivery metrics", "Team leadership", "Budget management"],
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop",
      description: "Strategic project management resume showcasing leadership and delivery success.",
      sampleUrl: "https://www.myperfectresume.com/resume/examples"
    }
  ];

  const handleViewSample = (sampleUrl: string, title: string) => {
    window.open(sampleUrl, '_blank');
  };

  const processSteps = [
    {
      step: 1,
      title: "Information Gathering",
      description: "We collect your career history, achievements, and target role requirements",
      duration: "30 minutes"
    },
    {
      step: 2,
      title: "Research & Analysis",
      description: "Industry research and ATS optimization based on your target positions",
      duration: "2-3 hours"
    },
    {
      step: 3,
      title: "Design & Content Creation",
      description: "Professional design and strategic content development",
      duration: "6-8 hours"
    },
    {
      step: 4,
      title: "Review & Refinement",
      description: "Client feedback integration and final optimizations",
      duration: "2-4 hours"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>Resume Service Details - ATS Optimization & Professional Design | CAP 360</title>
        <meta name="description" content="Learn about CAP 360's resume creation process. ATS optimization, professional design, sample resumes for all industries. 4-step process to transform your career documents." />
        <meta name="keywords" content="resume service details, ATS optimization process, professional resume design, resume samples, resume creation process, resume writing methodology" />
        <link rel="canonical" href="https://cap360.com/resume-services/details" />
        <meta property="og:title" content="Resume Service Details - ATS Optimization & Professional Design | CAP 360" />
        <meta property="og:description" content="Learn about CAP 360's resume creation process. ATS optimization, professional design, sample resumes for all industries. 4-step process to transform your career documents." />
        <meta property="og:url" content="https://cap360.com/resume-services/details" />
        <meta property="og:type" content="service" />
      </Helmet>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link to="/resume-services" className="inline-flex items-center text-logo-blue hover:text-navy-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resume Services
        </Link>
      </div>

      {/* Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Resume Service Details
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive approach to creating resumes that get noticed by both ATS systems and hiring managers
          </p>
        </div>
      </section>

      {/* Service Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Our Resume Creation Process
            </h2>
            <p className="text-xl text-gray-600">
              Four specialized modules that transform your career story into a compelling narrative
            </p>
          </div>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-icon rounded-lg flex items-center justify-center mr-4">
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-heading-teal">{module.title}</CardTitle>
                        <Badge variant="outline" className="text-logo-blue border-logo-blue">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.timeframe}
                        </Badge>
                      </div>
                      <CardDescription className="mt-2">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 ml-16">
                    {module.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Resumes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Sample Resume Designs
            </h2>
            <p className="text-xl text-gray-600">
              Professional resume examples across different industries and career levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleResumes.map((sample, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                  <img 
                    src={sample.imageUrl} 
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-gold-500 hover:bg-gold-600">
                    {sample.level}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-heading-teal">{sample.title}</CardTitle>
                  <CardDescription>{sample.industry} • {sample.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm text-gray-800">Key Features:</h4>
                    {sample.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewSample(sample.sampleUrl, sample.title)}
                  >
                    View Full Sample
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Our 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From initial consultation to final delivery - here's how we create your perfect resume
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold-200 hidden md:block" />
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold relative z-10">
                    {step.step}
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-heading-teal">{step.title}</h3>
                      <Badge variant="outline" className="text-logo-blue border-logo-blue">
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Resume?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Get started with our professional resume services and land your dream job faster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PaymentModal 
              packageName="Premium Resume Package"
              packagePrice="₹3,499"
              packageFeatures={["Professional resume design", "ATS optimization", "Cover letter", "LinkedIn optimization"]}
            >
              <Button size="lg" className="bg-gradient-icon hover:opacity-90 text-white px-8 py-3">
                Get Started Now
              </Button>
            </PaymentModal>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-logo-blue px-8 py-3">
              Download Sample Pack
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeServiceDetails;