
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { subjects } from "@/data/subjects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubjectGrade } from "@/utils/matchGrades";

const grades = ["A*", "A", "B", "C", "D", "E", "U"];

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
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("A*");

  // Ensure subjects is always an array
  const subjectsList = Array.isArray(subjects) ? subjects : [];
  
  // Filter out subjects that are already selected
  const availableSubjects = subjectsList.filter(
    (subject) => !selectedGrades.some((sg) => sg.subjectId === subject.id)
  );

  const handleAddGrade = () => {
    if (selectedSubject) {
      setSelectedGrades([
        ...selectedGrades,
        { subjectId: selectedSubject, grade: selectedGrade },
      ]);
      setSelectedSubject(null);
      setSelectedGrade("A*");
    }
  };

  const handleRemoveGrade = (subjectId: string) => {
    setSelectedGrades(selectedGrades.filter((sg) => sg.subjectId !== subjectId));
  };

  const getSubjectName = (id: string) => {
    if (!subjectsList.length) return id;
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  const handleSelect = (currentValue: string) => {
    setSelectedSubject(currentValue);
    setOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Your A-Level Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Subject
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedSubject
                      ? getSubjectName(selectedSubject)
                      : "Select subject..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search subjects..." />
                    <CommandEmpty>No subject found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {availableSubjects.length > 0 ? (
                        availableSubjects.map((subject) => (
                          <CommandItem
                            key={subject.id}
                            value={subject.id}
                            onSelect={() => handleSelect(subject.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedSubject === subject.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {subject.name}
                          </CommandItem>
                        ))
                      ) : (
                        <CommandItem disabled>
                          No more subjects available
                        </CommandItem>
                      )}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Grade
              </label>
              <div className="flex space-x-2">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleAddGrade}
                  disabled={!selectedSubject}
                  type="button"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

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
