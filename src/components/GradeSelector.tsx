
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectGrade } from "@/utils/matchGrades";
import { subjects } from "@/data/subjects";
import SubjectGradeSelector from "./SubjectGradeSelector";

interface GradeSelectorProps {
  selectedGrades: SubjectGrade[];
  setSelectedGrades: (grades: SubjectGrade[]) => void;
  onSubmit: () => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ 
  selectedGrades, 
  setSelectedGrades, 
  onSubmit 
}) => {
  // Helper function to get subject name by ID
  const getSubjectName = (id: string) => {
    const subjectsList = Array.isArray(subjects) ? subjects : [];
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  const handleAddGrade = (subjectId: string, grade: string) => {
    setSelectedGrades([
      ...selectedGrades,
      { subjectId, grade },
    ]);
  };

  const handleRemoveGrade = (subjectId: string) => {
    setSelectedGrades(selectedGrades.filter((sg) => sg.subjectId !== subjectId));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Your A-Level Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SubjectGradeSelector 
            selectedGrades={selectedGrades}
            onAddGrade={handleAddGrade}
          />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Selected Subjects & Grades:</h3>
            {selectedGrades.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No subjects selected. Please select at least 3 subjects.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedGrades.map((sg) => (
                  <Badge
                    key={sg.subjectId}
                    className="py-2 pl-3 pr-2 flex items-center gap-1"
                    variant="secondary"
                  >
                    {getSubjectName(sg.subjectId)}: {sg.grade}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 rounded-full"
                      onClick={() => handleRemoveGrade(sg.subjectId)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={onSubmit}
          disabled={selectedGrades.length < 3}
        >
          Find Matching University Courses
        </Button>
      </CardContent>
    </Card>
  );
};

export default GradeSelector;
