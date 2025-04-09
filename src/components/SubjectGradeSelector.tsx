
import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { subjects } from "@/data/subjects";
import { SubjectGrade } from "@/utils/matchGrades";

const grades = ["A*", "A", "B", "C", "D", "E", "U"];

interface SubjectGradeSelectorProps {
  selectedGrades: SubjectGrade[];
  onAddGrade: (subjectId: string, grade: string) => void;
}

const SubjectGradeSelector: React.FC<SubjectGradeSelectorProps> = ({
  selectedGrades,
  onAddGrade,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("A*");
  const [availableSubjects, setAvailableSubjects] = useState<typeof subjects>([]);
  
  // Make sure subjects is always an array
  const subjectsList = Array.isArray(subjects) ? subjects : [];
  
  // Update available subjects whenever selectedGrades changes
  useEffect(() => {
    if (subjectsList.length > 0) {
      // Filter out subjects that are already selected
      const filtered = subjectsList.filter(
        (subject) => !selectedGrades.some((sg) => sg.subjectId === subject.id)
      );
      setAvailableSubjects(filtered);
    }
  }, [selectedGrades, subjectsList]);

  const handleSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setOpen(false);
  };

  const handleAddGrade = () => {
    if (selectedSubject) {
      onAddGrade(selectedSubject, selectedGrade);
      setSelectedSubject(null);
      setSelectedGrade("A*");
      setOpen(false);
    }
  };

  const getSubjectName = (id: string) => {
    if (!subjectsList.length) return id;
    const subject = subjectsList.find((s) => s.id === id);
    return subject ? subject.name : id;
  };

  return (
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
              disabled={availableSubjects.length === 0}
            >
              {selectedSubject
                ? getSubjectName(selectedSubject)
                : availableSubjects.length === 0
                  ? "No more subjects available"
                  : "Select subject..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            {availableSubjects.length === 0 ? (
              <div className="p-2 text-sm text-center">
                No more subjects available
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto p-1">
                {availableSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => handleSelect(subject.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-accent",
                      selectedSubject === subject.id && "bg-accent"
                    )}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {selectedSubject === subject.id && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                    <span>{subject.name}</span>
                  </div>
                ))}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Select Grade
        </label>
        <div className="flex space-x-2">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
  );
};

export default SubjectGradeSelector;
