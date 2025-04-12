
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Award, Users, Download, BarChart, CheckCircle2, BookmarkCheck, Globe, Calculator, LineChart } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">About A-Level Pathfinder</h1>
          
          <section className="mb-10">
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
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
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
              
              <Card>
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
              
              <Card>
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
              
              <Card>
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
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Our Advanced Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
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
              
              <Card>
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
              
              <Card>
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
              
              <Card>
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
              
              <Card>
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
              
              <Card>
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
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
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
              
              <Card>
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
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
            
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
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
