
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectSelector from "@/components/SubjectSelector";
import ResultsDisplay from "@/components/ResultsDisplay";
import { matchSubjectsToPathways, MatchResult } from "@/utils/matchSubjects";
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Calculator, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Users,
  Info,
  Building,
  Clock,
  Calendar,
  School,
  LightbulbIcon,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [results, setResults] = useState<MatchResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleFindPathways = () => {
    if (selectedSubjects.length < 3) {
      toast({
        title: "Please select at least 3 subjects",
        description: "You need to select a minimum of 3 A-Level subjects to find suitable pathways.",
        variant: "destructive"
      });
      return;
    }

    const matchResults = matchSubjectsToPathways(selectedSubjects);
    setResults(matchResults);
    setShowResults(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetResults = () => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Emma W.",
      role: "A-Level Student, London",
      text: "A-Level Pathfinder helped me discover career options I'd never considered before. Now I'm pursuing a degree in Biotechnology with confidence!",
      rating: 5
    },
    {
      id: 2,
      name: "Jamal K.",
      role: "Recent Graduate, Manchester",
      text: "I wish I had this tool when I was choosing my A-Levels. The career pathway suggestions are spot on and helped me refine my university choices.",
      rating: 5
    },
    {
      id: 3,
      name: "Sarah L.",
      role: "Career Advisor, Brighton College",
      text: "I recommend A-Level Pathfinder to all my students. It's an excellent resource that helps them see the connection between subject choices and future careers.",
      rating: 4
    }
  ];

  // Sample featured pathways
  const featuredPathways = [
    {
      id: 1,
      title: "Medicine & Healthcare",
      description: "Discover pathways in medicine, nursing, biomedical sciences, and healthcare administration.",
      subjects: ["Biology", "Chemistry", "Mathematics", "Psychology"],
      icon: <GraduationCap className="h-8 w-8 text-education-primary" />
    },
    {
      id: 2,
      title: "Engineering & Technology",
      description: "Explore careers in civil engineering, software development, robotics, and more.",
      subjects: ["Mathematics", "Physics", "Computer Science", "Design Technology"],
      icon: <Building className="h-8 w-8 text-education-primary" />
    },
    {
      id: 3,
      title: "Business & Finance",
      description: "Prepare for careers in accounting, management, marketing, and entrepreneurship.",
      subjects: ["Business Studies", "Economics", "Mathematics", "Psychology"],
      icon: <School className="h-8 w-8 text-education-primary" />
    },
    {
      id: 4,
      title: "Arts & Humanities",
      description: "Follow your passion in journalism, publishing, teaching, law, and more.",
      subjects: ["English Literature", "History", "Sociology", "Languages"],
      icon: <BookOpen className="h-8 w-8 text-education-primary" />
    }
  ];

  // Quick facts about UK university admissions
  const admissionsFacts = [
    {
      id: 1,
      fact: "Most university applications in the UK are processed through UCAS",
      icon: <Info className="h-6 w-6 text-education-primary" />
    },
    {
      id: 2,
      fact: "The standard deadline for most UCAS applications is January 15th",
      icon: <Calendar className="h-6 w-6 text-education-primary" />
    },
    {
      id: 3,
      fact: "Oxford, Cambridge, and medical schools have earlier deadlines (October 15th)",
      icon: <Clock className="h-6 w-6 text-education-primary" />
    },
    {
      id: 4,
      fact: "Students can apply to a maximum of 5 courses through UCAS",
      icon: <Users className="h-6 w-6 text-education-primary" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {!showResults ? (
          <>
            <section className="bg-gradient-to-r from-education-light to-blue-50 py-24 md:py-32 hero-pattern relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-white/40 pointer-events-none"></div>
              
              <div className="container px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium animate-float">
                    <Sparkles className="h-4 w-4 text-education-primary" />
                    <span>Find your perfect academic path</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight gradient-text">
                    Find Your Perfect A-Level Path
                  </h1>
                  
                  <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-2xl mx-auto">
                    Choose your A-Level subjects and discover which university courses and careers 
                    they could lead to.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/subject-selector">
                      <Button 
                        variant="gradient"
                        size="xl"
                        className="rounded-lg shadow-lg"
                      >
                        Get Started <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    
                    <Link to="/grade-calculator">
                      <Button 
                        size="xl"
                        className="rounded-lg border-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-50 shadow-md"
                        variant="outline"
                      >
                        I Already Have My Grades <Calculator className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="hidden lg:block absolute -bottom-16 left-16 w-32 h-32 bg-education-primary/5 rounded-full blur-3xl"></div>
                <div className="hidden lg:block absolute -top-20 right-24 w-40 h-40 bg-education-secondary/5 rounded-full blur-3xl"></div>
                <div className="hidden lg:block absolute bottom-10 right-10 w-24 h-24 bg-education-accent/10 rounded-full blur-2xl"></div>
              </div>
            </section>

            {/* Featured Pathways Carousel */}
            <section className="py-20 bg-white">
              <div className="container px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium mb-4">
                        <Star className="h-4 w-4 mr-2" />
                        <span>Explore options</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-2">
                        Featured Pathways
                      </h2>
                      <p className="text-lg text-gray-600 max-w-2xl">
                        Discover popular career and study paths based on A-Level combinations
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:px-10">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {featuredPathways.map((pathway) => (
                          <CarouselItem key={pathway.id} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                              <CardContent className="p-8 flex flex-col h-full">
                                <div className="mb-4 p-3 rounded-full bg-education-primary/10 w-16 h-16 flex items-center justify-center">
                                  {pathway.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{pathway.title}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{pathway.description}</p>
                                <div>
                                  <h4 className="text-sm font-medium mb-2 text-gray-500">Common subjects:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {pathway.subjects.map((subject, idx) => (
                                      <span 
                                        key={idx}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-education-primary/10 text-education-primary"
                                      >
                                        {subject}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="-left-4 md:-left-6 bg-white shadow-md border-0" />
                      <CarouselNext className="-right-4 md:-right-6 bg-white shadow-md border-0" />
                    </Carousel>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 bg-gray-50">
              <div className="container px-4">
                <div className="max-w-6xl mx-auto relative">
                  <div className="mb-16 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium mb-4">
                      <LightbulbIcon className="h-4 w-4 mr-2" />
                      <span>Simple steps</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Our platform makes it easy to discover the right educational path for your future
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection line (desktop only) */}
                    <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-education-primary/30" />
                    
                    <div className="text-center relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 rounded-xl bg-white">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6 border-4 border-white z-10 relative">
                        <BookOpen className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">1. Select Subjects</h3>
                      <p className="text-gray-600">
                        Choose 3-4 A-Level subjects that you're interested in studying or are already taking.
                      </p>
                      <div className="mt-6 px-6">
                        <ul className="text-left text-sm text-gray-600 space-y-3">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Browse our comprehensive list of subjects</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Mix and match different subject combinations</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>See instant recommendations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 rounded-xl bg-white">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6 border-4 border-white z-10 relative">
                        <GraduationCap className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">2. Explore Courses</h3>
                      <p className="text-gray-600">
                        Discover which university degrees match well with your chosen subject combination.
                      </p>
                      <div className="mt-6 px-6">
                        <ul className="text-left text-sm text-gray-600 space-y-3">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>View detailed course requirements</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Compare university options side by side</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Filter by location, ranking, and more</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8 rounded-xl bg-white">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6 border-4 border-white z-10 relative">
                        <Award className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">3. Discover Careers</h3>
                      <p className="text-gray-600">
                        Find potential career paths that your A-Level choices could lead to in the future.
                      </p>
                      <div className="mt-6 px-6">
                        <ul className="text-left text-sm text-gray-600 space-y-3">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Explore job opportunities and requirements</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Learn about salary expectations</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-education-primary mt-0.5 mr-1 flex-shrink-0" />
                            <span>Get tips on work experience and internships</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* UK University Admissions Quick Facts */}
            <section className="py-20 bg-white">
              <div className="container px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-16 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium mb-4">
                      <Info className="h-4 w-4 mr-2" />
                      <span>Good to know</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      UK University Admissions Quick Facts
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Important information to keep in mind when planning your university applications
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {admissionsFacts.map((item) => (
                      <Card key={item.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                          <div className="mb-4 bg-education-primary/10 p-4 rounded-full">
                            {item.icon}
                          </div>
                          <p className="text-gray-800 font-medium">{item.fact}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials section - Modified hover effect */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-50 pointer-events-none"></div>
              
              <div className="container px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-16 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium mb-4">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Success stories</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      What Students Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Hear from students who have used A-Level Pathfinder to help guide their academic and career decisions
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                      <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8">
                          <div className="flex mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="italic text-gray-600 mb-8 text-lg">"{testimonial.text}"</p>
                          <div className="flex items-center">
                            <div className="bg-education-primary/20 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                              <Users className="h-5 w-5 text-education-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Disclaimer */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 italic p-3 bg-gray-100 rounded-md inline-block">
                      Disclaimer: The testimonials shown are for demonstration purposes only and do not represent actual individuals or their experiences.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-16 bg-gray-50">
              <div className="container px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Path?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                      Start exploring university courses and career options based on your A-Level subjects
                    </p>
                    <Link to="/subject-selector">
                      <Button 
                        variant="gradient"
                        size="lg"
                        className="rounded-lg shadow-lg"
                      >
                        Go to Subject Selector <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-12">
            <div className="container px-4">
              {results && (
                <ResultsDisplay 
                  courses={results.courses}
                  careers={results.careers}
                  selectedSubjects={selectedSubjects}
                  onReset={resetResults}
                />
              )}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
