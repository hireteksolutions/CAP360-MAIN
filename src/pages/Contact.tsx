import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ConsultationModal from "@/components/ConsultationModal";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    careerLevel: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName.trim()) {
      toast({ title: "Validation Error", description: "First name is required.", variant: "destructive" });
      return;
    }
    if (!formData.lastName.trim()) {
      toast({ title: "Validation Error", description: "Last name is required.", variant: "destructive" });
      return;
    }
    if (!formData.email.trim()) {
      toast({ title: "Validation Error", description: "Email is required.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Validation Error", description: "Enter a valid email address.", variant: "destructive" });
      return;
    }
    if (formData.phone && !/^[0-9]{7,15}$/.test(formData.phone)) {
      toast({ title: "Validation Error", description: "Enter a valid phone number.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            career_level: formData.careerLevel,
            message: formData.message,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        careerLevel: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+ 91 8700238779",
      description: "Mon-Fri, 9:30AM-6PM"
    },
    {
      icon: Mail,
      title: "Email", 
      details: "info@cap360.in",
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "H - 7, Lajpat Nagar III",
      description: "New Delhi"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      description: "9:30 AM - 6:00 PM"
    }
  ];

  const faqs = [
    {
      question: "How long does the resume writing process take?",
      answer: "Our turnaround times vary by package: Basic (48 hours), Premium (72 hours), Executive (72 hours). Rush delivery is available for urgent needs."
    },
    {
      question: "Do you offer guarantees on your services?",
      answer: "Though we provide 100% satisfaction guarantee, we cannot guarantee specific results or outcomes."
    },
    {
      question: "Can you help with career changes to different industries?",
      answer: "Absolutely! Our team specializes in career transitions and can help you position your transferable skills for success in new industries."
    },
    {
      question: "What's included in the free consultation?",
      answer: "Your free consultation includes a career assessment, discussion of your goals, review of your current materials, and a customized service recommendation."
    }
  ];

  return (
    <div className="min-h-screen py-12">
  <Helmet>
        <title>Contact Us - Free Career Consultation & Expert Support | CAP 360</title>
        <meta name="description" content="Get in touch with CAP 360's career experts. Book your free consultation call or contact us directly. Phone: 9599901561, Email: cap@hiretek.in" />
        <meta name="keywords" content="contact career coach, free consultation, career support, resume help, career guidance, contact CAP 360, career consultation booking" />
        <link rel="canonical" href="https://cap360.com/contact" />
        <meta property="og:title" content="Contact Us - Free Career Consultation & Expert Support | CAP 360" />
        <meta property="og:description" content="Get in touch with CAP 360's career experts. Book your free consultation call or contact us directly. Phone: 9599901561, Email: cap@hiretek.in" />
        <meta property="og:url" content="https://cap360.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact CAP 360",
          "description": "Contact CAP 360 for career consultation and support",
          "url": "https://cap360.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "CAP 360",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "telephone": "+91-9599901561",
                "email": "info@cap360.in",
                "availableLanguage": "English",
                "hoursAvailable": "Mo-Fr 09:00-18:00"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "H - 7, Lajpat Nagar 3",
              "addressLocality": "New Delhi",
              "addressCountry": "IN"
            }
          }
        })}
        </script>
      </Helmet>

      {/* Header Section */}
     <section
  className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')"
  }}
>
  <div className="absolute inset-0 bg-black/60"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl lg:text-5xl font-bold mb-6">
      Let's Start Your Career Transformation
    </h1>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
      Ready to take the next step? Book your free consultation or get in touch with our 
      career experts. We're here to help you achieve your professional goals.
    </p>
  </div>
</section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-heading-teal flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-gold-500" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Select onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resume-basic">Resume Design - Basic</SelectItem>
                        <SelectItem value="resume-premium">Resume Design - Premium</SelectItem>
                        <SelectItem value="resume-executive">Resume Design - Executive</SelectItem>
                        <SelectItem value="career-starter">Career Program - Starter</SelectItem>
                        <SelectItem value="career-accelerator">Career Program - Accelerator</SelectItem>
                        <SelectItem value="career-executive">Career Program - Executive</SelectItem>
                        <SelectItem value="consultation">Free Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="careerLevel">Career Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, careerLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your career level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mid">Mid-Level (10-15 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (15-20 years)</SelectItem>
                        <SelectItem value="executive">Executive (20+ years)</SelectItem>
                        {/* <SelectItem value="student">Student/Recent Graduate</SelectItem> */}
                        <SelectItem value="career-change">Career Changer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your career goals and how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-icon hover:opacity-90 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-heading-teal flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-gold-500" />
                    Book Free Consultation
                  </CardTitle>
                  <CardDescription>
                    Schedule a 30-minute call to discuss your career goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      During your free consultation, we'll:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Assess your current career situation
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Discuss your professional goals
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Review your existing materials
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Recommend the best service package
                      </li>
                    </ul>
                    <ConsultationModal>
                      <Button className="w-full bg-gradient-icon hover:opacity-90 text-white">
                        Schedule Now
                      </Button>
                    </ConsultationModal>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-icon rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-heading-teal">{info.title}</h3>
                          <p className="text-gray-700 font-medium">{info.details}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading-teal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-heading-teal mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have a different question?</p>
            <Button className="bg-gradient-icon hover:opacity-90 text-white">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
