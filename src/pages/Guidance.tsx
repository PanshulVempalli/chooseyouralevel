import React, { useState } from "react";
import Layout from "@/components/Layout";
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
import { BookOpenText, MessageCircle, MessageSquare, SendHorizontal, Brain } from "lucide-react";

// Define the chat message type
type ChatMessage = {
  type: "user" | "ai";
  message: string;
};

const Guidance = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the feedback to a server
    // For now, we'll just display a success message
    toast.success("Thank you for your feedback!");
    setFeedback("");
    setEmail("");
  };

  const handleAIQuery = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    // Add user message to chat history
    const newHistory = [...chatHistory, {type: "user" as const, message: query}];
    setChatHistory(newHistory);
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "ucas": "UCAS (Universities and Colleges Admissions Service) is the organization that manages applications to higher education courses in the UK. Points are allocated to post-16 qualifications and used by universities to compare students. For example, an A* at A-Level is worth 56 points, while an A is worth 48 points.",
        "university": "Choosing the right university depends on many factors including course content, location, facilities, opportunities, and overall fit with your learning style. Our Grade Calculator can help match your predicted grades with suitable universities.",
        "a level": "A-Levels are subject-based qualifications typically taken by UK students aged 16-18 as a pathway to university. Most students take 3-4 A-Levels over two years, with final exams at the end. They're graded from A* (highest) to E (lowest pass grade).",
        "subject": "When choosing A-Level subjects, consider your interests, strengths, and future goals. Some degree courses require specific subjects (like Medicine requiring Chemistry), while others are more flexible. Use our Subject Selector to explore options based on your interests.",
        "career": "Your A-Level choices can influence career paths, especially for fields like medicine, engineering, or law that require specific degree backgrounds. Our Career to Subjects feature can help you identify which A-Levels are recommended for your dream career.",
        "grade": "A-Level grades are crucial for university applications. An A* is the highest (90%+), followed by A (80%+), B (70%+), C (60%+), D (50%+), and E (40%+). Use our Grade Calculator to see how your predicted grades match with university requirements.",
        "default": "I'm your A-Level Pathfinder assistant, here to help with questions about A-Levels, university applications, and career pathways. Feel free to ask about specific subjects, UCAS points, university requirements, or how to use the tools on this website!"
      };
      
      // Very simple pattern matching for demo purposes
      // In a real implementation, this would be replaced with an actual AI API call
      let responseText = responses.default;
      Object.keys(responses).forEach(key => {
        if (query.toLowerCase().includes(key)) {
          responseText = responses[key];
          return;
        }
      });
      
      // Add AI response to chat history
      setChatHistory([...newHistory, {type: "ai" as const, message: responseText}]);
      setQuery("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <main className="py-12">
        <div className="container px-4">
          <div className="flex items-center gap-3 mb-8 justify-center text-center">
            <div className="bg-education-primary/10 p-3 rounded-full">
              <BookOpenText size={32} className="text-education-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Guidance & Support</h1>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 animate-fade-in">
            <div className="order-2 md:order-1">
              <Card className="fancy-border-gradient card-hover h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="text-education-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Get answers to common questions about using A-Level Pathfinder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-border">
                      <AccordionTrigger className="hover:text-education-primary hover:no-underline">
                        How do I use the Grade Calculator?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p>The Grade Calculator helps you find university courses based on your predicted A-level grades. To use it:</p>
                          <ol className="mt-2 ml-5 list-decimal">
                            <li className="mb-1">Select your subjects and grades</li>
                            <li className="mb-1">Add any extracurricular activities</li>
                            <li className="mb-1">Select your preferred regions</li>
                            <li>Click "Find Matching Courses" to see results</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-border">
                      <AccordionTrigger className="hover:text-education-primary hover:no-underline">
                        What do the UCAS points mean?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          UCAS points are a way of measuring the relative value of all post-16 qualifications in the UK. 
                          Universities often use UCAS points in their entry requirements. The higher your grades, 
                          the more UCAS points you'll have, which can help you qualify for more courses.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3" className="border-b border-border">
                      <AccordionTrigger className="hover:text-education-primary hover:no-underline">
                        How accurate are the course recommendations?
                      </AccordionTrigger>
                      <AccordionContent>
                        Our recommendations are based on typical entry requirements for courses, but universities may 
                        update their requirements. Always check the university's official website for the most current information 
                        before making any decisions.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4" className="border-b border-border">
                      <AccordionTrigger className="hover:text-education-primary hover:no-underline">
                        Can I compare different sets of grades?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes! You can use the Grade Improvement Simulator to see how improving your grades might affect 
                        your university options. This can help you understand which subjects to focus on.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border-b border-border">
                      <AccordionTrigger className="hover:text-education-primary hover:no-underline">
                        How do I select multiple regions?
                      </AccordionTrigger>
                      <AccordionContent>
                        In the Grade Calculator, you can select multiple regions by clicking on the checkboxes next to each region name.
                        This allows you to see course recommendations from different parts of the UK.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 md:order-2">
              <Card className="fancy-border-gradient card-hover h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-education-primary" />
                    A-Level Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about A-Levels, universities and careers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 mb-4 h-[250px] overflow-y-auto">
                    {chatHistory.length === 0 ? (
                      <div className="text-center text-muted-foreground py-10">
                        <Brain className="mx-auto h-10 w-10 mb-2 opacity-50" />
                        <p>Ask a question to get started</p>
                      </div>
                    ) : (
                      chatHistory.map((chat, index) => (
                        <div 
                          key={index} 
                          className={`mb-3 ${chat.type === 'user' ? 'text-right' : ''}`}
                        >
                          <div 
                            className={`inline-block rounded-lg p-3 max-w-[85%] ${
                              chat.type === 'user' 
                                ? 'bg-education-primary/80 text-white' 
                                : 'bg-muted/80'
                            }`}
                          >
                            {chat.message}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAIQuery} className="mt-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ask about A-Levels, universities, careers..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                        className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-education-primary"
                      />
                      <Button 
                        type="submit" 
                        variant="gradient" 
                        size="icon" 
                        disabled={isLoading}
                        className="shrink-0"
                      >
                        {isLoading ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <SendHorizontal size={18} />
                        )}
                      </Button>
                    </div>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try asking about UCAS points, choosing subjects, or university requirements.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
                  <p>This is an educational assistant designed to help with general questions.</p>
                  <p>Always verify important information with official sources.</p>
                </CardFooter>
              </Card>
            </div>

            <div className="order-3 md:col-span-2">
              <Card className="fancy-border-gradient card-hover">
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
                          className="bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-education-primary"
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
                          className="min-h-[150px] bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-education-primary"
                          required
                        />
                      </div>
                    </div>
                    <Button className="mt-4 w-full" variant="gradient" type="submit">
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
      </main>
    </Layout>
  );
};

export default Guidance;
