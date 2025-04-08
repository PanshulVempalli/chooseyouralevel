
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectSelector from "@/components/SubjectSelector";
import ResultsDisplay from "@/components/ResultsDisplay";
import { matchSubjectsToPathways, MatchResult } from "@/utils/matchSubjects";
import { GraduationCap, BookOpen, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {!showResults ? (
          <>
            <section className="bg-gradient-to-r from-education-light to-blue-50 py-16 md:py-24">
              <div className="container px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                    Find Your Perfect A-Level Path
                  </h1>
                  <p className="text-xl mb-10 text-gray-700">
                    Choose your A-Level subjects and discover which university courses and careers 
                    they could lead to.
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      size="lg" 
                      className="text-lg bg-education-primary hover:bg-education-primary/90"
                      onClick={() => document.getElementById("subject-selector")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Get Started <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 bg-white">
              <div className="container px-4">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Select Subjects</h3>
                      <p className="text-gray-600">
                        Choose 3-4 A-Level subjects that you're interested in studying or are already taking.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">See Matching Courses</h3>
                      <p className="text-gray-600">
                        Discover which university degrees match well with your chosen subject combination.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-education-primary/10 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                        <Award className="h-8 w-8 text-education-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">Explore Careers</h3>
                      <p className="text-gray-600">
                        Find potential career paths that your A-Level choices could lead to in the future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="py-16 bg-gray-50" id="subject-selector">
              <div className="container px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                  Select Your A-Level Subjects
                </h2>
                
                <SubjectSelector 
                  selectedSubjects={selectedSubjects}
                  setSelectedSubjects={setSelectedSubjects}
                  onSubmit={handleFindPathways}
                />
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
