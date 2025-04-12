
import { ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ExportResultsButton from "@/components/ExportResultsButton";
import { regions } from "@/utils/regionUtils";
import { SubjectGrade } from "@/utils/matchGrades";

interface ResultsHeaderProps {
  selectedGrades: SubjectGrade[];
  matchedCourses: any[];
  ucasPoints: number;
  aLevelPoints: number;
  extraPoints: number;
  regionPreferences: string[];
  getSubjectName: (id: string) => string;
  resetResults: () => void;
}

const ResultsHeader = ({
  selectedGrades,
  matchedCourses,
  ucasPoints,
  aLevelPoints,
  extraPoints,
  regionPreferences,
  getSubjectName,
  resetResults,
}: ResultsHeaderProps) => {
  return (
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
            <span className="text-muted-foreground">A-Level UCAS Points:</span> {aLevelPoints}
          </div>
          {extraPoints > 0 && (
            <div className="font-medium">
              <span className="text-muted-foreground">Extra Activities:</span> +{extraPoints} points
            </div>
          )}
          <div className="font-medium text-education-primary">
            <span className="text-muted-foreground">Total UCAS Points:</span> {ucasPoints}
          </div>
        </div>
        {regionPreferences.length > 0 && !regionPreferences.includes("none") && (
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-muted-foreground text-sm">Regions:</span>
            {regionPreferences.map(region => (
              <Badge key={region} variant="outline" className="bg-blue-50 text-blue-800">
                <Globe className="mr-1 h-3 w-3" /> 
                {regions.find(r => r.value === region)?.label || region}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="ml-auto">
        <ExportResultsButton 
          selectedGrades={selectedGrades}
          matchedCourses={matchedCourses}
          ucasPoints={ucasPoints}
          regionPreference={regionPreferences.join(", ")}
        />
      </div>
    </div>
  );
};

export default ResultsHeader;
