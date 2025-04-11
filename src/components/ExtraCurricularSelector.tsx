
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExtraCurricular } from "@/utils/matchGrades";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Award, X } from "lucide-react";

// Common extracurricular activities and their approximate UCAS point values
const commonActivities = [
  { id: "epq", name: "Extended Project Qualification (EPQ)", defaultPoints: 28 },
  { id: "music", name: "Music Qualifications (Grade 8+)", defaultPoints: 30 },
  { id: "sports", name: "Sports Leadership Award", defaultPoints: 16 },
  { id: "duke", name: "Duke of Edinburgh Gold Award", defaultPoints: 16 },
  { id: "volunteer", name: "Volunteering Award", defaultPoints: 8 },
  { id: "language", name: "Additional Language Qualification", defaultPoints: 24 },
  { id: "custom", name: "Custom Activity", defaultPoints: 0 }
];

interface ExtraCurricularSelectorProps {
  selectedActivities: ExtraCurricular[];
  setSelectedActivities: (activities: ExtraCurricular[]) => void;
}

const ExtraCurricularSelector: React.FC<ExtraCurricularSelectorProps> = ({
  selectedActivities,
  setSelectedActivities
}) => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [customActivityName, setCustomActivityName] = useState<string>("");
  const [pointsValue, setPointsValue] = useState<number>(0);

  const handleActivityChange = (activityId: string) => {
    setSelectedActivityId(activityId);
    if (activityId !== "custom") {
      const activity = commonActivities.find(a => a.id === activityId);
      if (activity) {
        setPointsValue(activity.defaultPoints);
      }
    } else {
      setPointsValue(0);
      setCustomActivityName("");
    }
  };

  const handleAddActivity = () => {
    if (!selectedActivityId) return;
    
    const activity = commonActivities.find(a => a.id === selectedActivityId);
    if (!activity) return;
    
    const activityName = selectedActivityId === "custom" 
      ? customActivityName || "Custom Activity" 
      : activity.name;
    
    const newActivity: ExtraCurricular = {
      activityId: selectedActivityId,
      name: activityName,
      pointsValue: pointsValue
    };
    
    setSelectedActivities([...selectedActivities, newActivity]);
    setSelectedActivityId("");
    setCustomActivityName("");
    setPointsValue(0);
  };

  const handleRemoveActivity = (index: number) => {
    const updatedActivities = [...selectedActivities];
    updatedActivities.splice(index, 1);
    setSelectedActivities(updatedActivities);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Award className="h-5 w-5 text-education-primary" />
        <h3 className="font-medium">Extracurricular Activities & Additional Qualifications</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="activity-select">Select Activity</Label>
          <Select
            value={selectedActivityId}
            onValueChange={handleActivityChange}
          >
            <SelectTrigger id="activity-select" className="w-full">
              <SelectValue placeholder="Select activity..." />
            </SelectTrigger>
            <SelectContent>
              {commonActivities.map(activity => (
                <SelectItem key={activity.id} value={activity.id}>
                  {activity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedActivityId === "custom" && (
          <div>
            <Label htmlFor="custom-name">Activity Name</Label>
            <Input
              id="custom-name"
              value={customActivityName}
              onChange={(e) => setCustomActivityName(e.target.value)}
              placeholder="Enter activity name"
            />
          </div>
        )}

        <div>
          <Label htmlFor="points-value">UCAS Points Value</Label>
          <Input
            id="points-value"
            type="number"
            min="0"
            max="100"
            value={pointsValue}
            onChange={(e) => setPointsValue(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleAddActivity} 
            disabled={!selectedActivityId || (selectedActivityId === "custom" && !customActivityName)}
            className="w-full"
          >
            Add Activity
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Selected Activities:</h4>
        {selectedActivities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activities added. Add activities to increase your total UCAS points.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedActivities.map((activity, index) => (
              <Badge
                key={index}
                className="py-2 pl-3 pr-2 flex items-center gap-1"
                variant="secondary"
              >
                {activity.name} ({activity.pointsValue} pts)
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 rounded-full"
                  onClick={() => handleRemoveActivity(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtraCurricularSelector;
