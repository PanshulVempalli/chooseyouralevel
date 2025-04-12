
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, ArrowLeft, GraduationCap, Building, Award, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import GradeSelector from "@/components/GradeSelector";
import { matchGradesToCourses, SubjectGrade, ExtraCurricular } from "@/utils/matchGrades";
import { subjects } from "@/data/subjects";
import { Badge } from "@/components/ui/badge";
import ExtraCurricularSelector from "@/components/ExtraCurricularSelector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradeImprovementSimulator from "@/components/GradeImprovementSimulator";
import CourseComparisonTool from "@/components/CourseComparisonTool";
import InteractiveRequirementsCard from "@/components/InteractiveRequirementsCard";
import ExportResultsButton from "@/components/ExportResultsButton";

const GradeCalculator = () => {
  const [selectedGrades, setSelectedGrades] = useState<SubjectGrade[]>([]);
  const [extraActivities, setExtraActivities] = useState<ExtraCurricular[]>([]);
  const [regionPreference, setRegionPreference] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<{ courses: any[], ucasPoints: number }>({ courses: [], ucasPoints: 0 });
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const { toast } = useToast();

  const regions = [
    { value: "none", label: "No preference" },
    { value: "UK", label: "United Kingdom (all)" },
    { value: "London, UK", label: "London" },
    { value: "Oxbridge, UK", label: "Oxford & Cambridge" },
    { value: "Scotland, UK", label: "Scotland" },
    { value: "Northern England, UK", label: "Northern England" },
    { value: "Midlands, UK", label: "Midlands" },
    { value: "Southern England, UK", label: "Southern England" },
    { value: "Wales, UK", label: "Wales" },
    { value: "Northern Ireland, UK", label: "Northern Ireland" },
    { value: "USA", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "Continental Europe", label: "Europe" },
    { value: "Australia/New Zealand", label: "Australia/New Zealand" },
    { value: "East Asia", label: "East Asia" },
    { value: "Other", label: "Other international" },
  ];

  const getSubjectName = (id: string) => {
    const subjectsList = Array.isArray(subjects) ? subjects : [];
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  const getInstitutionType = (universityName: string): string => {
    const name = universityName.toLowerCase();
    if (name.includes("oxford") || name.includes("cambridge") || 
        name.includes("imperial") || name.includes("lse")) {
      return "Top-tier University";
    } else if (name.includes("university")) {
      return "University";
    } else if (name.includes("college")) {
      return "College";
    } else {
      return "Institution";
    }
  };

  const getInstitutionColor = (universityName: string): string => {
    const name = universityName.toLowerCase();
    if (name.includes("oxford") || name.includes("cambridge") || 
        name.includes("imperial") || name.includes("lse")) {
      return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
    } else if (name.includes("university")) {
      return "bg-blue-50 text-blue-800 ring-blue-600/20";
    } else if (name.includes("college")) {
      return "bg-green-50 text-green-800 ring-green-600/20";
    } else {
      return "bg-slate-50 text-slate-800 ring-slate-600/20";
    }
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
      const results = matchGradesToCourses(selectedGrades, extraActivities, regionPreference);
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
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateExtraPoints = () => {
    return extraActivities.reduce((total, activity) => total + activity.pointsValue, 0);
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

  const getUniversityRegion = (universityName: string): string => {
    if (!universityName) return "Other";
    
    const name = universityName.toLowerCase();
    
    if (name.includes("london") || name.includes("imperial") || name.includes("ucl") || 
        name.includes("kings college") || name.includes("lse") || name.includes("queen mary") ||
        name.includes("royal holloway") || name.includes("goldsmiths")) {
      return "London, UK";
    } else if (name.includes("oxford") || name.includes("cambridge")) {
      return "Oxbridge, UK";
    } else if (name.includes("edinburgh") || name.includes("glasgow") || 
               name.includes("st andrews") || name.includes("aberdeen") || 
               name.includes("strathclyde") || name.includes("dundee")) {
      return "Scotland, UK";
    } else if (name.includes("cardiff") || name.includes("swansea") || 
               name.includes("aberystwyth") || name.includes("bangor")) {
      return "Wales, UK";
    } else if (name.includes("belfast") || name.includes("ulster")) {
      return "Northern Ireland, UK";
    } else if (name.includes("manchester") || name.includes("liverpool") || 
               name.includes("leeds") || name.includes("sheffield") || 
               name.includes("newcastle") || name.includes("durham") ||
               name.includes("york") || name.includes("lancaster")) {
      return "Northern England, UK";
    } else if (name.includes("birmingham") || name.includes("nottingham") || 
               name.includes("leicester") || name.includes("warwick") ||
               name.includes("loughborough") || name.includes("keele") ||
               name.includes("coventry")) {
      return "Midlands, UK";
    } else if (name.includes("bristol") || name.includes("exeter") || 
               name.includes("bath") || name.includes("southampton") ||
               name.includes("sussex") || name.includes("reading") ||
               name.includes("surrey") || name.includes("portsmouth") ||
               name.includes("brighton") || name.includes("plymouth")) {
      return "Southern England, UK";
    } 
    else if (name.includes("harvard") || name.includes("princeton") || 
             name.includes("yale") || name.includes("stanford") || 
             name.includes("mit") || name.includes("american") ||
             name.includes("new york")) {
      return "USA";
    } else if (name.includes("sorbonne") || name.includes("heidelberg") || 
               name.includes("bologna") || name.includes("barcelona") ||
               name.includes("madrid") || name.includes("amsterdam") ||
               name.includes("berlin")) {
      return "Continental Europe";
    } else if (name.includes("toronto") || name.includes("mcgill") || 
               name.includes("ubc") || name.includes("montreal") ||
               name.includes("alberta")) {
      return "Canada";
    } else if (name.includes("sydney") || name.includes("melbourne") || 
               name.includes("auckland") || name.includes("queensland") ||
               name.includes("monash")) {
      return "Australia/New Zealand";
    } else if (name.includes("singapore") || name.includes("hong kong") || 
               name.includes("tokyo") || name.includes("beijing") ||
               name.includes("shanghai") || name.includes("seoul")) {
      return "East Asia";
    }
    
    if (name.includes("university") && name.includes("uk") || 
        name.includes("uni") && name.includes("uk") || 
        /\b(uk)\b/.test(name)) {
      return "UK";
    }
    
    return "Other";
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
                  UCAS Points Calculator
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  Enter your A-Level grades and extracurricular activities to see which university courses you're qualified for
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-8">
                <GradeSelector
                  selectedGrades={selectedGrades}
                  setSelectedGrades={setSelectedGrades}
                  onSubmit={handleFindCourses}
                />
                
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <ExtraCurricularSelector
                      selectedActivities={extraActivities}
                      setSelectedActivities={setExtraActivities}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Globe className="mr-2 h-5 w-5 text-education-primary" />
                        <h3 className="font-medium text-lg">Location Preferences</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Select your preferred region to find universities that match your grades in that area
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="region">Preferred Region</Label>
                          <Select
                            value={regionPreference}
                            onValueChange={setRegionPreference}
                          >
                            <SelectTrigger id="region" className="w-full">
                              <SelectValue placeholder="Select a region (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              {regions.map((region) => (
                                <SelectItem key={region.value} value={region.value}>
                                  {region.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Total UCAS Points:</p>
                    <p className="text-2xl font-bold text-education-primary">
                      {matchGradesToCourses(selectedGrades, extraActivities).ucasPoints}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleFindCourses}
                    disabled={selectedGrades.length < 3}
                  >
                    Find Matching Courses
                  </Button>
                </div>
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
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
                    <div className="font-medium">
                      <span className="text-muted-foreground">A-Level UCAS Points:</span> {matchGradesToCourses(selectedGrades, []).ucasPoints}
                    </div>
                    {extraActivities.length > 0 && (
                      <div className="font-medium">
                        <span className="text-muted-foreground">Extra Activities:</span> +{calculateExtraPoints()} points
                      </div>
                    )}
                    <div className="font-medium text-education-primary">
                      <span className="text-muted-foreground">Total UCAS Points:</span> {matchedCourses.ucasPoints}
                    </div>
                  </div>
                  {regionPreference && (
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800">
                        <Globe className="mr-1 h-3 w-3" /> 
                        Region: {regions.find(r => r.value === regionPreference)?.label || regionPreference}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="ml-auto">
                  <ExportResultsButton 
                    selectedGrades={selectedGrades}
                    matchedCourses={matchedCourses.courses}
                    ucasPoints={matchedCourses.ucasPoints}
                    regionPreference={regionPreference}
                  />
                </div>
              </div>
              
              {/* New Grade Improvement Simulator */}
              <div className="mb-8">
                <GradeImprovementSimulator 
                  currentGrades={selectedGrades}
                  currentUcasPoints={matchedCourses.ucasPoints}
                />
              </div>

              {!matchedCourses.courses || matchedCourses.courses.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="mb-4">No matching courses found for your grades. Try selecting different subjects or consider courses with lower entry requirements.</p>
                    <Button onClick={resetResults}>Try Again</Button>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="list" className="w-full mb-8">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="list" className="flex-1">Course List</TabsTrigger>
                    <TabsTrigger value="compare" className="flex-1">Compare Courses</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list" className="mt-0">
                    <div className="space-y-4">
                      {matchedCourses.courses.map((course: any) => (
                        <Card key={course.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                <div>
                                  <h2 className="text-xl font-semibold">{course.name}</h2>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-muted-foreground">{course.university || "University Degree"}</p>
                                    <Badge 
                                      variant="outline" 
                                      className={`ml-2 ${getInstitutionColor(course.university || "")}`}
                                    >
                                      {getInstitutionType(course.university || "")}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    <BookOpen className="mr-1 h-3 w-3" /> {course.duration || "3 years"}
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-sm mb-4">{course.description}</p>
                              
                              {/* Interactive Requirements Card - Show on click */}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedCourse(course === selectedCourse ? null : course)}
                                className="mb-4"
                              >
                                {course === selectedCourse ? "Hide" : "Show"} Detailed Requirements
                              </Button>
                              
                              {selectedCourse && selectedCourse.id === course.id && (
                                <InteractiveRequirementsCard 
                                  courseName={course.name}
                                  university={course.university}
                                  entryRequirements={course.entryRequirements}
                                  requiredSubjects={course.requiredSubjects}
                                  recommendedSubjects={course.recommendedSubjects}
                                  studentGrades={selectedGrades}
                                />
                              )}
                              
                              <div className="flex flex-col sm:flex-row justify-between text-sm">
                                <div>
                                  <span className="font-medium">Entry Requirements:</span> {course.entryRequirements || "Grades vary by university"}
                                </div>
                                <div className="mt-2 sm:mt-0">
                                  <span className="font-medium flex items-center">
                                    <Globe className="h-3 w-3 mr-1 text-blue-500" />
                                    Region: {getUniversityRegion(course.university || "")}
                                  </span>
                                </div>
                              </div>
                              
                              {course.requiredSubjects && course.requiredSubjects.length > 0 && (
                                <div className="mt-3 text-sm">
                                  <span className="font-medium flex items-center">
                                    <CheckCircle2 size={14} className="mr-1 text-green-600" /> Required Subjects:
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {course.requiredSubjects.map((subjectReq: { id: string, minGrade: string }) => {
                                      const hasSubject = hasRequiredSubject(subjectReq);
                                      return (
                                        <Badge 
                                          key={subjectReq.id}
                                          variant={hasSubject ? "default" : "outline"}
                                          className={hasSubject ? "bg-green-600" : "border-red-500 text-red-500"}
                                        >
                                          {getSubjectName(subjectReq.id)} (Min. {subjectReq.minGrade})
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              
                              {course.recommendedSubjects && course.recommendedSubjects.length > 0 && (
                                <div className="mt-3 text-sm">
                                  <span className="font-medium flex items-center">
                                    <AlertCircle size={14} className="mr-1 text-amber-500" /> Recommended Subjects:
                                  </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {course.recommendedSubjects.map((subjectId: string) => {
                                      const isStudied = selectedGrades.some(sg => sg.subjectId === subjectId);
                                      return (
                                        <Badge 
                                          key={subjectId}
                                          variant={isStudied ? "default" : "outline"}
                                          className={isStudied ? "bg-education-primary" : ""}
                                        >
                                          {getSubjectName(subjectId)}
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
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
