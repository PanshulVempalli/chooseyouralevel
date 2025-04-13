
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { BookOpenText, MessageCircle, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar"; // Import Navbar component

const Guidance = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the feedback to a server
    // For now, we'll just display a success message
    toast.success("Thank you for your feedback!");
    setFeedback("");
    setEmail("");
  };

  return (
    <>
      <Navbar /> {/* Add Navbar component at the top */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpenText size={32} className="text-education-primary" />
          <h1 className="text-3xl font-bold">Guidance & Support</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="text-education-primary" />
                  Frequently Asked Questions (FAQs)
                </CardTitle>
                <CardDescription>
                  Get answers to common questions about using A-Level Pathfinder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I use the Grade Calculator?</AccordionTrigger>
                    <AccordionContent>
                      <p>The Grade Calculator helps you find university courses based on your predicted A-level grades. To use it:</p>
                      <ol className="mt-2 ml-5 list-decimal">
                        <li>Select your subjects and grades</li>
                        <li>Add any extracurricular activities</li>
                        <li>Select your preferred regions</li>
                        <li>Click "Find Matching Courses" to see results</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What do the UCAS points mean?</AccordionTrigger>
                    <AccordionContent>
                      UCAS points are a way of measuring the relative value of all post-16 qualifications in the UK. 
                      Universities often use UCAS points in their entry requirements. The higher your grades, 
                      the more UCAS points you'll have, which can help you qualify for more courses.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How accurate are the course recommendations?</AccordionTrigger>
                    <AccordionContent>
                      Our recommendations are based on typical entry requirements for courses, but universities may 
                      update their requirements. Always check the university's official website for the most current information 
                      before making any decisions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I compare different sets of grades?</AccordionTrigger>
                    <AccordionContent>
                      Yes! You can use the Grade Improvement Simulator to see how improving your grades might affect 
                      your university options. This can help you understand which subjects to focus on.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I select multiple regions?</AccordionTrigger>
                    <AccordionContent>
                      In the Grade Calculator, you can select multiple regions by clicking on the checkboxes next to each region name.
                      This allows you to see course recommendations from different parts of the UK.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-education-primary" />
                  Feedback & Suggestions
                </CardTitle>
                <CardDescription>
                  We'd love to hear your thoughts on how we can improve A-Level Pathfinder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email (optional)
                      </label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="feedback" className="text-sm font-medium">
                        Your Feedback
                      </label>
                      <Textarea
                        id="feedback"
                        placeholder="Tell us your suggestions or report any issues you've found..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                  </div>
                  <Button className="mt-4 w-full bg-education-primary hover:bg-education-primary/90" type="submit">
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
                <p>Your feedback helps us improve the A-Level Pathfinder for everyone.</p>
                <p>We read all feedback but may not be able to respond to each submission individually.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guidance;
