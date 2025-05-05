
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { careers } from "@/data/careers";
import { subjects } from "@/data/subjects";
import { CareerSelector } from "@/components/CareerSelector";
import { SubjectRecommendations } from "@/components/SubjectRecommendations";
import { Card } from "@/components/ui/card";

const CareerToSubjects = () => {
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId);
    setShowResults(true);
  };

  const resetSelection = () => {
    setSelectedCareer("");
    setShowResults(false);
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Find Subjects for Your Dream Career</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your dream career path, and we'll recommend A-Level subjects that
            will help you pursue that career.
          </p>
        </div>

        {!showResults ? (
          <CareerSelector onCareerSelect={handleCareerSelect} />
        ) : (
          <SubjectRecommendations careerId={selectedCareer} onReset={resetSelection} />
        )}
      </div>
    </Layout>
  );
};

export default CareerToSubjects;
