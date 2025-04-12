
import { useState } from "react";
import { BookOpen, Building, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InteractiveRequirementsCard from "@/components/InteractiveRequirementsCard";
import { SubjectGrade } from "@/utils/matchGrades";

interface CourseListProps {
  courses: any[];
  selectedGrades: SubjectGrade[];
  getSubjectName: (id: string) => string;
  getUniversityRegion: (universityName: string) => string;
  hasRequiredSubject: (requiredSubject: { id: string, minGrade: string }) => boolean;
  getInstitutionType: (universityName: string) => string;
  getInstitutionColor: (universityName: string) => string;
}

const CourseList = ({
  courses,
  selectedGrades,
  getSubjectName,
  getUniversityRegion,
  hasRequiredSubject,
  getInstitutionType,
  getInstitutionColor
}: CourseListProps) => {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  return (
    <div className="space-y-4">
      {courses.map((course: any) => (
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
  );
};

export default CourseList;
