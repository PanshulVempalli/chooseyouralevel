
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Users, Download, BarChart, CheckCircle2, BookmarkCheck, Globe, Calculator, LineChart, MessageCircle, BookOpenText, Sparkles, Brain, FileText, School } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text animate-fade-in">
              About A-Level Pathfinder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Guiding you through the crucial decisions that shape your academic future
            </p>
          </div>
          
          <section className="mb-16 animate-fade-in">
            <div className="bg-gradient-to-r from-education-primary/10 to-education-secondary/10 p-8 rounded-2xl mb-8 glass-card">
              <p className="text-lg mb-6">
                A-Level Pathfinder is designed to help UK students make informed decisions 
                about which A-Level subjects to choose based on their future university 
                and career aspirations.
              </p>
              
              <p className="mb-6">
                Choosing the right A-Levels is a crucial decision that can significantly 
                impact your future educational and career opportunities. Our tool helps 
                you understand the connections between your subject choices and the doors 
                they can open for you.
              </p>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 inline-block gradient-text">How It Works</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-education-primary to-education-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Select Your Subjects</h3>
                      <p className="text-muted-foreground">
                        Choose 3-4 A-Level subjects that you're considering or already studying.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Discover University Paths</h3>
                      <p className="text-muted-foreground">
                        View university degrees that match well with your selected subjects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Explore Career Options</h3>
                      <p className="text-muted-foreground">
                        See potential career paths that align with your subject combinations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Make Informed Choices</h3>
                      <p className="text-muted-foreground">
                        Use our recommendations to help guide your educational decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 inline-block gradient-text">Our Advanced Features</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-education-primary to-education-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <LineChart className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Grade Improvement Simulator</h3>
                      <p className="text-muted-foreground">
                        See how improving specific grades could unlock new university opportunities. Experiment with different grade combinations to view potential UCAS point increases.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Interactive Requirements Cards</h3>
                      <p className="text-muted-foreground">
                        Detailed breakdowns of course requirements, showing how your grades match up to specific university entry criteria with visual indicators.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Course Comparison Tool</h3>
                      <p className="text-muted-foreground">
                        Compare multiple courses side-by-side to evaluate differences in entry requirements, duration, and other key factors to make better decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Download className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Export Results</h3>
                      <p className="text-muted-foreground">
                        Save your course matches and UCAS points calculation as a downloadable file to reference later or share with parents, teachers, and advisors.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Globe className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Regional Filtering</h3>
                      <p className="text-muted-foreground">
                        Filter university recommendations by location preferences, including UK regions and international options, to focus your search on areas that interest you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Calculator className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">UCAS Points Calculator</h3>
                      <p className="text-muted-foreground">
                        Automatically calculate your UCAS points from A-Level grades and extracurricular activities to see where you stand in the university admissions process.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New Features */}
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <School className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Career to Subjects Matcher</h3>
                      <p className="text-muted-foreground">
                        Start with your dream career and discover which A-Level subjects you should take to maximize your chances of success in that field.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <Brain className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">AI Study Assistant</h3>
                      <p className="text-muted-foreground">
                        Get personalized answers to your questions about A-Levels, university applications, and career pathways from our intelligent assistant.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Subject Content Explorer</h3>
                      <p className="text-muted-foreground">
                        Browse detailed information about what you'll study in each A-Level subject, including key topics, assessment methods, and required skills.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 inline-block gradient-text">Coming Soon</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-education-primary to-education-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <BookmarkCheck className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">University Timeline View</h3>
                      <p className="text-muted-foreground">
                        Visual timeline showing application deadlines and key dates for matched universities to help with planning.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Personal Statement Assistant</h3>
                      <p className="text-muted-foreground">
                        Get tailored advice for your personal statement based on your subject strengths and university choices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Sparkles className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">University Open Day Finder</h3>
                      <p className="text-muted-foreground">
                        Discover upcoming open days at universities that match your subject interests and predicted grades.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="fancy-border-gradient card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <MessageCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Student Community Forum</h3>
                      <p className="text-muted-foreground">
                        Connect with other students to share experiences, advice, and insights about A-Levels and university applications.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3 inline-block gradient-text">Important Notes</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-education-primary to-education-secondary rounded-full mx-auto"></div>
            </div>
            
            <div className="bg-gradient-to-r from-education-primary/10 to-education-secondary/10 p-8 rounded-2xl mb-8 glass-card">
              <ul className="list-disc list-inside space-y-3 pl-4">
                <li>
                  Our recommendations are suggestions based on typical requirements, but 
                  university entry requirements can vary. Always check with specific 
                  institutions for their exact requirements.
                </li>
                <li>
                  Some highly competitive courses may have additional requirements beyond 
                  specific A-Level subjects, such as admissions tests or portfolios.
                </li>
                <li>
                  This tool should be used as one resource among many when making educational 
                  decisions. We encourage you to also speak with teachers, career advisors, 
                  and university admissions offices.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
