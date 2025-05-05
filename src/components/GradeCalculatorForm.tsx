
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GradeSelector from "@/components/GradeSelector";
import ExtraCurricularSelector from "@/components/ExtraCurricularSelector";
import RegionPreferenceSelector from "@/components/RegionPreferenceSelector";
import { SubjectGrade, ExtraCurricular, matchGradesToCourses } from "@/utils/matchGrades";

interface GradeCalculatorFormProps {
  selectedGrades: SubjectGrade[];
  setSelectedGrades: (grades: SubjectGrade[]) => void;
  extraActivities: ExtraCurricular[];
  setExtraActivities: (activities: ExtraCurricular[]) => void;
  regionPreferences: string[];
  toggleRegion: (region: string) => void;
  handleFindCourses: () => void;
}

const GradeCalculatorForm = ({
  selectedGrades,
  setSelectedGrades,
  extraActivities,
  setExtraActivities,
  regionPreferences,
  toggleRegion,
  handleFindCourses,
}: GradeCalculatorFormProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
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
      
      <RegionPreferenceSelector 
        regionPreferences={regionPreferences}
        toggleRegion={toggleRegion}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-accent rounded-lg gap-4">
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
          className="w-full sm:w-auto"
        >
          Find Matching Courses
        </Button>
      </div>
    </div>
  );
};

export default GradeCalculatorForm;
