
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { SubjectGrade } from "@/utils/matchGrades";
import { subjects } from "@/data/subjects";

interface RequiredSubject {
  id: string;
  minGrade: string;
}

interface InteractiveRequirementsCardProps {
  courseName: string;
  university: string;
  entryRequirements?: string;
  requiredSubjects?: RequiredSubject[];
  recommendedSubjects?: string[];
  studentGrades: SubjectGrade[];
}

const InteractiveRequirementsCard = ({
  courseName,
  university,
  entryRequirements,
  requiredSubjects,
  recommendedSubjects,
  studentGrades,
}: InteractiveRequirementsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Helper function to get subject name from ID
  const getSubjectName = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
  };
  
  // Check if student has subject and meets grade requirement
  const checkSubjectRequirement = (requiredSubject: RequiredSubject) => {
    const studentSubject = studentGrades.find(sg => sg.subjectId === requiredSubject.id);
    if (!studentSubject) {
      return {
        status: "missing",
        message: `You haven't studied ${getSubjectName(requiredSubject.id)}`
      };
    }
    
    // Convert grades to numerical values for comparison
    const gradeToPoints = (grade: string) => {
      const grades = ["A*", "A", "B", "C", "D", "E", "U"];
      return grades.length - grades.indexOf(grade) - 1;
    };
    
    const studentGradePoints = gradeToPoints(studentSubject.grade);
    const requiredGradePoints = gradeToPoints(requiredSubject.minGrade);
    
    if (studentGradePoints >= requiredGradePoints) {
      return {
        status: "met",
        message: `You achieved ${studentSubject.grade} in ${getSubjectName(requiredSubject.id)}, which meets the minimum requirement of ${requiredSubject.minGrade}`
      };
    } else {
      return {
        status: "failed",
        message: `You achieved ${studentSubject.grade} in ${getSubjectName(requiredSubject.id)}, but the minimum requirement is ${requiredSubject.minGrade}`
      };
    }
  };
  
  // Check if student has recommended subjects
  const checkRecommendedSubject = (subjectId: string) => {
    return studentGrades.some(sg => sg.subjectId === subjectId);
  };
  
  // Parse entry requirements to extract grade requirements
  const parseEntryRequirements = () => {
    if (!entryRequirements) return null;
    
    const requirementLower = entryRequirements.toLowerCase();
    const gradePatterns = {
      "a*a*a*": "Three A* grades required",
      "a*a*a": "Two A* grades and one A grade required",
      "a*aa": "One A* grade and two A grades required",
      "aaa": "Three A grades required",
      "aab": "Two A grades and one B grade required",
      "abb": "One A grade and two B grades required",
      "bbb": "Three B grades required",
      "bbc": "Two B grades and one C grade required",
      "bcc": "One B grade and two C grades required",
      "ccc": "Three C grades required"
    };
    
    for (const [pattern, explanation] of Object.entries(gradePatterns)) {
      if (requirementLower.includes(pattern)) {
        return {
          pattern,
          explanation
        };
      }
    }
    
    if (requirementLower.includes("ucas points")) {
      const pointsMatch = requirementLower.match(/(\d+)\s*ucas points/i);
      if (pointsMatch) {
        return {
          pattern: `${pointsMatch[1]} UCAS points`,
          explanation: `You need to achieve ${pointsMatch[1]} UCAS points across your qualifications`
        };
      }
    }
    
    return null;
  };
  
  const overallRequirementPattern = parseEntryRequirements();

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{courseName} - Requirements</CardTitle>
        <p className="text-muted-foreground text-sm">{university}</p>
      </CardHeader>
      
      <CardContent>
        {/* Overall grade requirements */}
        {entryRequirements && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium mb-2">Grade Requirements</h4>
              {overallRequirementPattern && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{overallRequirementPattern.explanation}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-sm">{entryRequirements}</p>
          </div>
        )}
        
        {/* Required subjects with check/x icons and tooltips */}
        {requiredSubjects && requiredSubjects.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Required Subjects</h4>
            <div className="space-y-2">
              {requiredSubjects.map(subject => {
                const requirement = checkSubjectRequirement(subject);
                return (
                  <TooltipProvider key={subject.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`flex items-center justify-between p-2 rounded-md ${
                          requirement.status === 'met' ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          <span className="text-sm">
                            {getSubjectName(subject.id)} (Min. {subject.minGrade})
                          </span>
                          {requirement.status === 'met' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{requirement.message}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Recommended subjects collapsible */}
        {recommendedSubjects && recommendedSubjects.length > 0 && (
          <Collapsible open={expanded} onOpenChange={setExpanded}>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium mb-2">Recommended Subjects</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="space-y-2 pl-1">
                {recommendedSubjects.map(subjectId => {
                  const hasSubject = checkRecommendedSubject(subjectId);
                  return (
                    <div key={subjectId} className="flex items-center gap-2">
                      {hasSubject ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Info className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm">
                        {getSubjectName(subjectId)}
                      </span>
                      {hasSubject && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 ml-auto">
                          Studied
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveRequirementsCard;
