
import { careers } from "@/data/careers";
import { subjects } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Book, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

interface SubjectRecommendationsProps {
  careerId: string;
  onReset: () => void;
}

export const SubjectRecommendations = ({ careerId, onReset }: SubjectRecommendationsProps) => {
  const career = careers.find(c => c.id === careerId);
  
  if (!career) {
    return (
      <div className="text-center p-8">
        <p>Career not found. Please try again.</p>
        <Button onClick={onReset} className="mt-4">Go Back</Button>
      </div>
    );
  }

  // Get recommended subjects
  const recommendedSubjectIds = career.relatedSubjects;
  const recommendedSubjects = subjects.filter(subject => 
    recommendedSubjectIds.includes(subject.id)
  );

  // Group subjects by category
  const groupedSubjects = recommendedSubjects.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = [];
    }
    acc[subject.category].push(subject);
    return acc;
  }, {} as Record<string, typeof subjects>);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{career.name}</h2>
          <p className="text-muted-foreground">{career.description}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} /> Change Career
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          These subject recommendations are based on typical requirements for this career path. Always check with specific universities and programs for their exact entry requirements.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" /> Recommended Subjects
          </CardTitle>
          <CardDescription>
            These subjects will help prepare you for a career as a {career.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.keys(groupedSubjects).length > 0 ? (
            Object.entries(groupedSubjects).map(([category, subjectList]) => (
              <div key={category}>
                <h3 className="font-medium mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {subjectList.map(subject => (
                    <Badge key={subject.id} variant="outline" className="text-base py-1.5 px-3 bg-accent">
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No specific subjects recommended. This career may have flexible subject requirements.</p>
          )}

          <div className="pt-4">
            <h3 className="font-medium mb-2">Common University Courses</h3>
            <ul className="list-disc list-inside space-y-1">
              {career.commonCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/subject-selector">
                Explore Subjects
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/grade-calculator">
                Calculate Grade Requirements
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectRecommendations;
