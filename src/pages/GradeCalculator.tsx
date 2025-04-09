
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, ArrowLeft } from "lucide-react";
import GradeSelector from "@/components/GradeSelector";
import { matchGradesToCourses, SubjectGrade } from "@/utils/matchGrades";
import { subjects } from "@/data/subjects";

const GradeCalculator = () => {
  const [selectedGrades, setSelectedGrades] = useState<SubjectGrade[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<{ courses: any[], ucasPoints: number }>({ courses: [], ucasPoints: 0 });
  const { toast } = useToast();

  const getSubjectName = (id: string) => {
    const subjectsList = Array.isArray(subjects) ? subjects : [];
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  const handleFindCourses = () => {
    if (selectedGrades.length < 3) {
      toast({
        title: "Please enter at least 3 subjects",
        description: "You need to provide results for a minimum of 3 A-Level subjects.",
        variant: "destructive"
      });
      return;
    }

    try {
      const results = matchGradesToCourses(selectedGrades);
      setMatchedCourses(results);
      setShowResults(true);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error matching grades to courses:", error);
      toast({
        title: "Error finding matching courses",
        description: "There was a problem processing your grades. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetResults = () => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container px-4">
          {!showResults ? (
            <>
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold mb-6 gradient-text">
                  A-Level Grade Calculator
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  Enter your actual A-Level grades to see which university courses you're qualified for
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <GradeSelector
                  selectedGrades={selectedGrades}
                  setSelectedGrades={setSelectedGrades}
                  onSubmit={handleFindCourses}
                />
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <Button 
                  variant="ghost" 
                  onClick={resetResults} 
                  className="mr-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Your Matching Courses</h1>
                  <p className="text-muted-foreground">
                    Based on your grades: {selectedGrades.map(sg => `${getSubjectName(sg.subjectId)}: ${sg.grade}`).join(", ")}
                  </p>
                  <p className="font-medium text-education-primary mt-2">
                    Approximate UCAS Points: {matchedCourses.ucasPoints}
                  </p>
                </div>
              </div>
              
              {!matchedCourses.courses || matchedCourses.courses.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="mb-4">No matching courses found for your grades. Try selecting different subjects or consider courses with lower entry requirements.</p>
                    <Button onClick={resetResults}>Try Again</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {matchedCourses.courses.map((course: any) => (
                    <Card key={course.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div>
                              <h2 className="text-xl font-semibold">{course.name}</h2>
                              <p className="text-muted-foreground">{course.university || "University Degree"}</p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <BookOpen className="mr-1 h-3 w-3" /> {course.duration || "3 years"}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-4">{course.description}</p>
                          
                          <div className="flex flex-col sm:flex-row justify-between text-sm">
                            <div>
                              <span className="font-medium">Entry Requirements:</span> {course.entryRequirements || "Grades vary by university"}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GradeCalculator;
