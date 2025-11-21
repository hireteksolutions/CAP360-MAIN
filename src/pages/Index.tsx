import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Star, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/ConsultationModal";
import { Helmet } from 'react-helmet-async';
import whyChooseBackground from "@/assets/why-choose-background.jpg";
import ResumeAuditModal from "@/components/ResumeAuditModal";
import test_img from "@/assets/Test_img.png";
const Index = () => {
  const features = [
    {
      icon: Users,
      title: "1:1 Career Coaching",
      description:
        "Get personalized coaching with expert guidance, tailored career plans, weekly sessions, and actionable strategies to help you grow, pivot, or succeed in your professional journey.",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: CheckCircle,
      title: "Leverage Industry Network",
      description:
        "Leverage strong industry network to access hidden job opportunities, insider insights, referrals, and connections that give you a competitive edge in today’s fast-changing job market.",
      image:
        "https://images.unsplash.com/photo-1698047681452-08eba22d0c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: Award,
      title: "Targeted Job Application",
      description:
        "Identify and target the right roles that match your skills and goals—customizing each application to boost visibility and increase your chances of success",
      image:
        "https://images.unsplash.com/photo-1561489422-45de3d015e3e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Professionals Transformed",
    },
    {
      number: "95%",
      label: "Interview Success Rate",
    },
    {
      number: "90 days",
      label: "Average Turnaround",
    },
    {
      number: "4.9/5",
      label: "Client Satisfaction",
    },
  ];
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CAP 360 - Career Advancement & Professional Resume Design </title>
        <meta name="description" content="Transform your career with expert resume design and personalized career advancement programs. Professional services for job seekers and career growth." />
        <meta name="keywords" content="resume design, career advancement, professional resume writing, job search, career coaching, LinkedIn optimization, interview preparation, career development, resume score, ATS score, job placement" />
        <link rel="canonical" href="https://cap360.com/" />
        <meta property="og:title" content="CAP 360 - Career Advancement & Professional Resume Design" />
        <meta property="og:description" content="Transform your career with expert resume design and personalized career advancement programs. Professional services for job seekers and career growth." />
        <meta property="og:url" content="https://cap360.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CAP 360",
          "description": "Career advancement and Professional resume design",
          "url": "https://cap360.com",
          "logo": "https://cap360.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "telephone": "+91-9599901561",
            "email": "cap@hiretek.in",
            "areaServed": "IN",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "H - 7, Lajpat Nagar 3",
            "addressLocality": "New Delhi",
            "addressCountry": "IN"
          },
          "offers": {
            "@type": "Offer",
            "name": "Career Advancements",
            "description": "Career advancement programs and Professional resume writing "
          }
        })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-40 px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Career Deserves More –{" "}
            <span style={{ color: "#FF791A" }}>We'll Help You Get There</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200 leading-relaxed">
            Transform your career with expert and personalized advancement
            programs designed for mid to senior level hires. Join the elite
            who've already taken the next step to success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ConsultationModal>
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-gold-600 text-white px-8 py-3"
              >
                Book Free Consultation
              </Button>
            </ConsultationModal>
            <ResumeAuditModal>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-navy-900 px-8 py-3"
              >
                Get Free Resume Audit
              </Button>
            </ResumeAuditModal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(to right, #e4e0e0, #e4e0e0)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="text-3xl font-bold text-black-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-orange-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{ background: "linear-gradient(to left, #dadadbff, #dadadbff)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              Why Choose CAP 360?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine industry expertise with personalized service to deliver
              results that matter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-icon rounded-full flex items-center justify-center mb-4 -mt-12 shadow-lg bg-white">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-orange-500">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section
        className="py-20 bg-gray-50"
        style={{ background: "linear-gradient(to right, #d6d6d6, #d6d6d6)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Career Advancement Program Card */}
            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div
                className="absolute z-0 opacity-0.2 pointer-events-none hidden md:block"
                style={{ marginTop: "101px", marginRight: "116px", right: 0 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6770/6770626.png"
                  alt="Career Path Icon"
                  className="w-28 h-28"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-500">
                  Career Advancement Program
                </CardTitle>
                <CardDescription>
                  Comprehensive coaching to accelerate your professional growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>1:1 coaching sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>LinkedIn optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>Interview preparation</span>
                  </li>
                </ul>
                <Link to="/career-program">
                  <Button className="w-full bg-gradient-icon hover:opacity-90 text-white">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resume Design Services Card */}
            <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div
                className="absolute z-0 opacity-0.2 pointer-events-none hidden md:block"
                style={{ marginTop: "99px", marginRight: "116px", right: 0 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3176/3176382.png"
                  alt="Resume Icon"
                  className="w-28 h-28"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-orange-500">
                  Resume Design Services
                </CardTitle>
                <CardDescription>
                  Professional resumes crafted to pass ATS systems and impress
                  hiring managers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>ATS-optimized formatting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>Industry-specific keywords</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                    <span>24-48 hour turnaround</span>
                  </li>
                </ul>
                <Link to="/resume-services">
                  <Button className="w-full bg-gradient-icon hover:opacity-90 text-white">
                    View Packages <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

         {/* Free Resume Audit CTA */}
<section className="py-20 bg-[#E4E0E0]">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="bg-white rounded-2xl p-10 lg:p-16 text-gray-900 relative overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Content */}
        <div>
          <h2  className="text-4xl lg:text-5xl font-bold mb-6 leading-snug text-gray-900" 
  style={{ color: "#FF791A" }}
>
            Get Your Free Resume Audit
          </h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">
            Discover what's holding your resume back with our expert analysis. 
            Get personalized feedback and actionable insights to improve your job search success.
          </p>

          <ul className="space-y-4 mb-10 text-gray-800">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-heading-teal mr-3 mt-1" />
              <span>Professional resume review by experts</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-heading-teal mr-3 mt-1" />
              <span>ATS compatibility assessment</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-heading-teal mr-3 mt-1" />
              <span>Personalized improvement recommendations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-heading-teal mr-3 mt-1" />
              <span>100% free with no obligations</span>
            </li>
          </ul>

          <ResumeAuditModal>
            <Button 
              size="lg" 
              className="bg-gradient-icon text-white hover:opacity-90 font-semibold px-10 py-4 rounded-xl shadow-md"
            >
              Get My Free Audit
            </Button>
          </ResumeAuditModal>
        </div>
        
        {/* RIGHT: Image + highlight box */}
         <div className="flex justify-center lg:justify-end">
          <img 
            src={test_img} 
            alt="Resume Audit" 
            className="w-80 lg:w-[500px] xl:w-[560px] h-auto object-contain rounded-2xl shadow-lg border border-gray-200"
          />
        </div>
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
  );
};
export default Index;
