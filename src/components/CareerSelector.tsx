
import { useState } from "react";
import { careers } from "@/data/careers";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CareerSelectorProps {
  onCareerSelect: (careerId: string) => void;
}

export const CareerSelector = ({ onCareerSelect }: CareerSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCareers = careers.filter(career => 
    career.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-2 border-muted/30">
        <CardHeader>
          <CardTitle className="text-xl">Search for a Career</CardTitle>
          <CardDescription>
            Find your dream career from the list below or use the search box
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((career) => (
            <Card 
              key={career.id} 
              className="cursor-pointer transition-all hover:shadow-md hover:border-education-primary/50"
              onClick={() => onCareerSelect(career.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{career.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3">{career.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-education-primary hover:text-white"
                  onClick={() => onCareerSelect(career.id)}
                >
                  Select This Career
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center p-8">
            <p className="text-muted-foreground">No careers found matching '{searchTerm}'</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerSelector;
