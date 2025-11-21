import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Target, BookOpen } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import gurpriit1 from "@/assets/gurpriit1.jpg";
import Bakshish1 from "@/assets/Bakshish1.jpg";
import samreen1 from "@/assets/samreen1.png";
import anshul1 from "@/assets/anshul1.png";
import { Helmet } from "react-helmet-async";

const About = () => {
  const team = [
    {
      name: "Gurpriit Singh Anand",
      role: " CEO , Founder CAP360",
      credentials: "",
      image: gurpriit1,
      bio: "Founder and Career Coach at CAP360, dedicated to empowering professionals to unlock their potential and reach new career heights. With deep expertise in executive coaching, strategic career planning, and leadership development, he partners with clients—from rising managers to C-suite leaders—to navigate transitions, strengthen their leadership presence, and achieve purposeful growth. His approach combines vision, practical insight, and trusted mentorship.",
      specialties: [
        "Executive Coaching",
        "Career Transitions",
        "Leadership Development",
        "Startup Mentor",
        "Professional Branding",
        "Strategic Career Planning"
      ],
    },
    {
      name: "Nikhat",
      role: "Senior Resume Writer & Brand Strategist",
      credentials: "CPRW, NCDA, 15+ Years Experience",
      image: samreen1,
      bio: "Professional resume writer specializing in technology and diverse industry sectors. She crafts compelling, customized career documents — including resumes, cover letters, and LinkedIn profiles — that not only highlight clients’ strengths but also align with industry expectations and ATS (Applicant Tracking System) requirements. Her expertise ensures that each document effectively showcases achievements, enhances professional branding, and consistently helps candidates secure interviews and advance their careers.",
      specialties: ["ATS Optimization", "Tech Industry", "Finance Industry"],
    },
    {
      name: "Bakshish Kaur",
      role: "Career Development Specialist",
      credentials: "10+ Years Experience",
      image: Bakshish1,
      bio: "Passionate about guiding professionals through key career transitions. With expertise in personal branding, leadership positioning, and strategy, she helps senior leaders align with high-impact opportunities at CAP360.",
      specialties: [
        "Career Psychology",
        "Interview Coaching",
        "Confidence Building",
      ],
    },
    {
      name: "Anshul Singh",
      role: "LinkedIn & Personal Branding Expert",
      credentials: "MBA, Digital Marketing Specialist, 16+ Years Experience",
      image:anshul1,
      bio: "Former LinkedIn employee who understands the platform inside and out. Anshul helps professionals build powerful online presence and expand their networks.",
      specialties: [
        "LinkedIn Optimization",
        "Personal Branding",
        "Digital Networking",
      ],
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "We measure our success by your career achievements. Every strategy is designed to deliver tangible outcomes.",
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description:
        "No cookie-cutter solutions. We create customized strategies that align with your unique goals and circumstances.",
    },
    {
      icon: Award,
      title: "Industry Expertise",
      description:
        "Our team brings decades of combined experience from HR, recruiting, and career development across all industries.",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description:
        "We stay current with market trends, hiring practices, and industry changes to give you the competitive edge.",
    },
  ];

  const stats = [
    { number: "500+", label: "Professionals Transformed" },
    { number: "40+", label: "Years Combined Experience" },
    { number: "95%", label: "Client Success Rate" },
    { number: "25+", label: "Industries Served" },
  ];

  return (
    <div className="min-h-screen">
        <Helmet>
        <title>About Us - Meet Our Expert Career Development Team | CAP 360</title>
        <meta name="description" content="Meet the expert team behind CAP 360's career success. Our certified resume writers and career coaches have 15+ years experience helping professionals achieve their goals." />
        <meta name="keywords" content="career coaches, resume writers, professional team, career experts, CPRW certified, career development specialists, about CAP 360" />
        <link rel="canonical" href="https://cap360.com/about" />
        <meta property="og:title" content="About Us - Meet Our Expert Career Development Team | CAP 360" />
        <meta property="og:description" content="Meet the expert team behind CAP 360's career success. Our certified resume writers and career coaches have 15+ years experience helping professionals achieve their goals." />
        <meta property="og:url" content="https://cap360.com/about" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About CAP 360",
          "description": "Learn about CAP 360's expert team of career coaches and resume writers",
          "url": "https://cap360.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "CAP 360",
            "foundingDate": "2018",
            "founder": {
              "@type": "Person",
              "name": "Gurpriit Singh Anand",
              "jobTitle": "Founder & Senior Career Coach"
            },
            "employee": [
              {
                "@type": "Person",
                "name": "Gurpriit Singh Anand",
                "jobTitle": "Founder & Senior Career Coach"
              },
              {
                "@type": "Person", 
                "name": "Nikhat",
                "jobTitle": "Senior Resume Writer & Brand Strategist"
              }
            ]
          }
        })}
        </script>
      </Helmet>
      {/* Header Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // professional team image
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>{" "}
        {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Meet Our Expert Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dedicated professionals with proven track records in career
            development, resume writing, and personal branding. We're here to
            guide your journey to success.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-6">
                Our Story
              </h2>
              <h6 className="text-xl lg:text-2xl font-bold text-gold-500 mb-6">
                Empowering Careers, One Step at a Time
              </h6>
              <div className="space-y-4 text-gray-700">
                <p>
                  At Career Advancement Program (CAP), we believe that a
                  fulfilling career isn’t built by chance — it’s built by
                  strategy, support, and the right tools. Founded with a mission
                  to bridge the gap between talent and opportunity, CAP360 was
                  created to help professionals at every stage of their journey
                  — from fresh graduates to seasoned executives.
                </p>
                <p>
                  What started as a resume service has grown into a
                  full-spectrum career growth platform, offering personalized
                  coaching, job search support, executive branding, and
                  placement assistance. Over the years, we’ve helped hundreds of
                  individuals clarify their direction, build impactful profiles,
                  and land roles that truly match their potential
                </p>
                <p>
                  We understand that today’s job market is fast-changing,
                  competitive, and often overwhelming. That’s why CAP360 combines
                  industry insight, strategic planning, and human connection to
                  guide our clients confidently toward their goals.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm">Success Stories</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section - moved to left */}
            <div className="relative order-1 lg:order-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              {/* <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white p-4 rounded-lg">
        <div className="text-2xl font-bold">5K+</div>
        <div className="text-sm">Success Stories</div>
      </div> */}
            </div>

            {/* Text Section - moved to right */}
            <div className="order-2 lg:order-2">
              {/* <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-6">
        Our Story
      </h2>
      <h6 className="text-xl lg:text-2xl font-bold text-gold-500 mb-6">
        Empowering Careers, One Step at a Time
      </h6> */}
              <div className="space-y-4 text-gray-700">
                <p>
                  CAP 360 was founded in 2018 with a simple mission: to help
                  professionals at every career stage achieve their full
                  potential. What started as a small resume writing service has
                  evolved into a comprehensive career development platform.
                </p>
                <p>
                  Our founder, <b>Gurpriit Singh Anand</b>, experienced firsthand the
                  challenges of career advancement in corporate India. After
                  helping colleagues land dream jobs through informal coaching,
                  He realized the need for professional, personalized career
                  guidance.
                </p>
                <p>
                  Today, we've helped over 5,000 professionals across 25+
                  industries secure interviews, negotiate better salaries, and
                  build fulfilling careers. Our success comes from combining
                  industry expertise with personalized attention to each
                  client's unique journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the career professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto sm:mx-0 border-2 border-blue"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-heading-teal mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gold-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {member.credentials}
                      </p>
                      <p className="text-gray-700 mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {member.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-icon rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-heading-teal">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
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

export default About;
