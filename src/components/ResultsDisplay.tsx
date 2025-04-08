
import { Course, Career } from "@/data/careers";
import { subjects } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Briefcase, RotateCcw, ExternalLink } from "lucide-react";

interface ResultsDisplayProps {
  courses: Course[];
  careers: Career[];
  selectedSubjects: string[];
  onReset: () => void;
}

const ResultsDisplay = ({ courses, careers, selectedSubjects, onReset }: ResultsDisplayProps) => {
  const getSubjectName = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-education-primary mb-2">
            Your Future Pathways
          </h3>
          <p className="text-muted-foreground">
            Based on your selection of:
          </p>
          <p className="font-medium">
            {selectedSubjects.map(getSubjectName).join(", ")}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={onReset} 
          className="mt-4 sm:mt-0 flex items-center gap-2"
        >
          <RotateCcw size={16} /> Change Subjects
        </Button>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen size={18} />
            <span>University Courses</span>
            <span className="ml-1 text-xs bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {courses.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <Briefcase size={18} />
            <span>Career Paths</span>
            <span className="ml-1 text-xs bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center">
              {careers.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-0">
          {courses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">No matching courses found. Try selecting different subjects.</p>
                <Button onClick={onReset}>Change Subjects</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>University Degree</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-4">{course.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Required/Recommended Subjects:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {course.subjects.map((subjectId) => (
                          <li key={subjectId} className={`${selectedSubjects.includes(subjectId) ? "font-medium text-education-primary" : ""}`}>
                            {getSubjectName(subjectId)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink size={14} className="mr-2" />
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="careers" className="mt-0">
          {careers.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">No matching careers found. Try selecting different subjects.</p>
                <Button onClick={onReset}>Change Subjects</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careers.map((career) => (
                <Card key={career.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{career.name}</CardTitle>
                    <CardDescription>Career Path</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-4">{career.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Relevant Subjects:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {career.relatedSubjects.map((subjectId) => (
                          <li key={subjectId} className={`${selectedSubjects.includes(subjectId) ? "font-medium text-education-primary" : ""}`}>
                            {getSubjectName(subjectId)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Common University Courses:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {career.commonCourses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink size={14} className="mr-2" />
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
