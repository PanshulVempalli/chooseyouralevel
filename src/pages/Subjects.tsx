
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
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 md:mb-10 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 gradient-text animate-fade-in">
                A-Level Subjects
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 animate-fade-in">
                Explore all available A-Level subjects and their descriptions
              </p>
              
              <div className="relative max-w-md mx-auto glass-card animate-fade-in">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search subjects..."
                  className="pl-10 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-education-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4 md:space-y-6 animate-fade-in">
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
                    <AccordionItem value={category} className="border-b border-border">
                      <AccordionTrigger className="text-lg md:text-xl font-medium hover:no-underline hover:text-education-primary py-3 md:py-4">
                        {category} <span className="text-xs md:text-sm text-muted-foreground ml-2">({categorySubjects.length})</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-2">
                          {categorySubjects.map((subject) => (
                            <Card key={subject.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                              <CardHeader className="pb-2">
                                <div className="flex items-center">
                                  <div className="bg-education-primary/10 p-1.5 rounded-full mr-2">
                                    <BookOpen className="h-4 w-4 text-education-primary" />
                                  </div>
                                  <CardTitle className="text-base md:text-lg">{subject.name}</CardTitle>
                                </div>
                                <CardDescription>{category}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm md:text-base">{subject.description}</p>
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
                <div className="text-center py-8 md:py-10 glass-card p-6 md:p-8 rounded-xl">
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
