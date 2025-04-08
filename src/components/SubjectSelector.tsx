
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { subjects, subjectCategories } from "@/data/subjects";
import { ChevronDown, ChevronUp, Filter, CheckSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SubjectSelectorProps {
  selectedSubjects: string[];
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
}

const SubjectSelector = ({ 
  selectedSubjects, 
  setSelectedSubjects,
  onSubmit 
}: SubjectSelectorProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Science & Mathematics"]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const toggleSubject = (subjectId: string) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    } else {
      if (selectedSubjects.length < 4) {
        setSelectedSubjects([...selectedSubjects, subjectId]);
      }
    }
  };
  
  const filteredCategories = categoryFilter 
    ? [categoryFilter] 
    : subjectCategories;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-education-primary">Choose Your A-Level Subjects</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {selectedSubjects.length}/4 selected
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <div className="space-y-2">
                <Button 
                  variant={categoryFilter === null ? "default" : "outline"} 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setCategoryFilter(null)}
                >
                  All Categories
                </Button>
                {subjectCategories.map(category => (
                  <Button 
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"} 
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          {filteredCategories.map(category => (
            <div key={category} className="mb-4 last:mb-0">
              <div 
                className="flex justify-between items-center cursor-pointer p-2 hover:bg-muted rounded-md"
                onClick={() => toggleCategory(category)}
              >
                <h4 className="font-medium">{category}</h4>
                {expandedCategories.includes(category) ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              
              {expandedCategories.includes(category) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 ml-2">
                  {subjects
                    .filter(subject => subject.category === category)
                    .map(subject => (
                      <div
                        key={subject.id}
                        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                          selectedSubjects.includes(subject.id)
                            ? "bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => toggleSubject(subject.id)}
                      >
                        <Checkbox
                          id={subject.id}
                          checked={selectedSubjects.includes(subject.id)}
                          disabled={!selectedSubjects.includes(subject.id) && selectedSubjects.length >= 4}
                        />
                        <label
                          htmlFor={subject.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {subject.name}
                        </label>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={onSubmit} 
          disabled={selectedSubjects.length < 3} 
          className="bg-education-primary hover:bg-education-primary/90"
        >
          <CheckSquare className="mr-2 h-4 w-4" />
          Find My Pathways
        </Button>
      </div>
    </div>
  );
};

export default SubjectSelector;
