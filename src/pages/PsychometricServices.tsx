import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Users, 
  BarChart3, 
  Lightbulb, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Eye,
  HeartHandshake
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

const assessmentTypes = [
  {
    icon: Brain,
    title: "Cognitive Ability Assessment",
    description: "Measure problem-solving, critical thinking, and learning potential",
    features: [
      "Logical reasoning tests",
      "Numerical aptitude evaluation",
      "Verbal comprehension analysis",
      "Abstract thinking assessment"
    ],
    duration: "45-60 mins",
    ideal: "Career changers & job seekers",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/20"
  },
  {
    icon: Users,
    title: "Personality Profiling",
    description: "Understand your behavioral traits and workplace preferences",
    features: [
      "Big Five personality traits",
      "Work style preferences",
      "Communication patterns",
      "Stress response analysis"
    ],
    duration: "30-45 mins",
    ideal: "All career levels",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20"
  },
  {
    icon: Target,
    title: "Career Interest Inventory",
    description: "Discover careers aligned with your passions and interests",
    features: [
      "Holland Code assessment",
      "Industry alignment mapping",
      "Role compatibility scoring",
      "Growth potential analysis"
    ],
    duration: "25-35 mins",
    ideal: "Students & early career",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20"
  },
  {
    icon: BarChart3,
    title: "Leadership Assessment",
    description: "Evaluate leadership capabilities and executive potential",
    features: [
      "Leadership style identification",
      "Decision-making analysis",
      "Team management aptitude",
      "Strategic thinking evaluation"
    ],
    duration: "60-90 mins",
    ideal: "Managers & executives",
    gradient: "from-orange-500 to-amber-500",
    bgGlow: "bg-orange-500/20"
  },
  {
    icon: Lightbulb,
    title: "Emotional Intelligence (EQ)",
    description: "Assess emotional awareness and interpersonal effectiveness",
    features: [
      "Self-awareness measurement",
      "Empathy quotient scoring",
      "Social skills evaluation",
      "Emotional regulation analysis"
    ],
    duration: "30-40 mins",
    ideal: "Leaders & team members",
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "bg-pink-500/20"
  },
  {
    icon: Shield,
    title: "Competency Mapping",
    description: "Identify strengths and development areas for targeted growth",
    features: [
      "Core competency evaluation",
      "Skill gap identification",
      "Development roadmap creation",
      "Benchmark comparison"
    ],
    duration: "45-60 mins",
    ideal: "Performance improvement",
    gradient: "from-indigo-500 to-blue-600",
    bgGlow: "bg-indigo-500/20"
  }
];

const benefits = [
  {
    icon: Sparkles,
    title: "Scientific Accuracy",
    description: "Validated assessments backed by decades of psychological research and industry standards",
    color: "text-amber-500"
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    description: "Receive detailed reports with specific recommendations for career advancement",
    color: "text-emerald-500"
  },
  {
    icon: Award,
    title: "Expert Interpretation",
    description: "One-on-one sessions with certified psychologists to discuss your results",
    color: "text-violet-500"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Get comprehensive assessment reports within 48-72 hours of completion",
    color: "text-blue-500"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "Discuss your career goals and select appropriate assessments",
    icon: HeartHandshake
  },
  {
    step: "02",
    title: "Assessment Completion",
    description: "Take assessments online in a comfortable environment",
    icon: Brain
  },
  {
    step: "03",
    title: "Expert Analysis",
    description: "Our psychologists analyze and interpret your results",
    icon: Eye
  },
  {
    step: "04",
    title: "Detailed Report",
    description: "Receive a comprehensive report with actionable insights",
    icon: BarChart3
  },
  {
    step: "05",
    title: "Feedback Session",
    description: "One-on-one discussion to clarify results and plan next steps",
    icon: Zap
  }
];

const stats = [
  { value: "15,000+", label: "Assessments Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Corporate Partners" },
  { value: "12+", label: "Years Experience" }
];

const PsychometricServices = () => {
  return (
    <>
      <Helmet>
        <title>Psychometric Assessment Services | NextStep Career Elevate</title>
        <meta 
          name="description" 
          content="Discover your true potential with scientifically validated psychometric assessments. Cognitive ability tests, personality profiling, leadership assessment, and career interest inventories." 
        />
        <meta name="keywords" content="psychometric assessment, personality test, career aptitude test, cognitive ability, leadership assessment, emotional intelligence, EQ test" />
        <link rel="canonical" href="https://nextstep-career-elevate.lovable.app/psychometric-services" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Psychometric Assessment Services",
            "provider": {
              "@type": "Organization",
              "name": "NextStep Career Elevate"
            },
            "description": "Scientifically validated psychometric assessments for career development",
            "serviceType": "Career Assessment"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-fade-in">
                <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-primary/10 to-violet-500/10 text-primary border-primary/20 backdrop-blur-sm">
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  Scientific Career Insights
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span className="bg-gradient-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent">
                  Unlock Your
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-violet-600 via-primary to-foreground bg-clip-text text-transparent">
                    True Potential
                  </span>
                  <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-amber-500 animate-pulse" />
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Discover your strengths, understand your personality, and make informed career decisions with our scientifically validated psychometric assessments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <ConsultationModal>
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary to-violet-600 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                    <span className="relative z-10 flex items-center">
                      Start Your Assessment
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Button>
                </ConsultationModal>
                <Button size="lg" variant="outline" className="group border-2 hover:bg-primary/5 transition-all duration-300">
                  <Eye className="mr-2 w-4 h-4" />
                  View Sample Report
                </Button>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 opacity-20 animate-bounce" style={{ animationDuration: "3s" }}>
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
            <Target className="w-10 h-10 text-violet-500" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-primary via-violet-600 to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center text-primary-foreground animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment Types */}
        <section className="py-20 lg:py-28 bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Our Assessment Suite
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Comprehensive psychometric tools designed to provide deep insights into your capabilities and potential
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assessmentTypes.map((assessment, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 ${assessment.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${assessment.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <assessment.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{assessment.title}</CardTitle>
                    <CardDescription className="text-base">{assessment.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <ul className="space-y-3 mb-6">
                      {assessment.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {assessment.duration}
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {assessment.ideal}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why Choose Our Assessments
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Industry-leading psychometric services that deliver real, actionable career insights
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="group text-center border-0 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <div className={`absolute inset-0 w-16 h-16 mx-auto rounded-2xl ${benefit.color.replace('text-', 'bg-')}/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Our Process</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                A simple, structured process designed to give you the most value from your assessment
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-5 gap-4">
                {processSteps.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative group animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Connector line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20"></div>
                    )}
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-primary"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Badge className="mb-6 bg-white/10 border-white/20 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Today
              </Badge>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Discover Your Potential?
              </h2>
              <p className="text-lg mb-10 opacity-90 max-w-xl mx-auto">
                Take the first step towards a more fulfilling career. Our expert team is ready to guide you through the assessment process.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ConsultationModal>
                  <Button size="lg" variant="secondary" className="group text-primary hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl">
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </ConsultationModal>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PsychometricServices;
