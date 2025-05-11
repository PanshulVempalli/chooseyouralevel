
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    }`}>
      <div className="container flex items-center h-16 px-4 max-w-7xl">
        <Link to="/" className="flex items-center gap-2 group mr-4" onClick={scrollToTop}>
          <div className="bg-education-primary/10 p-1.5 rounded-full transition-all duration-300 group-hover:bg-education-primary/20">
            <GraduationCap size={22} className="text-education-primary" />
          </div>
          <span className="font-bold text-lg gradient-text whitespace-nowrap">A-Level</span>
        </Link>
        
        <div className="hidden md:flex justify-between items-center w-full">
          <div className="flex justify-between items-center space-x-2 w-full">
            <Link to="/" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Home
            </Link>
            <Link to="/about" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              About
            </Link>
            <Link to="/subject-selector" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Subject Selector
            </Link>
            <Link to="/career-to-subjects" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Career to Subjects
            </Link>
            <Link to="/grade-calculator" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Grade Calculator
            </Link>
            <Link to="/subjects" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Subjects
            </Link>
            <Link to="/guidance" onClick={scrollToTop} className="px-2 font-medium text-sm whitespace-nowrap hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Guidance
            </Link>
          </div>
        </div>
        
        <MobileMenu onLinkClick={scrollToTop} />
      </div>
    </nav>
  );
};

export default Navbar;
