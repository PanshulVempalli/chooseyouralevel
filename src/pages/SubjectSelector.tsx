
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectSelector from "@/components/SubjectSelector";
import ResultsDisplay from "@/components/ResultsDisplay";
import { matchSubjectsToPathways, MatchResult } from "@/utils/matchSubjects";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const SubjectSelectorPage = () => {
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
          <section className="py-20">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-education-primary">
                          Home
                        </Link>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Subject Selector</span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                  
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-education-primary/10 text-education-primary text-sm font-medium mb-4">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>Get personalized guidance</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                      Select Your A-Level Subjects
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Choose at least 3 subjects to get personalized university and career recommendations
                    </p>
                  </div>
                  
                  <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                    <SubjectSelector 
                      selectedSubjects={selectedSubjects}
                      setSelectedSubjects={setSelectedSubjects}
                      onSubmit={handleFindPathways}
                    />
                  </div>
                </div>
                
                <div className="mt-12 p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <h2 className="text-xl font-bold mb-4">Tips for Choosing A-Level Subjects</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-education-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Choose subjects you enjoy and are passionate about</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-education-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Consider your academic strengths and subjects where you perform well</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-education-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Research university course requirements for degrees you're interested in</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-education-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Balance challenging subjects with those that come more naturally to you</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-education-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span>Think about how your subject choices may complement each other</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
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

export default SubjectSelectorPage;
