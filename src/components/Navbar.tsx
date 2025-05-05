
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="container flex justify-between items-center h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
          <div className="bg-education-primary/10 p-2 rounded-full transition-all duration-300 group-hover:bg-education-primary/20">
            <GraduationCap size={24} className="text-education-primary" />
          </div>
          <span className="font-bold text-xl gradient-text">A-Level Pathfinder</span>
        </Link>
        
        <div className="hidden md:flex space-x-5">
          <Link to="/" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Home
          </Link>
          <Link to="/about" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            About
          </Link>
          <Link to="/subject-selector" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Subject Selector
          </Link>
          <Link to="/grade-calculator" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Grade Calculator
          </Link>
          <Link to="/subjects" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Subjects
          </Link>
          <Link to="/guidance" onClick={scrollToTop} className="font-medium hover:text-education-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-education-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            Guidance
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          <Button 
            className="rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-education-primary to-education-secondary text-white"
            onClick={() => {
              window.location.href = '/subject-selector';
            }}
          >
            Get Started
          </Button>
        </div>
        
        <MobileMenu onLinkClick={scrollToTop} />
      </div>
    </nav>
  );
};

export default Navbar;
