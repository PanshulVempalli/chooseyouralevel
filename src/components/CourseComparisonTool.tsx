
import { useState } from "react";
import { CheckCircle2, AlertCircle, BookOpen, Building, X, GraduationCap, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { subjects } from "@/data/subjects";

type Course = {
  id: string;
  name: string;
  university: string;
  description: string;
  entryRequirements?: string;
  requiredSubjects?: {
    id: string;
    minGrade: string;
  }[];
  recommendedSubjects?: string[];
  careerOpportunities?: string[];
  duration?: string;
};

interface CourseComparisonToolProps {
  courses: Course[];
}

const CourseComparisonTool = ({ courses }: CourseComparisonToolProps) => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Get subject name from ID
  const getSubjectName = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
  };

  // Toggle course selection for comparison
  const toggleCourseSelection = (course: Course) => {
    if (selectedCourses.some(c => c.id === course.id)) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    } else {
      if (selectedCourses.length < 3) {
        setSelectedCourses([...selectedCourses, course]);
      }
    }
  };

  const clearComparison = () => {
    setSelectedCourses([]);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="font-medium text-lg mr-2">Course Comparison</h3>
          <span className="text-sm text-muted-foreground">(Select up to 3 courses)</span>
        </div>
        <div className="flex items-center gap-2">
          {selectedCourses.length > 1 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsOpen(true)}
            >
              Compare ({selectedCourses.length})
            </Button>
          )}
          {selectedCourses.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearComparison}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className={`border rounded-md p-3 cursor-pointer transition-colors ${
              selectedCourses.some(c => c.id === course.id) 
                ? 'border-education-primary bg-accent' 
                : 'hover:bg-muted'
            }`}
            onClick={() => toggleCourseSelection(course)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedCourses.some(c => c.id === course.id) ? (
                  <CheckCircle2 className="h-4 w-4 text-education-primary mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.university}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Course Comparison</DialogTitle>
            <DialogDescription>
              Compare details between your selected courses
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(80vh-10rem)]">
            <div className="py-4">
              {/* University & Course Names */}
              <div className="grid grid-cols-4 gap-4">
                <div className="font-medium">University & Course</div>
                {selectedCourses.map(course => (
                  <div key={course.id}>
                    <div className="font-medium">{course.university}</div>
                    <div className="text-muted-foreground">{course.name}</div>
                  </div>
                ))}
              </div>
              
              <hr className="my-4" />
              
              {/* Entry Requirements */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-medium">Entry Requirements</div>
                {selectedCourses.map(course => (
                  <div key={`${course.id}-entry`} className="text-sm">
                    {course.entryRequirements || "Not specified"}
                  </div>
                ))}
              </div>
              
              {/* Required Subjects */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-medium">Required Subjects</div>
                {selectedCourses.map(course => (
                  <div key={`${course.id}-req`}>
                    {course.requiredSubjects && course.requiredSubjects.length > 0 ? (
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {course.requiredSubjects.map(req => (
                          <li key={req.id}>
                            {getSubjectName(req.id)} ({req.minGrade})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-muted-foreground">None specified</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Recommended Subjects */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-medium">Recommended Subjects</div>
                {selectedCourses.map(course => (
                  <div key={`${course.id}-rec`}>
                    {course.recommendedSubjects && course.recommendedSubjects.length > 0 ? (
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {course.recommendedSubjects.map(subjectId => (
                          <li key={subjectId}>
                            {getSubjectName(subjectId)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-muted-foreground">None specified</span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Course Duration */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-medium">Duration</div>
                {selectedCourses.map(course => (
                  <div key={`${course.id}-dur`} className="text-sm">
                    {course.duration || "Not specified"}
                  </div>
                ))}
              </div>
              
              {/* Career Opportunities */}
              <div className="grid grid-cols-4 gap-4">
                <div className="font-medium">Career Opportunities</div>
                {selectedCourses.map(course => (
                  <div key={`${course.id}-careers`} className="text-sm">
                    {course.careerOpportunities && course.careerOpportunities.length > 0 
                      ? course.careerOpportunities.join(", ") 
                      : "Various opportunities available"
                    }
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseComparisonTool;
