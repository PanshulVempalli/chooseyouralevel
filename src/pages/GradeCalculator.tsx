
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradeImprovementSimulator from "@/components/GradeImprovementSimulator";
import CourseComparisonTool from "@/components/CourseComparisonTool";
import { SubjectGrade, ExtraCurricular, matchGradesToCourses } from "@/utils/matchGrades";
import { subjects } from "@/data/subjects";
import GradeCalculatorForm from "@/components/GradeCalculatorForm";
import ResultsHeader from "@/components/ResultsHeader";
import CourseList from "@/components/CourseList";
import { getUniversityRegion } from "@/utils/regionUtils";
import { getInstitutionType, getInstitutionColor } from "@/utils/institutionUtils";

const GradeCalculator = () => {
  const [selectedGrades, setSelectedGrades] = useState<SubjectGrade[]>([]);
  const [extraActivities, setExtraActivities] = useState<ExtraCurricular[]>([]);
  const [regionPreferences, setRegionPreferences] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<{ courses: any[], ucasPoints: number }>({ courses: [], ucasPoints: 0 });
  const { toast } = useToast();

  const getSubjectName = (id: string) => {
    const subjectsList = Array.isArray(subjects) ? subjects : [];
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  const hasRequiredSubject = (requiredSubject: { id: string, minGrade: string }) => {
    const studentGrade = selectedGrades.find(sg => sg.subjectId === requiredSubject.id);
    if (!studentGrade) return false;
    
    const gradeToPoints = (grade: string): number => {
      switch (grade) {
        case "A*": return 6;
        case "A": return 5;
        case "B": return 4;
        case "C": return 3;
        case "D": return 2;
        case "E": return 1;
        default: return 0;
      }
    };
    
    return gradeToPoints(studentGrade.grade) >= gradeToPoints(requiredSubject.minGrade);
  };

  const toggleRegion = (region: string) => {
    setRegionPreferences(prev => {
      if (region === "none") {
        return prev.includes("none") ? [] : ["none"];
      }
      
      const newPreferences = prev.filter(r => r !== "none");
      
      if (newPreferences.includes(region)) {
        return newPreferences.filter(r => r !== region);
      } else {
        return [...newPreferences, region];
      }
    });
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
      const preferredRegion = regionPreferences.length > 0 ? regionPreferences[0] : "";
      const results = matchGradesToCourses(selectedGrades, extraActivities, preferredRegion);
      
      if (regionPreferences.length > 0 && !regionPreferences.includes("none")) {
        results.courses = results.courses.filter((course: any) => {
          const courseRegion = getUniversityRegion(course.university || "");
          return regionPreferences.some(region => 
            courseRegion === region || 
            (region === "UK" && courseRegion.includes("UK"))
          );
        });
      }
      
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

  const calculateExtraPoints = () => {
    return extraActivities.reduce((total, activity) => total + activity.pointsValue, 0);
  };

  const aLevelPoints = matchGradesToCourses(selectedGrades, []).ucasPoints;
  const extraPoints = calculateExtraPoints();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container px-4">
          {!showResults ? (
            <>
              <div className="max-w-3xl mx-auto mb-8 md:mb-12 text-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 gradient-text animate-fade-in">
                  UCAS Points Calculator
                </h1>
                <p className="text-base md:text-lg mb-6 md:mb-8 text-muted-foreground animate-fade-in">
                  Enter your A-Level grades and extracurricular activities to see which university courses you're qualified for
                </p>
              </div>
              
              <div className="animate-fade-in">
                <GradeCalculatorForm
                  selectedGrades={selectedGrades}
                  setSelectedGrades={setSelectedGrades}
                  extraActivities={extraActivities}
                  setExtraActivities={setExtraActivities}
                  regionPreferences={regionPreferences}
                  toggleRegion={toggleRegion}
                  handleFindCourses={handleFindCourses}
                />
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <ResultsHeader
                selectedGrades={selectedGrades}
                matchedCourses={matchedCourses.courses}
                ucasPoints={matchedCourses.ucasPoints}
                aLevelPoints={aLevelPoints}
                extraPoints={extraPoints}
                regionPreferences={regionPreferences}
                getSubjectName={getSubjectName}
                resetResults={resetResults}
              />
              
              <div className="mb-6 md:mb-8">
                <GradeImprovementSimulator 
                  currentGrades={selectedGrades}
                  currentUcasPoints={matchedCourses.ucasPoints}
                />
              </div>

              {!matchedCourses.courses || matchedCourses.courses.length === 0 ? (
                <Card className="fancy-border-gradient">
                  <CardContent className="pt-6 text-center">
                    <p className="mb-4">No matching courses found for your grades. Try selecting different subjects or consider courses with lower entry requirements.</p>
                    <Button onClick={resetResults} variant="gradient">Try Again</Button>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="list" className="w-full mb-6 md:mb-8">
                  <TabsList className="w-full mb-4 bg-education-dark/5 p-1">
                    <TabsTrigger value="list" className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      Course List
                    </TabsTrigger>
                    <TabsTrigger value="compare" className="flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      Compare Courses
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="mt-0">
                    <CourseList
                      courses={matchedCourses.courses}
                      selectedGrades={selectedGrades}
                      getSubjectName={getSubjectName}
                      getUniversityRegion={getUniversityRegion}
                      hasRequiredSubject={hasRequiredSubject}
                      getInstitutionType={getInstitutionType}
                      getInstitutionColor={getInstitutionColor}
                    />
                  </TabsContent>
                  
                  <TabsContent value="compare" className="mt-0">
                    <CourseComparisonTool courses={matchedCourses.courses} />
                  </TabsContent>
                </Tabs>
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
