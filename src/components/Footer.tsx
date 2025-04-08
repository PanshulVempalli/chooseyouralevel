
import { GraduationCap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-education-light dark:bg-education-dark mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <GraduationCap size={24} className="text-education-primary" />
            <span className="font-bold text-lg text-education-primary">A-Level Pathfinder</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} A-Level Pathfinder. All rights reserved.</p>
            <p className="mt-1">Helping students make informed A-Level choices.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-education-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-education-primary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-education-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
