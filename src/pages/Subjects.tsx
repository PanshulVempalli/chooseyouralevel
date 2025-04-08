
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { subjects, subjectCategories } from "@/data/subjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, BookOpen } from "lucide-react";

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-education-primary">
                A-Level Subjects
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Explore all available A-Level subjects and their descriptions
              </p>
              
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search subjects..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {subjectCategories.map((category) => {
                const categorySubjects = filteredSubjects.filter(
                  (subject) => subject.category === category
                );
                
                if (categorySubjects.length === 0) return null;
                
                return (
                  <Accordion
                    key={category}
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={searchTerm ? category : undefined}
                  >
                    <AccordionItem value={category}>
                      <AccordionTrigger className="text-xl font-medium">
                        {category} <span className="text-sm text-muted-foreground ml-2">({categorySubjects.length})</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {categorySubjects.map((subject) => (
                            <Card key={subject.id}>
                              <CardHeader className="pb-2">
                                <div className="flex items-center">
                                  <BookOpen className="h-5 w-5 text-education-primary mr-2" />
                                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                                </div>
                                <CardDescription>{category}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p>{subject.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
              
              {filteredSubjects.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No subjects found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subjects;
