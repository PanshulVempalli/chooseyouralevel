
import { Globe } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { regions } from "@/utils/regionUtils";

interface RegionPreferenceSelectorProps {
  regionPreferences: string[];
  toggleRegion: (region: string) => void;
}

const RegionPreferenceSelector = ({
  regionPreferences,
  toggleRegion,
}: RegionPreferenceSelectorProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Globe className="mr-2 h-5 w-5 text-education-primary" />
            <h3 className="font-medium text-lg">Location Preferences</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Select your preferred regions to find universities that match your grades in those areas
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4">
              <Label htmlFor="region" className="text-base font-medium">Preferred Regions (select multiple)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {regions.map((region) => (
                  <div key={region.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`region-${region.value}`} 
                      checked={regionPreferences.includes(region.value)}
                      onCheckedChange={() => toggleRegion(region.value)}
                    />
                    <label
                      htmlFor={`region-${region.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {region.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionPreferenceSelector;
