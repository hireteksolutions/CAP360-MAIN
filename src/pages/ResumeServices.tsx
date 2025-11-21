import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Clock, Users, XCircle } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";
import ConsultationModal from "@/components/ConsultationModal";
import { Helmet } from "react-helmet-async";

const ResumeServices = () => {
  const packages = [
    {
      name: "Basic",
      price: "₹1,999",
      popular: false,
      description: "Perfect for entry-level professionals and recent graduates",
      features: [
        "Professional resume design",
        "ATS optimization",
        "1 round of revisions",
        "PDF and Word formats",
        "48-hour delivery",
        "Basic LinkedIn tips",
      ],
      turnaround: "48 hours",
    },
    {
      name: "Premium",
      price: "₹3,499",
      popular: true,
      description: "Ideal for mid-career professionals seeking advancement",
      features: [
        "Everything in Basic",
        "Cover letter design",
        "LinkedIn profile optimization",
        "2 rounds of revisions",
        "30-minute consultation call",
        "Industry-specific keywords",
        "72-hour delivery",
      ],
      turnaround: "72 hours",
    },
    {
      name: "Executive",
      price: "₹4,999",
      popular: false,
      description: "For senior-level executives and C-suite professionals",
      features: [
        "Everything in Premium",
        "Executive biography",
        "Leadership portfolio",
        "Unlimited revisions",
        "60-minute strategy session",
        "Personal branding consultation",
        "72-hour delivery available",
      ],
      turnaround: "72 hours",
    },
  ];

  const testimonials = [
    {
      name: "Sidharth Das",
      role: "Business Head",
      company: "TOP FMCG company",
      rating: 5,
      text: "The resume redesign was incredible! I went from getting no responses to landing 3 interviews in just 2 weeks. The team really understood my industry and highlighted my achievements perfectly.",
    },
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "DataFlow Systems",
      rating: 5,
      text: "As I was conducting a confidential job search, I needed a discreet yet powerful resume that could open new doors. The professionalism and confidentiality maintained throughout the process were commendable. The final outcome was a polished, executive-ready resume that clearly positioned me for my next move.",
    },
    {
      name: "Yogesh Malik",
      role: "AVP Operations",
      company: "Ashirwad Pipes",
      rating: 5,
      text: "The resume crafted by your team was of exceptional quality. It effectively highlighted my strategic leadership capabilities, global business impact, and cross-functional experience. The attention to detail and industry-specific language positioned me strongly for senior executive opportunities.",
    },
  ];

  const whyChooseData = [
    {
      title: "ATS-Compliant & Keyword Optimized",
      description:
        "We design resumes that pass Applicant Tracking Systems and get picked by recruiters.",
    },
    {
      title: "Industry-Specific Customization",
      description:
        "From tech and finance to marketing and HR, we tailor every resume to match your domain.",
    },
    {
      title: "Professional Formatting",
      description:
        "Clean, modern, and visually appealing layouts that reflect your professionalism.",
    },
    {
      title: "Quick Turnaround",
      description:
        "Get your first draft within 7 business days — revisions included.",
    },
    {
      title: "Expert Writers & Career Coaches",
      description:
        "Our team understands the job market, hiring trends, and what recruiters are really looking for.",
    },
    {
      title: "Compelling Personal Branding",
      description:
        "We help you articulate your unique value proposition and build a personal brand that resonates with employers.",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Information Gathering",
      description:
        "We collect your career history, achievements, and target role requirements",
      // duration: "30 minutes"
    },
    {
      step: 2,
      title: "Research & Analysis",
      description:
        "Industry research and ATS optimization based on your target positions",
      // duration: "2-3 hours"
    },
    {
      step: 3,
      title: "Design & Content Creation",
      description: "Professional design and strategic content development",
      // duration: "6-8 hours"
    },
    {
      step: 4,
      title: "Review & Refinement",
      description: "Client feedback integration and final optimizations",
      // duration: "2-4 hours"
    },
  ];

  return (
    <div className="min-h-screen2">
        <Helmet>
        <title>Professional Resume Design Services - ATS Optimized Resumes | CAP 360</title>
        <meta name="description" content="Expert resume writing services with ATS optimization. Choose from Basic (₹1,999), Premium (₹3,499), or Executive (₹4,999) packages. 95% get interviews within 30 days." />
        <meta name="keywords" content="resume writing services, professional resume design, ATS optimized resume, resume packages, cover letter writing, LinkedIn profile optimization, executive resume" />
        <link rel="canonical" href="https://cap360.com/resume-services" />
        <meta property="og:title" content="Professional Resume Design Services - ATS Optimized Resumes | CAP 360" />
        <meta property="og:description" content="Expert resume writing services with ATS optimization. Choose from Basic (₹1,999), Premium (₹3,499), or Executive (₹4,999) packages. 95% get interviews within 30 days." />
        <meta property="og:url" content="https://cap360.com/resume-services" />
        <meta property="og:type" content="service" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Professional Resume Design Services",
          "description": "Expert resume writing and design services with ATS optimization",
          "provider": {
            "@type": "Organization",
            "name": "CAP 360"
          },
          "offers": [
            {
              "@type": "Offer",
              "name": "Basic Resume Package",
              "price": "1999",
              "priceCurrency": "INR",
              "description": "Professional resume design with ATS optimization for entry-level professionals"
            },
            {
              "@type": "Offer",
              "name": "Premium Resume Package", 
              "price": "3499",
              "priceCurrency": "INR",
              "description": "Complete package with resume, cover letter, and LinkedIn optimization"
            },
            {
              "@type": "Offer",
              "name": "Executive Resume Package",
              "price": "4999", 
              "priceCurrency": "INR",
              "description": "Executive-level resume with biography and leadership portfolio"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500",
            "bestRating": "5"
          }
        })}
        </script>
      </Helmet>
      {/* Header Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional Resume Design Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stand out from the competition with expertly crafted resumes that
            pass ATS systems and impress hiring managers. Choose the package
            that fits your career level.
          </p>
        </div>
      </section>

      {/* why cap services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Why Choose CAP Resume Services?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseData.map((item, index) => (
              <div
                key={index}
                className="flex items-start bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-heading-teal">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Choose Your Resume Package
            </h2>
            <p className="text-xl text-gray-600">
              All packages include our satisfaction guarantee and professional
              design standards
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-shadow flex flex-col justify-between ${
                  pkg.popular ? "ring-2 ring-gold-500" : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold-500 hover:bg-gold-600">
                    Most Popular
                  </Badge>
                )}

                <div className="flex-1 flex flex-col">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-heading-teal">
                      {pkg.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-gold-600 mb-2">
                      {pkg.price}
                    </div>
                    <CardDescription>{pkg.description}</CardDescription>
                    <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {pkg.turnaround}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <PaymentModal
                        packageName={pkg.name}
                        packagePrice={pkg.price}
                        packageFeatures={pkg.features}
                      >
                        <Button
                          className={`w-full ${
                            pkg.popular
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-[linear-gradient(135deg,#3570E8,#35E0E8)]"
                          } text-white`}
                        >
                          Choose {pkg.name}
                        </Button>
                      </PaymentModal>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
     <section className="py-20 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* Left Content */}
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
          Our 4-Step Process
        </h2>
        <p className="text-xl text-gray-600">
          From initial consultation to final delivery - here's how we create
          your perfect resume
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
                  <h3 className="text-xl font-semibold text-heading-teal">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Decorative Column with Image */}
    <div className="bg-cover bg-center bg-no-repeat rounded-lg flex justify-center items-center">
      <img
        src="/cap-uploads/resume-scorecard.png"
        alt="resume score card"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>


      {/* Before/After Section */}
      <section className="py-20 bg-gradient-to-br from-[#fef9f4] via-[#fdf6e4] to-[#fff7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Real results from our professional resume design services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">
                Before & After Results
              </h3>
              <div className="space-y-4">
                {/* BEFORE */}
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-700">
                    Generic formatting that doesn't stand out
                  </span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-700">
                    Missing industry keywords for ATS
                  </span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-700">
                    Poor achievement highlighting
                  </span>
                </div>

                <div className="my-6 border-t border-gray-300"></div>

                {/* AFTER */}
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Professional, modern design
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    ATS-optimized with relevant keywords
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Quantified achievements and impact
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 relative">
              <div className="absolute -top-5 -right-5 bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                Proven Results
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">95%</div>
                <div className="text-gray-700 mb-4">
                  of clients get interviews within 45 days
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-500">3x</div>
                    <div className="text-sm text-gray-600">
                      More Interview Calls
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">
                      48hr
                    </div>
                    <div className="text-sm text-gray-600">
                      Average Turnaround
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-500 mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who transformed their careers with our
              services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-gold-500 fill-current"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>
                    {testimonial.role} at {testimonial.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who have landed their dream jobs
            with our expert resume services
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

export default ResumeServices;
