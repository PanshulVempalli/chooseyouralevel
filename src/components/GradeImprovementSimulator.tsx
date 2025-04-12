
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubjectGrade, matchGradesToCourses } from "@/utils/matchGrades";
import { Badge } from "@/components/ui/badge";
import { subjects } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, BarChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GradeImprovementSimulatorProps {
  currentGrades: SubjectGrade[];
  currentUcasPoints: number;
}

const GradeImprovementSimulator = ({ currentGrades, currentUcasPoints }: GradeImprovementSimulatorProps) => {
  const [subjectToImprove, setSubjectToImprove] = useState<string>("");
  const [improvedGrade, setImprovedGrade] = useState<string>("");
  const [potentialPoints, setPotentialPoints] = useState<number>(currentUcasPoints);
  const [additionalCourses, setAdditionalCourses] = useState<number>(0);
  const { toast } = useToast();

  // Get available grades higher than current
  const getAvailableHigherGrades = (currentGrade: string): string[] => {
    const allGrades = ["A*", "A", "B", "C", "D", "E"];
    const currentIndex = allGrades.indexOf(currentGrade);
    if (currentIndex <= 0) return []; // Already at highest grade
    return allGrades.slice(0, currentIndex);
  };

  // Get subject name from ID
  const getSubjectName = (id: string) => {
    const subject = subjects.find(s => s.id === id);
    return subject ? subject.name : id;
  };

  // Calculate new UCAS points and additional courses if grade improved
  const simulateImprovement = () => {
    if (!subjectToImprove || !improvedGrade) {
      toast({
        title: "Please select a subject and grade",
        description: "You need to select which subject to improve and the new grade.",
        variant: "destructive"
      });
      return;
    }

    const updatedGrades = currentGrades.map(grade => 
      grade.subjectId === subjectToImprove ? 
      { ...grade, grade: improvedGrade } : grade
    );
    
    const originalResults = matchGradesToCourses(currentGrades);
    const improvedResults = matchGradesToCourses(updatedGrades);
    
    setPotentialPoints(improvedResults.ucasPoints);
    
    const extraCourses = improvedResults.courses.length - originalResults.courses.length;
    setAdditionalCourses(extraCourses > 0 ? extraCourses : 0);
    
    toast({
      title: "Improvement Simulated",
      description: `Improving ${getSubjectName(subjectToImprove)} to ${improvedGrade} would give you ${improvedResults.ucasPoints} UCAS points.`,
    });
  };
  
  // Reset when current grades change
  useEffect(() => {
    setPotentialPoints(currentUcasPoints);
    setAdditionalCourses(0);
    setSubjectToImprove("");
    setImprovedGrade("");
  }, [currentGrades, currentUcasPoints]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-education-primary" />
          Grade Improvement Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          See how improving a grade could affect your UCAS points and course options.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject to Improve</label>
            <Select value={subjectToImprove} onValueChange={setSubjectToImprove}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {currentGrades.map((grade) => {
                  if (grade.grade !== "A*") { // Only show subjects that can be improved
                    return (
                      <SelectItem key={grade.subjectId} value={grade.subjectId}>
                        {getSubjectName(grade.subjectId)}: Currently {grade.grade}
                      </SelectItem>
                    );
                  }
                  return null;
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Improve To</label>
            <Select 
              value={improvedGrade} 
              onValueChange={setImprovedGrade}
              disabled={!subjectToImprove}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new grade" />
              </SelectTrigger>
              <SelectContent>
                {subjectToImprove && 
                  getAvailableHigherGrades(currentGrades.find(g => g.subjectId === subjectToImprove)?.grade || "").map(grade => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={simulateImprovement}
          disabled={!subjectToImprove || !improvedGrade} 
          className="w-full"
        >
          <BarChart className="mr-2 h-4 w-4" /> Simulate Improvement
        </Button>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-sm font-medium text-muted-foreground">Potential UCAS Points</div>
            <div className="flex items-center justify-center mt-2">
              <Award className="mr-2 h-5 w-5 text-education-primary" />
              <span className="text-2xl font-bold">
                {potentialPoints}
              </span>
            </div>
            {potentialPoints > currentUcasPoints && (
              <Badge variant="outline" className="bg-green-50 text-green-700 mt-2">
                +{potentialPoints - currentUcasPoints} points
              </Badge>
            )}
          </div>
          <div className="text-center p-3 bg-muted rounded-md">
            <div className="text-sm font-medium text-muted-foreground">Additional Courses</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="mr-2 h-5 w-5 text-education-primary" />
              <span className="text-2xl font-bold">{additionalCourses}</span>
            </div>
            {additionalCourses > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-700 mt-2">
                New opportunities
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeImprovementSimulator;
